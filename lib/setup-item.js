'use strict'

var miss = require('mississippi')
var config = require('../config')

var setupItem = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log('setup-item')

  item.errors = []
  item.distribution = {
    callbackStatusUrl: config.CALLBACK_STATUS_URL || false,
    sendCopyToParents: true
  }

  return callback(null, JSON.stringify(item))
})

module.exports = setupItem
