const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  transform: {
    // TODO: override the nx default transform. without this we need to have ts-jest installed...
    // @see https://github.com/nrwl/nx/blob/master/packages/jest/preset/jest-preset.ts#L8-L13
    '^.+\\.(ts|js|html)$': ['@swc/jest'],
  },
};
