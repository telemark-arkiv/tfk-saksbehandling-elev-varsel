'use strict'

var saksbehandler = require('./index')
var input = require('./test/data/input.json')

saksbehandler(input, function (error, message) {
  if (error) {
    console.error(error)
  } else {
    console.log(message)
  }
})
