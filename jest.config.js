module.exports = {
  displayName: 'Restcraft - A Minecraft REST API',
  clearMocks: true,
  rootDir: '.',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@typings/(.*)': '<rootDir>/src/typings/$1',
    '@controllers/(.*)': '<rootDir>/src/controllers/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@routes/(.*)': '<rootDir>/src/routes/$1',
    '@schemas/(.*)': '<rootDir>/src/schemas/$1',
    '@utils/(.*)': '<rootDir>/src/eutilsg/$1'
  }
};
