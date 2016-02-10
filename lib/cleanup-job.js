'use strict'

var fs = require('fs')
var miss = require('mississippi')
var config = require('../config')

var setupItem = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var fileName = config.JOB_DIRECTORY_PATH + '/' + item._id + '.json'

  console.log(item._id + ': cleanup-job')

  fs.unlinkSync(fileName)

  return callback(null, JSON.stringify(item))
})

module.exports = setupItem
