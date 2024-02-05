import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  rules: {
    'style/semi': ['error', 'never'],
    'style/max-statements-per-line': ['off'],
    'style/jsx-quotes': ['error', 'prefer-single'],
    'style/jsx-max-props-per-line': ['off'],
    'style/jsx-one-expression-per-line': ['off'],
    'style/jsx-closing-tag-location': ['off'],
    'style/comma-dangle': 'off',
    'style/brace-style': 'off',
    'style/jsx-tag-spacing': 'off',
    'style/jsx-closing-bracket-location': 'off',
    'style/object-curly-spacing': 'off',
    'style/jsx-first-prop-new-line': 'off',
    'style/jsx-wrap-multilines': 'off',
    'style/jsx-curly-newline': 'off',
    'style/member-delimiter-style': 'off',
    'curly': 'off',
    'antfu/consistent-list-newline': 'off',
    'antfu/top-level-function': 'off',
    'no-alert': 'off',
    'no-console': 'off',
    'unicorn/prefer-number-properties': 'off',
    'ts/no-use-before-define': 'off',
    'ts/lines-between-class-members': 'off',
    'ts/consistent-type-definitions': 'off',
    'ts/comma-dangle': 'off',
    'ts/no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'off'
  },
})
