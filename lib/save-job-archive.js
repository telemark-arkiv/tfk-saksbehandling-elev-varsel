'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  const fileName = config.ARCHIVE_DIRECTORY_PATH + '/' + item._id + '.json'

  if (item.errors.length === 0 || (item.errors.length === 1 && item.dsfError)) {
    console.log(item._id + ': save-job-archive')
    if (item.dsfData) {
      item.archive.dsfData = JSON.parse(JSON.stringify(item.dsfData))
    }
    if (item.dsfError) {
      item.archive.dsfError = JSON.parse(JSON.stringify(item.dsfError))
    }
    if (item.sendCopyToGuardian && item.dsfGuardian) {
      item.archive.dsfGuardian = JSON.parse(JSON.stringify(item.dsfGuardian))
    }
    if (item.p360Data) {
      item.archive.p360Data = JSON.parse(JSON.stringify(item.p360Data))
    }
    fs.writeFileSync(fileName, JSON.stringify(item.archive, null, 2))
  } else {
    console.log(item._id + ': save-job-archive - nothing to archive due to errors')
  }

  return callback(null, JSON.stringify(item))
})
