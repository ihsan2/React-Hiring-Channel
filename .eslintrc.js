module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "class-methods-use-this-regex"],
  rules: {
    "no-control-regex": 0,
    "class-methods-use-this": 0,
    "class-methods-use-this-regex/class-methods-use-this": [
      2,
      {
        exceptMethods: ["render"]
      }
    ]
  }
};
