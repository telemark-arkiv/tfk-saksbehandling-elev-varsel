'use strict'

var miss = require('mississippi')
var Wreck = require('wreck')
var generateToken = require('tfk-generate-jwt')
var config = require('../config')
var token = generateToken({key: config.JWT_KEY, payload: {system: 'tfk-saksbehandling-elev-varsel'}})
var wreckOptions = {
  json: true,
  headers: {
    Authorization: token
  }
}

var setupItem = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  if (item.CALLBACK_STATUS_URL) {
    wreckOptions.payload = JSON.stringify({status: item.CALLBACK_STATUS_MESSAGE})
    console.log(item._id + ': send-status-message')

    Wreck.post(item.CALLBACK_STATUS_URL, wreckOptions, function (error, response, payload) {
      if (error) {
        item.errors.push(JSON.stringify(error))
      }
      return callback(null, JSON.stringify(item))
    })
  } else {
    console.log(item._id + ': send-status-message. No message to send')
    return callback(null, JSON.stringify(item))
  }
})

module.exports = setupItem
