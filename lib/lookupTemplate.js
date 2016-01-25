'use strict'

var thru = require('thru')

var lookupTemplate = thru(function (itemString, callback) {
  var item = JSON.parse(itemString)

  console.log('lookupTemplate')

  item.templateFile = item.documentCategory + '.docx'

  return callback(null, JSON.stringify(item))
})

module.exports = lookupTemplate
