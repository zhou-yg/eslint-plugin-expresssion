function getExpression(left) {
  let expression = [];
  while (left) {
    switch (left.type) {
      case 'MemberExpression':
        expression.push(left.property.name);
        left = left.object;
        break;
      case 'ThisExpression':
        expression.push('this');
        left = null;
        break;
      case 'Literal':
        expression.push(left.value);
        left = null;
        break;
      case 'Identifier':
        expression.push(left.name);
        left = null;
        break;
      default:
        left = null;
    }
  }
  let code = expression.reverse().join('.');
  return code;
}

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
