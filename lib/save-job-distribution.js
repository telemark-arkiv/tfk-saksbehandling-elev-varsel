'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  var fileName = config.DISTRIBUTION_DIRECTORY_PATH + '/' + item._id + '.json'

  if (item.errors.length === 0 && item.sendToDistribution === true) {
    console.log(item._id + ': save-job-distribution')
    fs.writeFileSync(fileName, JSON.stringify(item.distribution, null, 2))
  } else {
    console.log(item._id + ': save-job-distribution - nothing to distribute due to errors')
  }

  return callback(null, JSON.stringify(item))
})
