'use strict'

const miss = require('mississippi')
const Wreck = require('wreck')
const generateToken = require('tfk-generate-jwt')
const config = require('../config')
const token = generateToken({key: config.JWT_KEY, payload: {system: 'tfk-saksbehandling-elev-varsel'}})
var wreckOptions = {
  json: true,
  headers: {
    Authorization: token
  }
}

module.exports = miss.through((chunck, encoding, callback) => {
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
