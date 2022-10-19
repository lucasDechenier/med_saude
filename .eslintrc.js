module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    // add more generic rulesets here, such as:
    'plugin:vue/recommended',
    'eslint:recommended', // Use this if you are using Vue.js 2.x.
  ],

  rules: {
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/prop-name-casing': 'off',
    'vue/no-v-html': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 3
        },
        multiline: {
          max: 3,
        }
      }
    ],
    "vue/first-attribute-linebreak": ["error", {
      "singleline": "ignore",
      "multiline": "ignore"
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0,
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  'extends': [
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:vue/essential',
  ]
}
