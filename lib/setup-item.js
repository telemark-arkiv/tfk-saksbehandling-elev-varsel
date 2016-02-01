'use strict'

var miss = require('mississippi')

var setupItem = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  item.errors = []

  console.log('setup-item')

  return callback(null, JSON.stringify(item))
})

module.exports = setupItem
