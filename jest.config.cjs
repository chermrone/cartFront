module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jest-environment-jsdom',

  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  transform: {
    '^.+\\.(ts|js|mjs|html)$': 'jest-preset-angular',
  },

  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)',
  ],

  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
};
