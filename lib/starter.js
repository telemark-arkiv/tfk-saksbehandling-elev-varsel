'use strict'

var thru = require('thru')

var starter = thru(function (callback) {
  var item = require('../test/data/input.json')

  console.log('starter')

  return callback(JSON.stringify(item))
})

module.exports = starter
