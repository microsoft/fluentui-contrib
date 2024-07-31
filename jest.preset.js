const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  transform: {
    // TODO: override the nx default transform. without this we need to have ts-jest installed...
    // @see https://github.com/nrwl/nx/blob/master/packages/jest/preset/jest-preset.ts#L8-L13
    '^.+\\.(ts|js|html)$': ['@swc/jest'],
  },
  maxWorkers: isCI() ? 1 : '50%',
};

function isCI() {
  return (
    (process.env.CI && process.env.CI !== 'false') ||
    process.env.TF_BUILD === 'true' ||
    process.env.GITHUB_ACTIONS === 'true'
  );
}
