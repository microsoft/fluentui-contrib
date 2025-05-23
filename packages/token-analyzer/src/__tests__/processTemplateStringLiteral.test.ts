// extractNodesFromTemplateStringLiteral.test.ts
import { Project, TemplateExpression } from 'ts-morph';
import path from 'path';
import { extractNodesFromTemplateStringLiteral } from '../processTemplateStringLiteral.js';

describe('extractNodesFromTemplateStringLiteral', () => {
  // Set up the ts-morph project and load our test file
  const project = new Project();
  const testFilePath = path.resolve(__dirname, './test-templates.ts');
  const sourceFile = project.addSourceFileAtPath(testFilePath);

  // Helper function to find a template expression by its variable name
  const findTemplateByName = (name: string): TemplateExpression => {
    const variableDeclarations = sourceFile.getVariableDeclarations().filter((vd) => vd.getName() === name);

    if (variableDeclarations.length !== 1) {
      throw new Error(`Expected to find exactly one variable declaration with name ${name}`);
    }

    const initializer = variableDeclarations[0].getInitializer();
    if (!initializer || !initializer.getKind() || !initializer.getKindName().includes('Template')) {
      throw new Error(`Variable ${name} is not initialized to a template expression`);
    }

    return initializer as TemplateExpression;
  };

  test('Test Case 1: Basic example with nested var() functions', () => {
    const template = findTemplateByName('template1');
    const result = extractNodesFromTemplateStringLiteral(template);

    expect(result.extractedExpressions.length).toBe(2);
    expect(result.extractedExpressions[0].length).toBe(2);
    expect(result.extractedExpressions[1].length).toBe(2);

    // Verify the nodes are the correct ones by checking their text
    expect(result.extractedExpressions[0][0].getText()).toBe('someNode');
    expect(result.extractedExpressions[0][1].getText()).toBe('anotherNode');
    expect(result.extractedExpressions[1][0].getText()).toBe('moreNodes');
    expect(result.extractedExpressions[1][1].getText()).toBe('evenMoreNodes');
  });

  test('Test Case 2: Mixed content with different nesting patterns', () => {
    const template = findTemplateByName('template2');
    const result = extractNodesFromTemplateStringLiteral(template);

    expect(result.extractedExpressions.length).toBe(2);
    expect(result.extractedExpressions[0].length).toBe(1);
    expect(result.extractedExpressions[1].length).toBe(3);

    expect(result.extractedExpressions[0][0].getText()).toBe('someNode');
    expect(result.extractedExpressions[1][0].getText()).toBe('moreNodes');
    expect(result.extractedExpressions[1][1].getText()).toBe('anotherNode');
    expect(result.extractedExpressions[1][2].getText()).toBe('evenMoreNodes');
  });

  test('Test Case 3: No var functions - each expression gets its own group', () => {
    const template = findTemplateByName('template3');
    const result = extractNodesFromTemplateStringLiteral(template);

    // Should extract both expressions, each in its own group
    expect(result.extractedExpressions.length).toBe(2);
    expect(result.extractedExpressions[0].length).toBe(1);
    expect(result.extractedExpressions[1].length).toBe(1);

    expect(result.extractedExpressions[0][0].getText()).toBe('someNode');
    expect(result.extractedExpressions[1][0].getText()).toBe('anotherNode');
  });

  test('Test Case 4: Simple case with one var function', () => {
    const template = findTemplateByName('template4');
    const result = extractNodesFromTemplateStringLiteral(template);

    expect(result.extractedExpressions.length).toBe(1);
    expect(result.extractedExpressions[0].length).toBe(1);
    expect(result.extractedExpressions[0][0].getText()).toBe('someNode');
  });

  test('Test Case 5: Deeply nested var() functions', () => {
    const template = findTemplateByName('template5');
    const result = extractNodesFromTemplateStringLiteral(template);

    expect(result.extractedExpressions.length).toBe(1);
    expect(result.extractedExpressions[0].length).toBe(3);
    expect(result.extractedExpressions[0][0].getText()).toBe('someNode');
    expect(result.extractedExpressions[0][1].getText()).toBe('anotherNode');
    expect(result.extractedExpressions[0][2].getText()).toBe('moreNodes');
  });

  test('Test Case 6: Multiple var() functions at the same level', () => {
    const template = findTemplateByName('template6');
    const result = extractNodesFromTemplateStringLiteral(template);

    expect(result.extractedExpressions.length).toBe(4);
    expect(result.extractedExpressions[0].length).toBe(1);
    expect(result.extractedExpressions[1].length).toBe(1);
    expect(result.extractedExpressions[2].length).toBe(1);
    expect(result.extractedExpressions[3].length).toBe(1);

    expect(result.extractedExpressions[0][0].getText()).toBe('someNode');
    expect(result.extractedExpressions[1][0].getText()).toBe('anotherNode');
    expect(result.extractedExpressions[2][0].getText()).toBe('moreNodes');
    expect(result.extractedExpressions[3][0].getText()).toBe('evenMoreNodes');
  });

  test('Test Case 7: Missing closing parentheses (edge case)', () => {
    const template = findTemplateByName('template7');
    const result = extractNodesFromTemplateStringLiteral(template);

    // With missing closing parenthesis, all nodes stay in the same group
    expect(result.extractedExpressions.length).toBe(1);
    expect(result.extractedExpressions[0].length).toBe(3);

    expect(result.extractedExpressions[0][0].getText()).toBe('someNode');
    expect(result.extractedExpressions[0][1].getText()).toBe('anotherNode');
    expect(result.extractedExpressions[0][2].getText()).toBe('moreNodes');
  });

  test('Test Case 8: Empty var() functions', () => {
    const template = findTemplateByName('template8');
    const result = extractNodesFromTemplateStringLiteral(template);

    expect(result.extractedExpressions.length).toBe(1);
    expect(result.extractedExpressions[0].length).toBe(1);
    expect(result.extractedExpressions[0][0].getText()).toBe('someNode');
  });

  test('Test Case 9: Mix of CSS properties and var() functions', () => {
    const template = findTemplateByName('template9');
    const result = extractNodesFromTemplateStringLiteral(template);

    expect(result.extractedExpressions.length).toBe(2);
    expect(result.extractedExpressions[0].length).toBe(1);
    expect(result.extractedExpressions[1].length).toBe(1);

    expect(result.extractedExpressions[0][0].getText()).toBe('someNode');
    expect(result.extractedExpressions[1][0].getText()).toBe('anotherNode');
  });
});
