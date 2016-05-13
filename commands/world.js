'use strict'
module.exports = {
  topic: 'hello',
  command: 'world',
  description: 'says hello',
  help: 'help text for hello:world',
  run: function (context) {
    console.log('Hello, World!')
  }
}
