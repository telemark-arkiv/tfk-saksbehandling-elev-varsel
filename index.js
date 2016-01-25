'use strict'

function tfkSaksbehandlingElevVarsel (item, callback) {
  var miss = require('mississippi')
  var fs = require('fs')
  var streamifier = require('streamifier')
  var lookupTemplate = require('./lib/lookupTemplate')
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
    lookupTemplate,
    finishItem,
    output,
    finished
  )
}

module.exports = tfkSaksbehandlingElevVarsel
