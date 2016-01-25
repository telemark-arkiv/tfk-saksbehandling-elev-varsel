'use strict'

var miss = require('mississippi')

var lookupTemplate = miss.through(function (chunk, encoding, callback) {
  var item = JSON.parse(chunk)

  console.log('lookupTemplate')

  item.templateFile = item.documentCategory + '.docx'

  return callback(null, JSON.stringify(item))
})

module.exports = lookupTemplate
