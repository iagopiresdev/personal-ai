/* eslint-disable no-undef */

module.exports = {
  env: { node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:storybook/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-refresh", "prettier"],
  root: true,
  rules: { "prettier/prettier": "error" },
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      alias: {
        map: [["~", "./src"]],
      },
    },
  },
};
