'use strict'
exports.topic = {
  name: 'hello',
  description: 'a topic for the hello world plugin'
}

exports.commands = [
  require('./commands/world.js')
]
