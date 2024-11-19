module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    process: false, // Changed from 'writable' to false
    describe: false, // Changed from 'readonly' to false
    test: false, // Changed from 'readonly' to false
    expect: false, // Changed from 'readonly' to false
    window: 'writable',
    global: 'writable',
    module: 'writable',
    require: 'readonly',
    __dirname: 'readonly',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        trailingComma: 'all',
        semi: true,
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-process-env': 'off',
    'no-redeclare': ['error', { builtinGlobals: false }], // Changed to false
    'no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^(React|_)',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'node/no-extraneous-require': 'off', // Added to fix server.js issues
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
};
