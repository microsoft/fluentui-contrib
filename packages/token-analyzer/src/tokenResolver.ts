import {
  Node,
  PropertyAssignment,
  SpreadAssignment,
  StringLiteral,
  PropertyAccessExpression,
  ObjectLiteralExpression,
  CallExpression,
  TemplateExpression,
  Identifier,
  TemplateSpan,
  TemplateHead,
  TemplateMiddle,
  TemplateTail,
} from 'ts-morph';
import { TokenReference, TokenResolverInfo } from './types';
import { extractTokensFromCssVars } from './cssVarTokenExtractor';
import {
  addTokenToArray,
  extractTokensFromText,
  getInitializerFromIdentifier,
  getPropertiesForShorthand,
  isTokenReference,
} from './tokenUtils';

/**
 * Function that centarlizes the logic for resolving tokens from a node.
 * Given that this is recursive logic, it's much easier to pass this back to itself.
 * @param node
 * @returns
 */
export const resolveToken = (info: TokenResolverInfo): TokenReference[] => {
  const { node, tokens } = info;

  if (Node.isStringLiteral(node)) {
    // Path in the event we need to process string literals, however this isn't used given tokens are stored as
    // initialized values and imports. Generally, as property accessors or identifiers
    // For now we'll leave a stub
    return processStringLiteral(info as TokenResolverInfo<StringLiteral>);
  } else if (Node.isTemplateExpression(node)) {
    return processTemplateExpression(info as TokenResolverInfo<TemplateExpression>);
  } else if (Node.isIdentifier(node)) {
    return processIdentifier(info as TokenResolverInfo<Identifier>);
  } else if (Node.isPropertyAccessExpression(node)) {
    return processPropertyAccess(info as TokenResolverInfo<PropertyAccessExpression>);
  } else if (Node.isObjectLiteralExpression(node)) {
    return processObjectLiteral(info as TokenResolverInfo<ObjectLiteralExpression>);
  } else if (Node.isSpreadAssignment(node)) {
    return processSpreadAssignment(info as TokenResolverInfo<SpreadAssignment>);
  } else if (Node.isCallExpression(node) && node.getExpression().getText() === 'createCustomFocusIndicatorStyle') {
    return processFocusCallExpression(info as TokenResolverInfo<CallExpression>);
  } else if (Node.isCallExpression(node)) {
    return processCallExpression(info as TokenResolverInfo<CallExpression>);
  } else if (Node.isPropertyAssignment(node)) {
    return processPropertyAssignment(info as TokenResolverInfo<PropertyAssignment>);
  } else if (
    Node.isTemplateSpan(node) ||
    Node.isTemplateHead(node) ||
    Node.isTemplateMiddle(node) ||
    Node.isTemplateTail(node)
  ) {
    // Unless we need specialized handling, use the template expression resolver
    return processTemplateExpression(
      info as TokenResolverInfo<TemplateSpan | TemplateHead | TemplateMiddle | TemplateTail>
    );
  }

  return tokens;
};

/**
 * Stub for processing string literals which we don't need currently.
 * @param node
 * @returns
 */
const processStringLiteral = (info: TokenResolverInfo<StringLiteral>): TokenReference[] => {
  return info.tokens;
};

const processIdentifier = (info: TokenResolverInfo<Identifier>): TokenReference[] => {
  const { node, parentName, path, tokens, isVariableReference, sourceFile } = info;

  let returnTokens = tokens.slice();

  const text = node.getText();
  const intializerNode = getInitializerFromIdentifier(node);
  // knownTokenPackage is set to false for our importTest
  if (isTokenReference(info)) {
    // Found a token, we should process and return it
    const propertyName = path[path.length - 1] ?? parentName;
    returnTokens = addTokenToArray(
      {
        property: propertyName,
        token: [text],
        path,
      },
      returnTokens,
      isVariableReference,
      sourceFile
    );
  } else if (intializerNode) {
    // we have a variable declaration and we should then check if the value is a token as well. Reprocess the node
    returnTokens = returnTokens.concat(resolveToken({ ...info, node: intializerNode }));
  }

  return returnTokens;
};

const processPropertyAccess = (info: TokenResolverInfo<PropertyAccessExpression>): TokenReference[] => {
  const { node, parentName, path, tokens, isVariableReference, sourceFile } = info;

  const text = node.getText();
  const isToken = isTokenReference(info);
  if (isToken) {
    return addTokenToArray(
      {
        property: path[path.length - 1] ?? parentName,
        token: [text],
        path,
      },
      tokens,
      isVariableReference,
      sourceFile
    );
  }
  return tokens;
};

