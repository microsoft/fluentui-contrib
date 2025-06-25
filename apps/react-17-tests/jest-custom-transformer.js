// @ts-check
const { createTransformer: swcCreateTransformer } = require('@swc/jest');

/**
 * Handles the transformation of renderHook imports and usage
 * @param {string} code The code to transform
 * @returns {string} The transformed code
 */
function transformRenderHookUsage(code) {
  if (!code.includes('.renderHook')) {
    return code;
  }

  let transformedCode = code;

  // Add import for react-hooks if it doesn't already exist
  if (!transformedCode.includes('@testing-library/react-hooks')) {
    // Add import at the top of the file - need to detect the appropriate import style
    const importStatement = transformedCode.toString().includes('require(')
      ? "const _reactHooks = require('@testing-library/react-hooks');"
      : "import * as _reactHooks from '@testing-library/react-hooks';";

    // Insert after the first line (preserving any shebang or strict mode directive)
    const lines = transformedCode.split('\n');
    lines.splice(1, 0, importStatement);
    transformedCode = lines.join('\n');
  }

  // Replace all occurrences of _react.renderHook with _reactHooks.renderHook
  transformedCode = transformedCode.replace(
    // if there are more react imports we need to take additional index into consideration
    /_react[0-9]?\.renderHook/g,
    '_reactHooks.renderHook'
  );

  return transformedCode;
}

/**
 * @param {Parameters<typeof swcCreateTransformer>[number]} swcTransformOpts
 * @returns {import('@jest/transform').Transformer}
 */
function createTransformer(swcTransformOpts) {
  const swcTransformer = swcCreateTransformer(swcTransformOpts);

  return {
    process(src, filename, options) {
      const transformedCode = swcTransformer.process?.(src, filename, options);
      const code = transformRenderHookUsage(transformedCode?.code || '');

      return {
        ...transformedCode,
        code,
      };
    },
  };
}

// Custom transformer to replace @testing-library/react renderHook imports with @testing-library/react-hooks
module.exports = {
  createTransformer,
};
