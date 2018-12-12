const espree = require('espree');

let code;

code = `
var a = window.x;

b = a(window.z)

const c = window.y;
`

var ast = espree.parse(code, {
  ecmaVersion: 6,

  // specify which type of script you're parsing ("script" or "module")
  sourceType: "script",
});

console.log(JSON.stringify(ast,null,2));
