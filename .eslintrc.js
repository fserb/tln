"use strict";

module.exports = {
  extends: "eslint:recommended",
  rules: {
    "arrow-parens": ["error", "as-needed"],
    "camelcase": ["error"],
    "comma-spacing": [ "error" ],
    "padded-blocks": [ "error", "never" ],
    "comma-style": [ "error" ],
    "curly": [ "error", "multi-line"],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "max-len": [ "error", { "code": 80, "tabWidth": 2 } ],
    "no-multiple-empty-lines": [ "error", {max: 1} ],
    "no-tabs": [ "error" ],
    "no-var": [ "error" ],
    "no-trailing-spaces": [ "error" ],
    "no-unneeded-ternary": [ "error", { "defaultAssignment": false } ],
    "no-use-before-define": [ "error" ],
    "no-unused-vars": ["error", {"argsIgnorePattern": "^_", "varsIgnorePattern": "^_"}],
    "prefer-const": [ "error", { "destructuring": "all"}],
    "semi": ["error", "always"],
    "space-before-blocks": [ "error", "always"],
    "space-before-function-paren": ["error", "never"],
    "space-in-parens": [ "error", "never"],
    "array-bracket-spacing": [ "error", "never" ],
    "space-infix-ops": [ "error", {"int32Hint": true}],
  },
  env: {
    browser: true,
    es6: true
  },

  globals: {
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
};
