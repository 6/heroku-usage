'use strict'
let cli = require('heroku-cli-util')
let co = require('co')
let moment = require('moment')
let _ = require('lodash')
let numeral = require('numeral')

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
  let invoiceStartedAt = Date.parse(currentInvoice.created_at);
  let invoiceEndsAt = Date.parse(moment(currentInvoice.created_at).add({months: 1}).add({days: 1}).utc().format());
  let percentInvoiceDurationElapsed = (Date.now() - invoiceStartedAt) / (invoiceEndsAt - invoiceStartedAt);
  let estimatedDynoUnits = currentInvoice.dyno_units / percentInvoiceDurationElapsed;

  let orgAppIds = _(res.apps).map('id').value()
  let orgAddons = _(res.addons).filter(function(addon) {
    return _.includes(orgAppIds, addon.app.id)
  }).value()
  let totalAddonCostCents = _(orgAddons).map('plan.price.cents').sum()
  let formattedMonthlyAddonCost = numeral(Math.ceil(totalAddonCostCents / 100))

  cli.styledHeader("Usage for pay period starting on " + moment(invoiceStartedAt).utc().format("MMM Do YYYY") + "\n");

  cli.table([
    {metric: 'Dyno units (current)',  value: Math.round(currentInvoice.dyno_units)},
    {metric: 'Dyno units (estimated)', value: Math.round(estimatedDynoUnits)},
    {metric: 'Addons', value: "$" + formattedMonthlyAddonCost +  " / month"},
  ],{
    columns: [
      {key: 'metric'},
      {key: 'value', label: 'Value', format: language => cli.color.green(language)},
    ],
  });
}

module.exports = {
  topic: 'usage',
  command: 'monthly',
  description: 'displays current and estimated monthly usage',
  help: 'Usage: heroku usage:monthly --org ORG',
  needsAuth: true,
  needsOrg: true,
  run: cli.command(co.wrap(run))
}
