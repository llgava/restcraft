module.exports = {
  displayName: 'Minecraft Marketplace API',
  clearMocks: true,
  rootDir: '.',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@routes/(.*)': '<rootDir>/src/routes/$1',
    '@schemas/(.*)': '<rootDir>/src/schemas/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@controllers/(.*)': '<rootDir>/src/controllers/$1'
  }
};
