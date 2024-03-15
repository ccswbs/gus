const backstop = require('backstopjs');

module.exports = {
  onPreBuild: () => {
    console.log("-------------------------------------------------------");
    console.log("Testing URL: " + process.env.BACKSTOPJS_URL);
    console.log("Reference URL: " + process.env.BACKSTOPJS_REF);
    console.log("-------------------------------------------------------");

    backstop('test', {config:'../backstop.config.js'});
  },
}