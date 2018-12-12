const {getExpression} = require('../utils');

const WINDOW_VAR_NAME = 'window';

module.exports = {

  meta: {

  },
  create (context) {
      // console.log('jqoiwejqowiejqoiwjewoiq');

    return {
      'MemberExpression:exit': (node) => {
        let r1 = node.object.type === 'Identifier' && node.object.name === WINDOW_VAR_NAME;
        let r2 = node.property.type === 'Identifier';
        let r3 = node.property.type === 'Literal';
        let r4 = r1 && (r2 || r3);
        let code = getExpression(node);
        // console.log(node);
        // console.log(`${r1} & ( ${r2} || ${r3} ) =`, r4);
        // console.log(code);

        if (r4) {
          context.report({
            node,
            message: `You'd better not write expression with "window" in vue file, "{{code}}"`,
            data: {
              code,
            },
          });
        }
      },
    }
  }
}
