const {getExpression} = require('../utils');

module.exports = {

  meta: {

  },
  create (context) {
      // console.log('jqoiwejqowiejqoiwjewoiq');

    return {
      'AssignmentExpression:exit' (node) {
        // console.log(node);
        if (node.operator === '=' && node.left.type === 'MemberExpression') {
          let code = getExpression(node.left);
          let rightCode = getExpression(node.right);

          // console.log(expression, code);
          if (/\$store\.state\.[\w+\.]+/.test(code)) {
            context.report({
              node,
              message: `You cant assign "{{value}}" directly to "{{expression}}"`,
              data: {
                value: rightCode,
                expression: code,
              },
            });
          }
        }
      },
    }
  }
};
