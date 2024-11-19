module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_'
    }],
    'node/no-unsupported-features/es-syntax': ['error', {
      version: '>=14.0.0',
      ignores: []
    }],
    'node/no-missing-require': 'error',
    'node/no-extraneous-require': 'error',
    'node/no-unpublished-require': 'off'
  }
};