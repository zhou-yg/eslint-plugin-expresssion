exports.getExpression = function getExpression(left) {
  let expression = [];
  while (left) {
    switch (left.type) {
      case 'MemberExpression':
        expression = expression.concat(getExpression(left.property));
        left = left.object;
        break;
      case 'ThisExpression':
        expression.push('this');
        left = null;
        break;
      case 'Literal':
        expression.push(`['${left.value}']`);
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
  let code = expression.reverse().join('.').replace(/\.\[/g, '[');
  return code;
}
