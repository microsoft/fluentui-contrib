// tokenUtils.ts
import { Node, Symbol, SyntaxKind } from 'ts-morph';
import { TOKEN_REGEX } from './types.js';
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
 * TODO: Dedupe logic from extractTokensFromText and isTokenReference
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
      (arg) => extractTokensFromText(arg)[0]
    ) as FunctionParams<typeof shorthandFunction>;

    console.log(args.map((arg) => extractTokensFromText(arg)[0]));
    // @ts-expect-error We have a very complex union type that is difficult/impossible to resolve statically.
    const shortHandOutput = shorthandFunction(...argValues);
    console.log(shortHandOutput);

    // Once we have the shorthand output, we should process the values, sanitize them and then return only the properties
    // that contain tokens.
    const shortHandTokens: { property: string; token: string }[] = [];

    Object.keys(shortHandOutput).forEach((key) => {
      const value = shortHandOutput[key];
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
