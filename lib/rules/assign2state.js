module.exports = {

  meta: {

  },
  create (context) {
      // console.log('jqoiwejqowiejqoiwjewoiq');

    return {
      'AssignmentExpression:exit' (node) {
        // console.log(node);
        if (node.operator === '=' && node.left.type === 'MemberExpression') {
          let left = node.left;
          let expression = [];
          while (left && left.property) {
            expression.push(left.property.name)
            left = left.object;
          }
          let code = expression.reverse().join('.');
          // console.log(expression, code);
          if (/\$store\.state\.[\w+\.]+/.test(code)) {
            context.report({
              node,
              message: `You cant assign "{{value}}" directly to "{{expression}}"`,
              data: {
                value: node.right.value,
                expression: code,
              },
            });
          }
        }
      },
    }
  }
};
