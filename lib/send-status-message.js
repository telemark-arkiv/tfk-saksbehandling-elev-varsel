'use strict'

var miss = require('mississippi')
var Wreck = require('wreck')
var generateToken = require('../lib/generate-token')
var config = require('../config')
var token = generateToken({key: config.JWT_KEY, payload: {system: 'tfk-saksbehandling-elev-varsel'}})
var wreckOptions = {
  json: true,
  headers: {
    Authorization: token
  },
  payload: JSON.stringify({status: config.CALLBACK_STATUS_MESSAGE})
}

var setupItem = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  Wreck.post(config.CALLBACK_STATUS_URL + item._id, wreckOptions, function (error, response, payload) {
    if (error) {
      return callback(error, null)
    } else {
      return callback(null, JSON.stringify(item))
    }
  })
})

module.exports = setupItem
