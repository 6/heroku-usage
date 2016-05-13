'use strict'
let cli = require('heroku-cli-util')
let co = require('co')
let _ = require('lodash')

function* run (context, heroku) {
  let res = yield {
    apps: heroku.request({
      method: 'GET',
      path: `/organizations/${context.org}/apps`,
    }),
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
  let currentInvoice = _(res.invoices).sortBy('period_start').reverse().value()[0];

  cli.debug(`Found ${res.apps.length} apps with ${res.addons.length} addons total.`)
  cli.debug(currentInvoice)
}

module.exports = {
  topic: 'usage',
  command: 'estimate',
  description: 'displays estimated monthly usage',
  help: 'Usage: heroku usage:estimate --org ORG',
  needsAuth: true,
  needsOrg: true,
  run: cli.command(co.wrap(run))
}
