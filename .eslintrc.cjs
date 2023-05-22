module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    './.eslintrc-auto-import.json',
    'plugin:prettier/recommended' //必须放在最后面
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  ignorePatterns: ['dist'],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'prefer-const': 1,
    semi: [1, 'always'],
    'no-undef': 0,
    'no-empty': 0,
    '@typescript-eslint/no-empty-interface': 0
  }
};
