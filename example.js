'use strict'

var saksbehandler = require('./index')

saksbehandler({}, function (error, message) {
  if (error) {
    console.error(error)
  } else {
    console.log(message)
  }
})
