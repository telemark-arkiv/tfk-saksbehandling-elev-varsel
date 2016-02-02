'use strict'

function tfkSaksbehandlingElevVarsel (item, callback) {
  var miss = require('mississippi')
  var fs = require('fs')
  var streamifier = require('streamifier')
  var setupItem = require('./lib/setup-item')
  var setupRecipient = require('./lib/setup-recipient')
  var setupTemplates = require('./lib/setup-templates')
  var generateDocuments = require('./lib/generate-documents')
  var finishItem = require('./lib/finishItem')
  var output = fs.createWriteStream('test/data/output.json')
  var starter = streamifier.createReadStream(JSON.stringify(item))

  function finished (error) {
    if (error) {
      callback(error, null)
    } else {
      callback(null, {message: 'Success'})
    }
  }

  miss.pipe(
    starter,
    setupItem,
    setupRecipient,
    setupTemplates,
    generateDocuments,
    finishItem,
    output,
    finished
  )
}

module.exports = tfkSaksbehandlingElevVarsel
