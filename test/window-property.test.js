const rules = require('../lib/').rules;
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
  },
};

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('window-property', rules['window-property'], {
  valid: [
  ],

  invalid: [
    {
      code: `
      var a = window['a'];

      const b = a(window.z);
      `,
      errors: [
        {
          message: `You'd better not write expression with "window" in vue file, "window['a']"`,
          type: 'MemberExpression',
        },
        {
          message: `You'd better not write expression with "window" in vue file, "window.z"`,
          type: 'MemberExpression',
        },
      ],
    },
  ],
});
