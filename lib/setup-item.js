'use strict'

var miss = require('mississippi')
var config = require('../config')

var setupItem = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log(item._id + ': setup-item')

  item.errors = []
  if (item.CALLBACK_STATUS_URL) {
    item.CALLBACK_STATUS_URL = item.CALLBACK_STATUS_URL + '/' + item._id
  }
  item.CALLBACK_STATUS_MESSAGE = config.CALLBACK_STATUS_MESSAGE
  item.distribution = {
    '_id': item._id,
    documentTemplates: [],
    documents: [],
    CALLBACK_STATUS_URL: item.CALLBACK_STATUS_URL
  }

  return callback(null, JSON.stringify(item))
})

module.exports = setupItem
