'use strict'

var fs = require('fs')
var miss = require('mississippi')
var config = require('../config')

var setupItem = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var fileName = config.DISTRIBUTION_DIRECTORY_PATH + '/' + item._id + '.json'

  console.log('save-job-distribution')

  fs.writeFileSync(fileName, JSON.stringify(item, null, 2))

  return callback(null, JSON.stringify(item))
})

module.exports = setupItem
