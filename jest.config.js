module.exports = {
  displayName: 'Restcraft - A Minecraft REST API',
  clearMocks: true,
  rootDir: '.',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    //'@eg/(.*)': '<rootDir>/src/eg/$1'
  }
};
