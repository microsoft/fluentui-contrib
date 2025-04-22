import {
  Project,
  Node,
  SourceFile,
  PropertyAssignment,
  SpreadAssignment,
  StringLiteral,
  PropertyAccessExpression,
  ObjectLiteralExpression,
  CallExpression,
  TemplateExpression,
  Identifier,
} from 'ts-morph';
import { TOKEN_REGEX, TokenReference } from './types';
import { extractTokensFromCssVars } from './cssVarTokenExtractor';
import {
  addTokenToArray,
  extractTokensFromText,
  isTokenReference,
} from './tokenUtils';
import { ImportedValue, processImportedStringTokens } from './importAnalyzer';
import { resolve } from 'path';

interface TokenResolverInfo<T extends Node = Node> {
  node: T;
  path: string[];
  parentName: string;
  tokens: TokenReference[];
  importedValues: Map<string, ImportedValue>;
}

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
    return processTemplateExpression(
      info as TokenResolverInfo<TemplateExpression>
    );
  } else if (Node.isIdentifier(node)) {
    return processIdentifier(info as TokenResolverInfo<Identifier>);
  } else if (Node.isPropertyAccessExpression(node)) {
    return processPropertyAccess(
      info as TokenResolverInfo<PropertyAccessExpression>
    );
  } else if (Node.isObjectLiteralExpression(node)) {
    return processObjectLiteral(
      info as TokenResolverInfo<ObjectLiteralExpression>
    );
  } else if (Node.isSpreadAssignment(node)) {
    return processSpreadAssignment(info as TokenResolverInfo<SpreadAssignment>);
  } else if (
    Node.isCallExpression(node) &&
    node.getExpression().getText() === 'createCustomFocusIndicatorStyle'
  ) {
    return processFocusCallExpression(
      info as TokenResolverInfo<CallExpression>
    );
  } else if (Node.isCallExpression(node)) {
    return processCallExpression(info as TokenResolverInfo<CallExpression>);
  } else if (Node.isPropertyAssignment(node)) {
    return processPropertyAssignment(
      info as TokenResolverInfo<PropertyAssignment>
    );
  }

  return tokens;
};

/**
 * Stub for processing string literals which we don't need currently.
 * @param node
 * @returns
 */
const processStringLiteral = (
  info: TokenResolverInfo<StringLiteral>
): TokenReference[] => {
  return info.tokens;
};

const processIdentifier = (
  info: TokenResolverInfo<Identifier>
): TokenReference[] => {
  const { node, importedValues, parentName, path, tokens } = info;

  let returnTokens = tokens.slice();

  const text = node.getText();

  // First check if it matches the token regex directly
  const matches = extractTokensFromText(node);
  if (matches.length > 0) {
    matches.forEach((match) => {
      returnTokens = addTokenToArray(
        {
          property: path[path.length - 1] || parentName,
          token: [match],
          path,
        },
        returnTokens
      );
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
    returnTokens.push(...importTokens);
  }

  return returnTokens;
};

const processPropertyAccess = (
  info: TokenResolverInfo<PropertyAccessExpression>
): TokenReference[] => {
  const { node, parentName, path, tokens } = info;

  const text = node.getText();
  const isToken = isTokenReference(text);
  if (isToken) {
    return addTokenToArray(
      {
        property: path[path.length - 1] || parentName,
        token: [text],
        path,
      },
      tokens
    );
  }
  return tokens;
};

const processObjectLiteral = (
  info: TokenResolverInfo<ObjectLiteralExpression>
): TokenReference[] => {
  const { node, parentName, path, tokens, importedValues } = info;

  let returnTokens = tokens.slice();
  node.getProperties().forEach((childProp) => {
    returnTokens = returnTokens.concat(
      resolveToken({
        node: childProp,
        path,
        parentName,
        tokens,
        importedValues,
      })
    );
  });
  return returnTokens;
};

const processSpreadAssignment = (
  info: TokenResolverInfo<SpreadAssignment>
): TokenReference[] => {
  const { node, path, parentName, tokens, importedValues } = info;
  return tokens.concat(
    resolveToken({
      node: node.getExpression(),
      path,
      parentName,
      tokens,
      importedValues,
    })
  );
};

const processFocusCallExpression = (
  info: TokenResolverInfo<CallExpression>
): TokenReference[] => {
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
      node: passedTokens,
      path: [...path, nestedModifier],
      parentName,
      tokens,
      importedValues,
    });
  }

  return tokens;
};

const processCallExpression = (
  info: TokenResolverInfo<CallExpression>
): TokenReference[] => {
  return [];
};

/**
 *
 * @param info
 * @returns
 */
const processTemplateExpression = (
  info: TokenResolverInfo<TemplateExpression>
): TokenReference[] => {
  /**
   * This is where we should process template spans and feed it back into resolveToken. We also need to check that
   * imported values are tokens etc.
   */

  const { node, path, parentName, tokens } = info;
  const text = node.getText();

  // Check for CSS var() syntax that might contain tokens
  if (text.includes('var(')) {
    const cssVarTokens = extractTokensFromCssVars(
      text,
      path[path.length - 1] || parentName,
      path
    );
    return addTokenToArray(cssVarTokens, tokens);
  } else {
    // Check for direct token references
    const matches = extractTokensFromText(node);

    let returnTokens = tokens.slice();
    if (matches.length > 0) {
      matches.forEach((match) => {
        returnTokens = addTokenToArray(
          {
            property: path[path.length - 1] || parentName,
            token: [match],
            path,
          },
          returnTokens
        );
      });
    }

    return returnTokens;
  }
};

const processPropertyAssignment = (
  info: TokenResolverInfo<PropertyAssignment>
): TokenReference[] => {
  const { node, path, parentName, tokens, importedValues } = info;

  const childName = node.getName();
  const newPath = [...path, childName];
  const propertyNode = node.getInitializer();

  return resolveToken({
    node: propertyNode || node,
    path: newPath,
    parentName,
    tokens,
    importedValues,
  });
};
