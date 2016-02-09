'use strict'

var miss = require('mississippi')
var config = require('../config')

var setupItem = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log(item._id + ': setup-item')

  item.errors = []
  item.CALLBACK_STATUS_URL = config.CALLBACK_STATUS_URL + '/' + item._id || false
  item.CALLBACK_STATUS_MESSAGE = config.CALLBACK_STATUS_MESSAGE
  item.distribution = {
    CALLBACK_STATUS_URL: config.CALLBACK_STATUS_URL + '/' + item._id || false,
    sendCopyToParents: true
  }
  item.archive = {
    CALLBACK_STATUS_URL: config.CALLBACK_STATUS_URL + '/' + item._id || false
  }

  return callback(null, JSON.stringify(item))
})

module.exports = setupItem
