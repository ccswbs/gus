const backstop = require('backstopjs');

module.exports = {
  onSuccess: () => {
    backstop('reference', {config:'backstop.config.js'});
    backstop('test', {config:'backstop.config.js'});
  },
}