module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:import/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['node_modules/', 'assets/', 'dist/'],

  rules: {
    'import/prefer-default-export': 'off',
  },

  overrides: [
    {
      files: ['*.ts'],

      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      parserOptions: {
        tsconfigRootDir: `${__dirname}/frontend`,
        project: ['./tsconfig.json'],
      },

      rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-empty-function': 'off',
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            ts: 'never',
          },
        ],
      },
    },
  ],
};
