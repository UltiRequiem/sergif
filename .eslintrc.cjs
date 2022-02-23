module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["node_modules/", "assets/", "dist/"],

  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },

  rules: {
    "@typescript-eslint/no-unsafe-call": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-empty-function": "off",
  },
};
