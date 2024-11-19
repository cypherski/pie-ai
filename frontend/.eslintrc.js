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
    'react-app',
    'react-app/jest',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  settings: {
    react: {
      version: '18.2.0', // Explicitly setting the React version from your package.json
    },
  },
  globals: {
    process: 'writable',
    window: 'writable',
    describe: 'readonly',
    test: 'readonly',
    expect: 'readonly',
    global: 'writable',
    module: 'writable',
    require: 'readonly',
    __dirname: 'readonly',
  },
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'react/no-unescaped-entities': 'off',
    'no-undef': 'warn',
    'no-process-env': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
