const backstop = require('backstopjs');

module.exports = {
  onSuccess: () => {
    backstop('test', {config:'backstop.config.js'});
  },
}