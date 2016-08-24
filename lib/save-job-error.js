'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  var fileName = config.ERROR_DIRECTORY_PATH + '/' + item._id + '.json'

  if ((item.dsfError && item.errors.length > 1) || (item.errors.length > 0 && !item.dsfError)) {
    console.log(item._id + ': save-job-error')
    fs.writeFileSync(fileName, JSON.stringify(item, null, 2))
  }

  return callback(null, JSON.stringify(item))
})
