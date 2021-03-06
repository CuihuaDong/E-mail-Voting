module.exports = {
    extends: 'airbnb-base',
    rules: {
      'max-len': 0,
      'comma-dangle': 0,
      camelcase: 0,
      'consistent-return': 0,
      quotes: 0,
      'arrow-parens': 0,
      'new-cap': 0,
      'eol-last': 0,
      'global-require': 0,
      'no-plusplus': 0,
      'no-mixed-operators': 0,
      'no-underscore-dangle': 0,
      'linebreak-style': 0,
      'class-methods-use-this': 0,
      'no-restricted-syntax': 0,
      'no-unused-expressions': [
        2,
        {
          allowShortCircuit: true,
          allowTernary: true
        }
      ],
      'no-param-reassign': [
        2,
        {
          props: false
        }
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/tests/**/*.js']
        }
      ],
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 10 }],
      'object-curly-newline': 0
    },
    plugins: []
  };
  