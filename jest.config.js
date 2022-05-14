module.exports = {
  displayName: 'Restcraft - A Minecraft REST API',
  clearMocks: true,
  rootDir: '.',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',

  coveragePathIgnorePatterns: [
    "<rootDir>/src/models/db/",
    "<rootDir>/src/typings/"
  ],

  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts"
  ],
  moduleNameMapper: {
    '@typings/(.*)': '<rootDir>/src/typings/$1',
    '@controllers/(.*)': '<rootDir>/src/api/controllers/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@routes/(.*)': '<rootDir>/src/api/routes/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1'
  }
};
