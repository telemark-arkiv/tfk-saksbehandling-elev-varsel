'use strict'

const miss = require('mississippi')
const p360 = require('p360')
const config = require('../config')
const p360Options = {
  user: config.P360WS_USER,
  password: config.P360WS_PASSWORD,
  baseUrl: config.P360WS_BASEURL,
  options: {
    ignoredNamespaces: true
  }
}

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  var clientService = 'ContactService'
  var clientMethod = 'GetPrivatePersons'
  var args = {
    'parameter': {
      'PersonalIdNumber': item.studentId
    }
  }
  var options = {
    'p360': p360Options,
    'clientService': clientService,
    'clientMethod': clientMethod,
    'args': args
  }

  if (!item.p360Data) {
    console.log(item._id + ': lookup-360')

    p360(options, function (error, data) {
      if (error) {
        console.log(item._id + ': lookup-360 - error: ' + JSON.stringify(error))
        item.errors.push(JSON.stringify(error))
      } else {
        item.p360Data = data
      }
      return callback(null, JSON.stringify(item))
    })
  } else {
    console.log(item._id + ': lookup-360. Data exists')
    return callback(null, JSON.stringify(item))
  }
})
