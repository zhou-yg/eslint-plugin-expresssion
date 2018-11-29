const rules = require('../lib/').rules;
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
  },
};

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('use-t-function', rules.assign2state, {
  valid: [
    { code: 'this.$store.dispatch("update")' },
  ],

  invalid: [
    {
      code: 'this.$store.state.a=1;this.$store.state.a.b=2;',
      errors: [
        {
          message: `You cant assign "1" directly to "$store.state.a"`,
          type: 'AssignmentExpression',
        },
        {
          message: `You cant assign "2" directly to "$store.state.a.b"`,
          type: 'AssignmentExpression',
        },
      ],
    },
  ],
});
