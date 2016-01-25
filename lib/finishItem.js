'use strict'

var miss = require('mississippi')

var finishItem = miss.through(function (chunck, encoding, callback) {

    var item = JSON.parse(chunck)

    console.log('finishItem')

    return callback(null, JSON.stringify(item, null, 2))
  })

module.exports = finishItem
