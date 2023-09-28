// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu(
  { vue: true, typescript: true },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
      'vue/block-order': ['error', {
        order: [['script', 'template'], 'style'],
      }],
    },
  },
  {
    rules: {
      'style/semi': ['error', 'never'],
      'style/comma-dangle': 'off',
      'curly': 'off',
      'antfu/consistent-list-newline': 'off',
      'antfu/top-level-function': 'off',
      'no-alert': 'off',
      'no-console':'off',
      'max-statements-per-line':'off',
      'unicorn/prefer-number-properties': 'off',
      'ts/indent': 'off',
      'ts/no-use-before-define': 'off',
      'ts/brace-style': 'off',
      'ts/lines-between-class-members': 'off',
      'ts/consistent-type-definitions': 'off',
      'ts/comma-dangle': 'off',
      'ts/no-unused-vars': 'off',
    },
  },
)
