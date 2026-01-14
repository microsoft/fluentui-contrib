// @ts-check
const { createTransformer: swcCreateTransformer } = require('@swc/jest');

/**
 * Transforms `@testing-library/react` imports to React 17 compatible `@testing-library/react-hooks`.
 * @param {string} source
 * @returns {string}
 */
function transformReactHooksImports(source) {
  /**
   * @see https://react-hooks-testing-library.com/reference/api
   */
  const REACT_HOOKS_API = [
    'renderHook',
    'act',
    'cleanup',
    // NOTE: Following APIs are not exposed via `@testing-library/react`, thus skipping
    // 'addCleanup',
    // 'removeCleanup',
    // 'suppressErrorOutput',
  ];

  return source.replace(
    /import\s*{([^}]+)}\s*from\s*['"]@testing-library\/react['"];?/g,
    (match, importContent) => {
      const symbols = importContent
        .split(',')
        .map((/** @type {any} */ s) => s.trim())
        .filter(Boolean);

      /** @type {string[]} */
      const hooksSymbols = [];
      /** @type {string[]} */
      const reactSymbols = [];

      for (const symbol of symbols) {
        // Handle "originalName as alias"
        const originalName = symbol.split(/\s+as\s+/)[0].trim();

        if (REACT_HOOKS_API.includes(originalName)) {
          hooksSymbols.push(symbol);
        } else {
          reactSymbols.push(symbol);
        }
      }

      if (hooksSymbols.length === 0) {
        return match;
      }

      const hooksImport = `import { ${hooksSymbols.join(
        ', '
      )} } from '@testing-library/react-hooks';`;

      if (reactSymbols.length > 0) {
        return (
          `import { ${reactSymbols.join(
            ', '
          )} } from '@testing-library/react';\n` + hooksImport
        );
      }

      return hooksImport;
    }
  );
}

/**
 * @param {Parameters<typeof swcCreateTransformer>[number]} swcTransformOpts
 * @returns {import('@jest/transform').Transformer}
 */
function createTransformer(swcTransformOpts) {
  const swcTransformer = swcCreateTransformer(swcTransformOpts);

  return {
    process(src, filename, options) {
      const transformedSource = transformReactHooksImports(src);
      const transformedCode = swcTransformer.process?.(
        transformedSource,
        filename,
        options
      );

      return /** @type {NonNullable<typeof transformedCode>}*/ (
        transformedCode
      );
    },
  };
}

// Custom transformer to replace @testing-library/react renderHook imports with @testing-library/react-hooks
module.exports = {
  createTransformer,
};
