import {
  Project,
  Node,
  SourceFile,
  PropertyAssignment,
  SpreadAssignment,
} from 'ts-morph';
import {
  TokenReference,
  StyleAnalysis,
  FileAnalysis,
  StyleCondition,
  StyleContent,
  StyleMetadata,
  TOKEN_REGEX,
  StyleTokens,
} from './types.js';
import { log, measure, measureAsync } from './debugUtils.js';
import {
  analyzeImports,
  processImportedStringTokens,
  ImportedValue,
} from './importAnalyzer.js';
import { extractTokensFromCssVars } from './cssVarTokenExtractor.js';
import {
  extractTokensFromText,
  getPropertiesForShorthand,
  isTokenReference,
} from './tokenUtils.js';

const makeResetStylesToken = 'resetStyles';

interface StyleMapping {
  baseStyles: string[];
  conditionalStyles: StyleCondition[];
  slotName?: string;
}

interface VariableMapping {
  variableName: string;
  functionName: string;
}

/**
 * Process a style property to extract token references.
 * Property names are derived from the actual CSS property in the path,
 * not the object key containing them.
 *
 * @param prop The property assignment or spread element to process
 * @param importedValues Map of imported values for resolving token references
 * @param isResetStyles Whether this is a reset styles property
 */
function processStyleProperty(
  prop: PropertyAssignment | SpreadAssignment,
  importedValues: Map<string, ImportedValue> | undefined = undefined,
  isResetStyles?: boolean
): TokenReference[] {
  const tokens: TokenReference[] = [];
  const parentName = Node.isPropertyAssignment(prop) ? prop.getName() : '';

  function processNode(node?: Node, path: string[] = []): void {
    if (!node) {
      return;
    }

    // If we're processing a reset style, we need to add the parent name to the path
    if (isResetStyles && path.length === 0 && parentName) {
      path.push(parentName);
    }

    // Check for string literals or template expressions (string template literals)
    if (Node.isStringLiteral(node) || Node.isTemplateExpression(node)) {
      const text = node.getText().replace(/['"]/g, ''); // Remove quotes

      // Check for CSS var() syntax that might contain tokens
      if (text.includes('var(')) {
        const cssVarTokens = extractTokensFromCssVars(
          text,
          path[path.length - 1] || parentName,
          path,
          TOKEN_REGEX
        );
        tokens.push(...cssVarTokens);
      } else {
        // Check for direct token references
        const matches = extractTokensFromText(node);
        if (matches.length > 0) {
          matches.forEach((match) => {
            tokens.push({
              property: path[path.length - 1] || parentName,
              token: match,
              path,
            });
          });
        }
      }
    } else if (Node.isIdentifier(node)) {
      const text = node.getText();

      // First check if it matches the token regex directly
      const matches = extractTokensFromText(node);
      if (matches.length > 0) {
        matches.forEach((match) => {
          tokens.push({
            property: path[path.length - 1] || parentName,
            token: match,
            path,
          });
        });
      }

      // Then check if it's an imported value reference
      if (importedValues && importedValues.has(text)) {
        const importTokens = processImportedStringTokens(
          importedValues,
          path[path.length - 1] || parentName,
          text,
          path,
          TOKEN_REGEX
        );
        tokens.push(...importTokens);
      }
    } else if (Node.isPropertyAccessExpression(node)) {
      const text = node.getText();
      const isToken = isTokenReference(text);
      if (isToken) {
        tokens.push({
          property: path[path.length - 1] || parentName,
          token: text,
          path,
        });
      }
    } else if (Node.isObjectLiteralExpression(node)) {
      node.getProperties().forEach((childProp) => {
        if (Node.isPropertyAssignment(childProp)) {
          const childName = childProp.getName();
          processNode(childProp.getInitializer(), [...path, childName]);
        } else if (Node.isSpreadAssignment(childProp)) {
          // Handle spread elements in object literals
          processNode(childProp.getExpression(), path);
        }
      });
    } else if (Node.isSpreadAssignment(node)) {
      // Handle spread elements
      processNode(node.getExpression(), path);
    } else if (
      Node.isCallExpression(node) &&
      node.getExpression().getText() === 'createCustomFocusIndicatorStyle'
    ) {
      const focus = `:focus`;
      const focusWithin = `:focus-within`;
      let nestedModifier = focus;

      const passedTokens = node.getArguments()[0];
      const passedOptions = node.getArguments()[1];

      if (passedOptions && Node.isObjectLiteralExpression(passedOptions)) {
        passedOptions.getProperties().forEach((property) => {
          if (Node.isPropertyAssignment(property)) {
            const optionName = property.getName();
            if (optionName === 'selector') {
              const selectorType = property.getInitializer()?.getText();
              if (selectorType === 'focus') {
                nestedModifier = focus;
              } else if (selectorType === 'focus-within') {
                nestedModifier = focusWithin;
              }
            }
          }
        });
      }

      if (passedTokens && Node.isObjectLiteralExpression(passedTokens)) {
        passedTokens.getProperties().forEach((property) => {
          if (Node.isPropertyAssignment(property)) {
            const childName = property.getName();
            processNode(property.getInitializer(), [
              ...path,
              nestedModifier,
              childName,
            ]);
          } else if (Node.isSpreadAssignment(property)) {
            // Handle spread elements in object literals within function arguments
            processNode(property.getExpression(), [...path, nestedModifier]);
          }
        });
      }
    } else if (Node.isCallExpression(node)) {
      // Process calls like shorthands.borderColor(tokens.color)
      const functionName = node.getExpression().getText();

      // check if we're using a shorthand function and get the output of a call based on parameters passed into the function
      const affectedProperties = getPropertiesForShorthand(
        functionName,
        node.getArguments()
      );

      // If we have a shorthand function, we need to process the affected properties.
      // getPropertiesForShorthand will return an array of objects
      // with the property name and the token reference
      // e.g. { property: 'borderColor', token: 'tokens.color' }
      // It will also deeply check for initialized values etc and validate they are tokens
      if (affectedProperties.length > 0) {
        // Process each argument and apply it to all affected properties
        affectedProperties.forEach((argument) => {
          tokens.push({
            property: argument.property,
            token: argument.token,
            path: path.concat(argument.property),
          });
        });
      } else {
        // Generic handling of functions that are not whitelisted
        node.getArguments().forEach((argument) => {
          if (Node.isObjectLiteralExpression(argument)) {
            argument.getProperties().forEach((property) => {
              if (Node.isPropertyAssignment(property)) {
                const childName = property.getName();
                processNode(property.getInitializer(), [
                  ...path,
                  functionName,
                  childName,
                ]);
              }
            });
          }
          // Check for string literals in function arguments that might contain CSS variables with tokens
          if (Node.isStringLiteral(argument)) {
            const text = argument.getText().replace(/['"]/g, '');
            if (text.includes('var(')) {
              const cssVarTokens = extractTokensFromCssVars(
                text,
                path[path.length - 1] || parentName,
                [...path, functionName],
                TOKEN_REGEX
              );
              tokens.push(...cssVarTokens);
            }
          }
        });
      }
    }
  }

  if (Node.isPropertyAssignment(prop)) {
    const initializer = prop.getInitializer();
    if (initializer) {
      processNode(initializer);
    }
  } else if (Node.isSpreadAssignment(prop)) {
    processNode(prop.getExpression());
  }

  return tokens;
}

/**
 * Analyzes mergeClasses calls to determine style relationships
 */
function analyzeMergeClasses(sourceFile: SourceFile): StyleMapping[] {
  const mappings: StyleMapping[] = [];

  sourceFile.forEachDescendant((node) => {
    if (
      Node.isCallExpression(node) &&
      node.getExpression().getText() === 'mergeClasses'
    ) {
      const parentNode = node.getParent();
      let slotName = '';
      if (Node.isBinaryExpression(parentNode)) {
        slotName = parentNode.getLeft().getText().split('.')[1];
      }
      const mapping: StyleMapping = {
        baseStyles: [],
        conditionalStyles: [],
        slotName,
      };

      /**
       *  TODO: We could also walk the tree to find what function is assigned to our makeStyles call, and thus, what
       * styles object we're working with. Typically this is called `useStyles` and then assigned to `styles`. We've hard
       * coded it for now but this could be improved.
       */

      node.getArguments().forEach((arg) => {
        // Handle direct style references
        if (Node.isPropertyAccessExpression(arg)) {
          mapping.baseStyles.push(arg.getText());
        }
        // Handle conditional styles
        else if (Node.isBinaryExpression(arg)) {
          const right = arg.getRight();
          if (Node.isPropertyAccessExpression(right)) {
            mapping.conditionalStyles.push({
              style: right.getText(),
              condition: arg.getLeft().getText(),
            });
          }
        } else if (!arg.getText().includes('.')) {
          // We found a single variable (makeResetStyles or other assignment), add to base styles for lookup later
          mapping.baseStyles.push(arg.getText());
        }
      });

      if (mapping.baseStyles.length || mapping.conditionalStyles.length) {
        mappings.push(mapping);
      }
    }
  });

  return mappings;
}

/**
 * Creates a StyleContent object from token references.
 *
 * The path structure in token references is relative to the style property being processed.
 * For example, given a style object:
 * ```typescript
 * {
 *   root: {              // Handled by analyzeMakeStyles
 *     color: token,      // path = ['color']
 *     ':hover': {        // Start of nested structure
 *       color: token     // path = [':hover', 'color']
 *     }
 *   }
 * }
 * ```
 * Property names reflect the actual CSS property, derived from the path.
 */
function createStyleContent(tokens: TokenReference[]): StyleContent {
  const content: StyleContent = {
    tokens: tokens.filter((t) => {
      return t.path.length === 1;
    }),
  };

  // Nested structures have paths longer than 1
  const nestedTokens = tokens.filter((t) => t.path.length > 1);
  if (nestedTokens.length > 0) {
    const acc: StyleTokens = {};

    /**
     * Recursive function to create a nested structure for tokens
     * This function will create a nested object structure based on the token path.
     * @param token
     * @param pathIndex where in the path we are, this allows us to preserve the path while recursing through it
     * @param currentLevel the current level of the nested structure we're working on
     */
    const createNestedStructure = (
      token: TokenReference,
      pathIndex: number,
      currentLevel: StyleTokens
    ) => {
      const nestedKey = token.path[pathIndex];

      // if no token array exists, create one
      if (!currentLevel[nestedKey]) {
        currentLevel[nestedKey] = { tokens: [] };
      }

      // if we have a path length that is greater than our current index minus 1, we need to recurse
      // this is because if we have more than a single item in our path left there's another level
      if (token.path.length - 1 - pathIndex > 1) {
        // Create a nested structure through a recursive call
        if (!currentLevel[nestedKey].nested) {
          currentLevel[nestedKey].nested = {};
        }
        createNestedStructure(
          token,
          pathIndex + 1,
          currentLevel[nestedKey].nested
        );
      } else {
        currentLevel[nestedKey].tokens.push({
          ...token,
          path: token.path,
        });
      }
    };

    nestedTokens.forEach((token) => {
      createNestedStructure(token, 0, acc);
    });

    content.nested = acc;
  }

  return content;
}

/**
 * Creates metadata from style mappings
 */
function createMetadata(styleMappings: StyleMapping[]): StyleMetadata {
  const metadata: StyleMetadata = {
    styleConditions: {},
  };

  styleMappings.forEach((mapping) => {
    mapping.baseStyles.forEach((style) => {
      if (metadata.styleConditions[style]) {
        metadata.styleConditions[style].isBase = true;
      } else {
        metadata.styleConditions[style] = {
          isBase: true,
          slotName: mapping.slotName || '',
        };
      }
    });

    mapping.conditionalStyles.forEach(({ style, condition }) => {
      if (metadata.styleConditions[style]) {
        metadata.styleConditions[style].conditions =
          metadata.styleConditions[style].conditions || [];
        if (condition) {
          metadata.styleConditions[style].conditions!.push(condition);
        }
      } else {
        metadata.styleConditions[style] = {
          conditions: condition ? [condition] : [],
          slotName: mapping.slotName || '',
        };
      }
    });
  });

  return metadata;
}

/**
 * Analyzes makeStyles calls to get token usage and structure
 */
async function analyzeMakeStyles(
  sourceFile: SourceFile,
  importedValues: Map<string, ImportedValue> | undefined = undefined
): Promise<StyleAnalysis> {
  const analysis: StyleAnalysis = {};

  sourceFile.forEachDescendant((node) => {
    if (
      Node.isCallExpression(node) &&
      node.getExpression().getText() === 'makeStyles'
    ) {
      const stylesArg = node.getArguments()[0];
      const parentNode = node.getParent();
      if (
        Node.isObjectLiteralExpression(stylesArg) &&
        Node.isVariableDeclaration(parentNode)
      ) {
        // Process the styles object
        stylesArg.getProperties().forEach((prop) => {
          if (Node.isPropertyAssignment(prop)) {
            const styleName = prop.getName();
            const tokens = processStyleProperty(prop, importedValues);
            const functionName = parentNode.getName();
            if (!analysis[functionName]) {
              analysis[functionName] = {};
            }
            if (tokens.length) {
              analysis[functionName][styleName] = createStyleContent(tokens);
            }
          }
        });
      }
    } else if (
      Node.isCallExpression(node) &&
      node.getExpression().getText() === 'makeResetStyles'
    ) {
      // Similar to above, but the styles are stored under the assigned function name instead of local variable
      const stylesArg = node.getArguments()[0];
      const parentNode = node.getParent();
      if (Node.isVariableDeclaration(parentNode)) {
        const functionName = parentNode.getName();
        if (!analysis[functionName]) {
          analysis[functionName] = {};
        }
        // We store 'isResetStyles' to differentiate from makeStyles and link mergeClasses variables
        analysis[functionName][makeResetStylesToken] = {
          tokens: [],
          nested: {},
          isResetStyles: true,
        };
        if (Node.isObjectLiteralExpression(stylesArg)) {
          // Process the styles object
          stylesArg.getProperties().forEach((prop) => {
            if (
              Node.isPropertyAssignment(prop) ||
              Node.isSpreadAssignment(prop)
            ) {
              const tokens = processStyleProperty(prop, importedValues, true);
              if (tokens.length) {
                const styleContent = createStyleContent(tokens);
                analysis[functionName][makeResetStylesToken].tokens = analysis[
                  functionName
                ][makeResetStylesToken].tokens.concat(styleContent.tokens);
                analysis[functionName][makeResetStylesToken].nested = {
                  ...analysis[functionName][makeResetStylesToken].nested,
                  ...styleContent.nested,
                };
              }
            }
          });
        }
      }
    }
  });

  const variables: VariableMapping[] = [];
  const styleFunctionNames: string[] = Object.keys(analysis);

  sourceFile.forEachDescendant((node) => {
    // We do a second parse to link known style functions (i.e. makeResetStyles  assigned function variable names).
    // This is necessary to handle cases where we're using a variable directly in mergeClasses to link styles.

    if (
      Node.isCallExpression(node) &&
      styleFunctionNames.includes(node.getExpression().getText())
    ) {
      const parentNode = node.getParent();
      const functionName = node.getExpression().getText();
      if (Node.isVariableDeclaration(parentNode)) {
        const variableName = parentNode.getName();
        const variableMap: VariableMapping = {
          functionName,
          variableName,
        };
        variables.push(variableMap);
      }
    }
  });

  // Store our makeResetStyles assigned variables in the analysis to link later
  variables.forEach((variable) => {
    Object.keys(analysis[variable.functionName]).forEach((styleName) => {
      if (
        analysis[variable.functionName][styleName].assignedVariables ===
        undefined
      ) {
        analysis[variable.functionName][styleName].assignedVariables = [];
      }
      analysis[variable.functionName][styleName].assignedVariables?.push(
        variable.variableName
      );
    });
  });

  return analysis;
}

/**
 * Combines mergeClasses and makeStyles analysis, with import resolution
 */
async function analyzeFile(
  filePath: string,
  project: Project
): Promise<FileAnalysis> {
  log(`Analyzing ${filePath}`);

  const sourceFile = project.addSourceFileAtPath(filePath);

  // First analyze imports to find imported string values
  log('Analyzing imports to find imported token values');
  const importedValues = await measureAsync('analyze imports', () =>
    analyzeImports(sourceFile, project)
  );

  // Second pass: Analyze mergeClasses
  const styleMappings = measure('analyze mergeClasses', () =>
    analyzeMergeClasses(sourceFile)
  );

  // Third pass: Analyze makeStyles with imported values
  const styleAnalysis = await measureAsync<StyleAnalysis>(
    'analyze makeStyles',
    () => analyzeMakeStyles(sourceFile, importedValues)
  );

  // Create enhanced analysis with separated styles and metadata
  return {
    styles: styleAnalysis,
    metadata: createMetadata(styleMappings),
  };
}

export {
  analyzeFile,
  processStyleProperty,
  analyzeMergeClasses,
  analyzeMakeStyles,
  createStyleContent,
};
export type { StyleMapping };
