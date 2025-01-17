module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    Game: 'writable',
    l: 'readonly',
    b64_to_utf8: 'readonly',
    utf8_to_b64: 'readonly',
    BeautifyAll: 'readonly',
    PlaySound: 'readonly',
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      rules: {
        'import/extensions': 'off', // To allow importing .ts without errors
        'import/no-unresolved': 'off', // To allow importing .ts without errors
      },
    },
  ],
  ignorePatterns: ['*CookieMonster*.js', 'dist/*', 'node_modules/*'],
  rules: {
    'import/no-mutable-exports': 'off', // We need to this throughout Cookie Monster
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'func-names': 'off', // To allow unnamed arrow functions
    'prefer-destructuring': ['error', { object: true, array: false }], // Importing arrays and then destructuring them seems to fail
    'max-len': [
      1,
      {
        code: 100,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
  },
};
