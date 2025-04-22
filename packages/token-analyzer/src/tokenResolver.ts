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
import { addTokenToArray, extractTokensFromText } from './tokenUtils';
import { ImportedValue, processImportedStringTokens } from './importAnalyzer';

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
  } else if (Node.isObjectLiteralExpression(node)) {
  } else if (Node.isSpreadAssignment(node)) {
  } else if (
    Node.isCallExpression(node) &&
    node.getExpression().getText() === 'createCustomFocusIndicatorStyle'
  ) {
  } else if (Node.isCallExpression(node)) {
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
  node: PropertyAccessExpression
): TokenReference[] => {
  return [];
};

const processObjectLiteral = (
  node: ObjectLiteralExpression
): TokenReference[] => {
  return [];
};

const processSpreadAssignment = (node: SpreadAssignment): TokenReference[] => {
  return [];
};

const processCallExpression = (node: CallExpression): TokenReference[] => {
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
