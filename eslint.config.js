const { defineConfig } = require("eslint/config");
const globals = require("globals");
const js = require("@eslint/js");
const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",

      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },

    extends: [
      js.configs.recommended,
      typescriptEslint.configs["flat/recommended"],
      typescriptEslint.configs["flat/recommended-type-checked"],
      typescriptEslint.configs["flat/strict"],
    ],

    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^__",
          varsIgnorePattern: "^__",
          caughtErrorsIgnorePattern: "^__",
        },
      ],
    },
  },
]);
