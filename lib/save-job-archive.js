'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  const fileName = config.ARCHIVE_DIRECTORY_PATH + '/' + item._id + '.json'

  if (item.errors.length === 0 || (item.errors === 1 && item.dsfError)) {
    console.log(item._id + ': save-job-archive')
    fs.writeFileSync(fileName, JSON.stringify(item.archive, null, 2))
  } else {
    console.log(item._id + ': save-job-archive - nothing to archive due to errors')
  }

  return callback(null, JSON.stringify(item))
})
