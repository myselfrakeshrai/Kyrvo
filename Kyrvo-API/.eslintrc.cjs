module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "semi": "off",
    "@typescript-eslint/semi": ["error", "always"],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        'multiline': {
          'delimiter': 'semi',
          'requireLast': true
        },
        'singleline': {
          'delimiter': 'semi',
          'requireLast': true
        }
      }
    ],
    // 'prettier/prettier': [
    //   "error",
    //   {
    //     "endOfLine": "auto",
    //     "semi":true,
    //   },{
    //     "usePrettierrc": false
    //   }
    // ]
  },
}
