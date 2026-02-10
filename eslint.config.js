import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        // Meteor globals used with typeof checks
        Iron: "readonly",
        Router: "readonly",
        FlowRouter: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["error", {
        "vars": "all",
        "args": "none",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      "no-undef": "error",
      "no-redeclare": "warn",
      "no-prototype-builtins": "off",
      "no-empty": ["error", { "allowEmptyCatch": true }],
    },
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        chai: "readonly",
        describe: "readonly",
        it: "readonly",
        before: "readonly",
        after: "readonly",
      },
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".meteor/**",
      "package.js",
    ],
  },
];
