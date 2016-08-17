'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  var fileName = config.JOB_DIRECTORY_PATH + '/' + item._id + '.json'

  console.log(item._id + ': cleanup-job')

  fs.unlinkSync(fileName)

  return callback(null, JSON.stringify(item))
})