const processObjectLiteral = (info: TokenResolverInfo<ObjectLiteralExpression>): TokenReference[] => {
  const { node, tokens } = info;

  let returnTokens = tokens.slice();
  node.getProperties().forEach((childProp) => {
    returnTokens = returnTokens.concat(
      resolveToken({
        ...info,
        node: childProp,
      })
    );
  });
  return returnTokens;
};

const processSpreadAssignment = (info: TokenResolverInfo<SpreadAssignment>): TokenReference[] => {
  const { node, tokens } = info;
  return tokens.concat(
    resolveToken({
      ...info,
      node: node.getExpression(),
    })
  );
};

const processFocusCallExpression = (info: TokenResolverInfo<CallExpression>): TokenReference[] => {
  const { node, path, parentName, tokens, importedValues } = info;

  const focus = `:focus`;
  const focusWithin = `:focus-within`;
  let nestedModifier = focus;

  const passedTokens = node.getArguments()[0];
  const passedOptions = node.getArguments()[1];

  // Parse out the options being passed to the focus funuction and determine which selector is being used
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

  if (passedTokens) {
    // We can simplify the logic since we process node types and extract within resolveTokens. We merely need to pass
    // the updated path
    return resolveToken({
      ...info,
      node: passedTokens,
      path: [...path, nestedModifier],
      parentName,
      tokens,
      importedValues,
    });
  }

  return tokens;
};

const processCallExpression = (info: TokenResolverInfo<CallExpression>): TokenReference[] => {
  const { node, path, tokens, importedValues, isVariableReference, sourceFile } = info;

  let returnTokens = tokens.slice();
  // Process calls like shorthands.borderColor(tokens.color)
  const functionName = node.getExpression().getText();

  // check if we're using a shorthand function and get the output of a call based on parameters passed into the function
  const affectedProperties = getPropertiesForShorthand(functionName, node.getArguments());

  // If we have a shorthand function, we need to process the affected properties.
  // getPropertiesForShorthand will return an array of objects
  // with the property name and the token reference
  // e.g. { property: 'borderColor', token: 'tokens.color' }
  // It will also deeply check for initialized values etc and validate they are tokens
  if (affectedProperties.length > 0) {
    // Process each argument and apply it to all affected properties
    affectedProperties.forEach((argument) => {
      returnTokens = addTokenToArray(
        {
          property: argument.property,
          token: [argument.token],
          path: path.concat(argument.property),
        },
        returnTokens,
        isVariableReference,
        sourceFile
      );
    });
  } else {
    // Generic handling of functions that are not whitelisted
    node.getArguments().forEach((argument) => {
      returnTokens = returnTokens.concat(
        resolveToken({
          ...info,
          node: argument,
          path: [...path, functionName],
          tokens: returnTokens,
          importedValues,
        })
      );
    });
  }
  return returnTokens;
};

/**
 *
 * @param info
 * @returns
 */
const processTemplateExpression = (
  info: TokenResolverInfo<TemplateExpression | TemplateSpan | TemplateHead | TemplateMiddle | TemplateTail>
): TokenReference[] => {
  /**
   * This is where we should process template spans and feed it back into resolveToken. We also need to check that
   * imported values are tokens etc.
   */

  const { node, path, parentName, tokens, isVariableReference, sourceFile } = info;
  const text = node.getText();

  // Check for CSS var() syntax that might contain tokens
  if (text.includes('var(')) {
    const cssVarTokens = extractTokensFromCssVars(text, path[path.length - 1] ?? parentName, path);
    return addTokenToArray(cssVarTokens, tokens, isVariableReference, sourceFile);
  } else {
    // Check for direct token references
    const matches = extractTokensFromText(node);

    let returnTokens = tokens.slice();
    if (matches.length > 0) {
      matches.forEach((match) => {
        returnTokens = addTokenToArray(
          {
            property: path[path.length - 1] ?? parentName,
            token: [match],
            path,
            isVariableReference,
            sourceFile,
          },
          returnTokens,
          isVariableReference,
          sourceFile
        );
      });
    }

    return returnTokens;
  }
};

const processPropertyAssignment = (info: TokenResolverInfo<PropertyAssignment>): TokenReference[] => {
  const { node, path } = info;

  const childName = node.getName();
  const newPath = [...path, childName];
  const propertyNode = node.getInitializer();

  return resolveToken({
    ...info,
    node: propertyNode ?? node,
    path: newPath,
  });
};
