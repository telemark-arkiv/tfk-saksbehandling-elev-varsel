'use strict'

var miss = require('mississippi')
var fs = require('fs')
var streamifier = require('streamifier')
var lookupTemplate = require('./lib/lookupTemplate')
var finishItem = require('./lib/finishItem')
var input = require('./test/data/input.json')
var output = fs.createWriteStream('test/data/output.json')
var starter = streamifier.createReadStream(JSON.stringify(input))

function finished (error) {
  if (error) {
    console.error(error)
  } else {
    console.log('Hoorray')
  }
}

miss.pipe(
  starter,
  lookupTemplate,
  finishItem,
  output,
  finished
)
