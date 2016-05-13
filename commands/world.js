'use strict'
let cli = require('heroku-cli-util')
let co  = require('co')

function* run (context, heroku) {
  let res = yield {
    addons: heroku.request({
      method: 'GET',
      path: '/addons',
      // Accept-Expansion: plan reveals pricing per addon
      headers: { 'Accept-Expansion': 'plan' },
    }),
    invoices: heroku.request({
      method: 'GET',
      path: `/organizations/${context.org}/invoices`,
    })
  }
  let currentInvoice = res.invoices[res.invoices.length - 1];

  cli.debug(`Found ${res.addons.length} addons total.`)
  cli.debug(currentInvoice)
}

module.exports = {
  topic: 'hello',
  command: 'world',
  description: 'says hello',
  help: 'help text for hello:world',
  needsAuth: true,
  needsOrg: true,
  run: cli.command(co.wrap(run))
}
