const { createDefaultPreset } = require('ts-jest');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
      ...createDefaultPreset().transform,

      '^.+\\.ts$': 'ts-jest',
    },
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  };