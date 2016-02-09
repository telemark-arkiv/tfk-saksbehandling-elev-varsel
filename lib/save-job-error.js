'use strict'

var fs = require('fs')
var miss = require('mississippi')
var config = require('../config')

var saveJobError = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var fileName = config.DONE_DIRECTORY_PATH + '/' + item._id + '.json'

  if (item.errors.length > 0) {
    console.log(item._id + ': save-job-error')
    fs.writeFileSync(fileName, JSON.stringify(item, null, 2))
  }

  return callback(null, JSON.stringify(item))
})

module.exports = saveJobError
