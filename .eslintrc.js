module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off'
  },

  //  extends: ['plugin:vue/essential', '@vue/prettier']
  parserOptions: {
    parser: 'babel-eslint'
  },

  'extends': 'plugin:vue/essential'
}
