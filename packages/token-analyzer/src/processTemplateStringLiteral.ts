import { TemplateExpression, Node } from 'ts-morph';

/**
 * Function that processes template string literals that might contain references to tokens.
 * It extracts potential token references for further processing. Since we want to use the same logic
 */
export const processTemplateStringLiteral = (): {} => {};

interface ExtractedNodessFromTemplateStringLiteral {
  /**
   * The original template expression that we're processing.
   */
  originalExpression: TemplateExpression;
  /**
   * 3D array of nodes that are within var() functions. Each group of nodes is stored in a separate array.
   */
  extractedExpressions: Node[][];
}

/**
 * pulls nodes out of a template string literal in the order they appear in if they're within var() functions.
 * If there are multiple non-nested var() functions, we place them in a 3d array at the top level. So grouped Nodes stay
 *  together and the order is maintained.
 * ex:
 * for string `var(--a, var(${someNode}, var(${anotherNode}))) var(${moreNodes}, var(${evenMoreNodes}))`
 * we would return:
 * [
 *   [someNode, anotherNode],
 *   [moreNodes, evenMoreNodes]
 * ]
 * @param expression
 */
export const extractNodesFromTemplateStringLiteral = (
  expression: TemplateExpression
): ExtractedNodessFromTemplateStringLiteral => {
  const extractedExpressions: Node[][] = [];
  const spans = expression.getTemplateSpans();

  // Track the state as we process each part of the template
  let currentGroup: Node[] = [];
  let inVar = false;
  let nestingLevel = 0;

  // Process the template head
  const head = expression.getHead().getText();
  processText(head);

  // Process each span and its literal
  spans.forEach((span) => {
    // Process the expression
    const expr = span.getExpression();
    if (inVar) {
      // If inside var(), add to current group
      currentGroup.push(expr);
    } else {
      // If not inside var(), create a standalone group for this expression
      extractedExpressions.push([expr]);
    }

    // Process the literal text after this expression
    const literal = span.getLiteral().getText();
    processText(literal);
  });

  // Helper function to process text parts
  function processText(text: string) {
    for (let i = 0; i < text.length; i++) {
      // Check for start of var() - no whitespace allowed
      if (i + 3 < text.length && text.substring(i, i + 4) === 'var(' && (nestingLevel === 0 || inVar)) {
        if (nestingLevel === 0) {
          inVar = true;
          // If we already have a group, add it to our results
          if (currentGroup.length > 0) {
            extractedExpressions.push([...currentGroup]);
            currentGroup = [];
          }
        }
        nestingLevel++;
        i += 3; // Skip to the opening parenthesis
      }
      // Track parenthesis nesting
      else if (text[i] === '(' && inVar) {
        nestingLevel++;
      } else if (text[i] === ')' && inVar) {
        nestingLevel--;
        if (nestingLevel === 0) {
          inVar = false;
          // If we've closed a var() and have a group, add it
          if (currentGroup.length > 0) {
            extractedExpressions.push([...currentGroup]);
            currentGroup = [];
          }
        }
      }
    }
  }

  // Handle any remaining nodes in the current group
  if (currentGroup.length > 0) {
    extractedExpressions.push(currentGroup);
  }

  return {
    originalExpression: expression,
    extractedExpressions,
  };
};
