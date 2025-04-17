// tokenUtils.ts
import { Node, Symbol, SyntaxKind } from 'ts-morph';
import { TOKEN_REGEX, TokenReference } from './types.js';
import { shorthands } from '@griffel/react';

/**
 * Centralizes token detection logic to make future changes easier
 * @param textOrNode The text or Node to check for token references
 * @returns true if the text/node contains a token reference
 */
export function isTokenReference(textOrNode: string | Node | Symbol): boolean {
  // If we have a Node or Symbol, extract the text to check
  let text: string;

  if (typeof textOrNode === 'string') {
    text = textOrNode;
  } else if (Node.isNode(textOrNode)) {
    text = textOrNode.getText();
  } else if (textOrNode instanceof Symbol) {
    // For symbols, we need to check the declarations
    const declarations = textOrNode.getDeclarations();
    if (!declarations || declarations.length === 0) {
      return false;
    }

    // Get text from the first declaration
    text = declarations[0].getText();
  } else {
    return false;
  }
  // IMPORTANT: Reset lastIndex to prevent issues with the global flag
  TOKEN_REGEX.lastIndex = 0;
  const test = TOKEN_REGEX.test(text);
  return test;
}

export function getExpresionFromIdentifier(node: Node): Node | undefined {
  const nodeSymbol = node.getSymbol();
  const nodeDeclarations = nodeSymbol?.getDeclarations();
  if (nodeSymbol && nodeDeclarations && nodeDeclarations.length > 0) {
    if (Node.isVariableDeclaration(nodeDeclarations[0])) {
      const nodeInitializer = nodeDeclarations[0].getInitializer();
      if (nodeInitializer) {
        return nodeInitializer;
      }
    }
  }
}

/**
 * Extracts all token references from a text string or Node
 * @param textOrNode The text or Node to extract tokens from
 * @returns Array of token reference strings
 */
export function extractTokensFromText(
  textOrNode: string | Node | Symbol
): string[] {
  // If we have a Node or Symbol, extract the text to check
  let text: string | undefined;
  const matches: string[] = [];

  if (typeof textOrNode === 'string') {
    text = textOrNode;
  } else if (Node.isNode(textOrNode) && Node.isTemplateExpression(textOrNode)) {
    textOrNode.getTemplateSpans().forEach((span) => {
      if (isTokenReference(span.getExpression().getText())) {
        const token = span.getExpression().getText();
        matches.push(token);
      } else {
        const spanExpression = span.getExpression();
        if (spanExpression.getKind() === SyntaxKind.Identifier) {
          const spanInitializer = getExpresionFromIdentifier(spanExpression);
          if (spanInitializer) {
            matches.push(...extractTokensFromText(spanInitializer));
          }
        }
      }
    });
  } else if (Node.isNode(textOrNode)) {
    // If we have an identifier, we need to check if it has an initializer. From there we should reprocess to extract tokens
    if (Node.isIdentifier(textOrNode)) {
      const initializer = getExpresionFromIdentifier(textOrNode);
      if (initializer) {
        matches.push(...extractTokensFromText(initializer));
      }
    } else {
      text = textOrNode.getText();
    }
  } else {
    // For symbols, we need to check the declarations
    const declarations = textOrNode.getDeclarations();
    if (!declarations || declarations.length === 0) {
      return [];
    }

    // Get text from the first declaration
    text = declarations[0].getText();
  }

  if (text !== undefined) {
    const regMatch = text.match(TOKEN_REGEX);
    if (regMatch) {
      matches.push(...regMatch);
    }
  }
  return matches;
}

type FunctionParams<T> = T extends (...args: infer P) => any ? P : never;
/**
 * Maps shorthand function names to the CSS properties they affect
 * @param functionName The name of the shorthand function (e.g., "borderColor" or "shorthands.borderColor")
 * @returns Array of CSS property names affected by this shorthand
 */
export function getPropertiesForShorthand(
  functionName: string,
  args: Node[]
): { property: string; token: string }[] {
  // Extract base function name if it's a qualified name (e.g., shorthands.borderColor -> borderColor)
  const baseName = functionName.includes('.')
    ? functionName.split('.').pop()
    : functionName;

  const cleanFunctionName = baseName as keyof typeof shorthands;
  const shorthandFunction = shorthands[cleanFunctionName];
  if (shorthandFunction) {
    const argValues = args.map(
      // We have to extract the token from the argument in the case that there's a template literal, initializer, etc.
      (arg) => extractTokensFromText(arg)[0]
    ) as FunctionParams<typeof shorthandFunction>;

    // @ts-expect-error We have a very complex union type that is difficult/impossible to resolve statically.
    const shortHandOutput = shorthandFunction(...argValues);

    // Once we have the shorthand output, we should process the values, sanitize them and then return only the properties
    // that contain tokens.
    const shortHandTokens: { property: string; token: string }[] = [];

    Object.keys(shortHandOutput).forEach((key) => {
      const value = shortHandOutput[key as keyof typeof shortHandOutput];
      if (isTokenReference(value)) {
        shortHandTokens.push({
          property: key,
          token: value,
        });
      }
    });

    return shortHandTokens;
  }

  // The function didn't match any known shorthand functions so return an empty array.
  return [];
}

/**
 * Centralized pure function to add tokens to an array of tokens. This is useful in the event we change the contract
 * or if we have to do additional logic or processing. Without which we'd need to update 10+ locations.
 * @param tokensToAdd
 * @param target
 * @returns
 */
export const addTokenToArray = (
  tokensToAdd: TokenReference[] | TokenReference,
  target: TokenReference[]
) => {
  // create new array without modifying the original array
  const newArray = target.slice();

  // add items to the array
  // We should probably search the tokens array for matches or duplicates and then determine if we need to add them or update existing entries.
  // TODO we also need to update the token member within the TokenRefernece object to be an array.
  if (Array.isArray(tokensToAdd)) {
    target.push(...tokensToAdd);
  } else {
    target.push(tokensToAdd);
  }
  return target;
  // return arrayy without modifying the original array
};
