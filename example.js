'use strict'

var saksbehandler = require('./index')
var input = {}

saksbehandler(input, function (error, message) {
  if (error) {
    console.error(error)
  } else {
    console.log(message)
  }
})
