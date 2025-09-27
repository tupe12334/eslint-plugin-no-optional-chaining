import noOptionalChaining from './lib/rules/no-optional-chaining.js';

export default {
  meta: {
    name: 'eslint-plugin-no-optional-chaining',
    version: '1.0.0'
  },
  rules: {
    'no-optional-chaining': noOptionalChaining
  },
  configs: {
    recommended: {
      plugins: ['no-optional-chaining'],
      rules: {
        'no-optional-chaining/no-optional-chaining': 'error'
      }
    }
  }
};