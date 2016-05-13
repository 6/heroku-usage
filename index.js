'use strict'
exports.topic = {
  name: 'usage',
  description: 'current and estimated usage'
}

exports.commands = [
  require('./commands/estimate.js')
]
