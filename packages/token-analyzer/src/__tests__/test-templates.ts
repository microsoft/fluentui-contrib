export const someNode = 'some value';
export const anotherNode = 'another value';
export const moreNodes = 'more values';
export const evenMoreNodes = 'even more values';

// Test case 1: Basic example with nested var() functions
export const template1 = `var(--a, var(${someNode}, var(${anotherNode}))) var(${moreNodes}, var(${evenMoreNodes}))`;

// Test case 2: Mixed content with different nesting patterns
export const template2 = `var(--x) no-extraction var(--y, ${someNode}) var(${moreNodes}, var(--z, ${anotherNode}, ${evenMoreNodes}))`;

// Test case 3: No var functions
export const template3 = `no var functions here just ${someNode} and ${anotherNode}`;

// Test case 4: Simple case with one var function
export const template4 = `var(${someNode}) simple case`;

// Test case 5: Deeply nested var() functions
export const template5 = `var(--deep, var(--deeper, var(--deepest, ${someNode}, ${anotherNode}, var(${moreNodes}))))`;

// Test case 6: Multiple var() functions at the same level
export const template6 = `var(${someNode}) var(${anotherNode}) var(${moreNodes}) var(${evenMoreNodes})`;

// Test case 7: Missing closing parentheses (edge case)
export const template7 = `var(--broken, var(${someNode}, var(${anotherNode})) var(${moreNodes})`;

// Test case 8: Empty var() functions
export const template8 = `var(--empty) var(--also-empty, ${someNode})`;

// Test case 9: Mix of CSS properties and var() functions
export const template9 = `color: red; background: var(--bg, ${someNode}); padding: 10px; border: var(--border, ${anotherNode})`;
