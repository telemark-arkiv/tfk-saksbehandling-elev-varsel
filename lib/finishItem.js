'use strict'

var thru = require('thru')

var finishItem = thru(function (itemString, callback) {
  var item = JSON.parse(itemString)

  console.log('finishItem')

  return callback(null, JSON.stringify(item, null, 2))
})

module.exports = finishItem
