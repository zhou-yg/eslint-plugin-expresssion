const espree = require('espree');

let code;

code = `
var a = 1;
var Cpt = Vue.extend({
  mounted () {
  },
});
`
code = `
// this.$store.dispatch("update");
this.$store.state.d = 1;
// this.$store.state.mdule.b = 2;
`

var ast = espree.parse(code, {
  ecmaVersion: 6,

  // specify which type of script you're parsing ("script" or "module")
  sourceType: "script",
});

console.log(JSON.stringify(ast,null,2));
