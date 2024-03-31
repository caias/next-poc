module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.base.json", "./libs/**/tsconfig.json"],
  },
  // eslint override할경우
  "overrides": [
    {
      // extends: ["plugin:react-hooks/recommended"],
      // files: ["packages/core/**/*.ts?(x)", "packages/core/**/*.js?(x)"],
      // plugins: ["react-refresh"],
      // rules: {
      //   "react-refresh/only-export-components": "warn",
      // },
    }
  ],
}
