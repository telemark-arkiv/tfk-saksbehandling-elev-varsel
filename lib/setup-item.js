'use strict'

const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  console.log(item._id + ': ' + item.studentName)
  console.log(item._id + ': setup-item')

  item.errors = []
  item.CALLBACK_STATUS_MESSAGE = config.CALLBACK_STATUS_MESSAGE
  item.gotRestrictedAddress = true

  return callback(null, JSON.stringify(item))
})
