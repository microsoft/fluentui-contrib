/* eslint-disable */
const { readFileSync } = require('fs');

const { exclude: _, ...swcJestConfig } = JSON.parse(
  readFileSync(`${__dirname}/.swcrc`, 'utf-8')
);

if (swcJestConfig.swcrc === undefined) {
  swcJestConfig.swcrc = false;
}

module.exports = {
  displayName: 'cap-foundations-react',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', swcJestConfig],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\.module\.css$': '<rootDir>/__mocks__/style-mock.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'html'],
  testEnvironment: 'jsdom',
  coverageDirectory: '../../../coverage/packages/cap-foundations/react',
};
