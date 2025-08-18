// @ts-check
const { createTransformer: swcCreateTransformer } = require('@swc/jest');

/**
 * @param {Parameters<typeof swcCreateTransformer>[number]} swcTransformOpts
 * @returns {import('@jest/transform').Transformer}
 */
function createTransformer(swcTransformOpts) {
  const swcTransformer = swcCreateTransformer(swcTransformOpts);

  return {
    process(src, filename, options) {
      const transformedCode = swcTransformer.process?.(src, filename, options);
      const code = transformedCode?.code || '';

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
