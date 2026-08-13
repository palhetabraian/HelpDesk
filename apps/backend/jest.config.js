module.exports = {
  clearMocks: true,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
          module: 'CommonJS',
          moduleResolution: 'Node',
          types: ['node', 'jest'],
        },
      },
    ],
  },
};
