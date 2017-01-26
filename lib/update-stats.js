'use strict'

const fs = require('fs')
const fbs = require('firebase-save')
const miss = require('mississippi')
const config = require('../config')
const pkg = require('../package.json')
const isJson = (file) => file.endsWith('.json')

module.exports = miss.through((chunck, encoding, callback) => {
  const item = JSON.parse(chunck)

  console.log(`${item._id}: update-stats - start`)

  const database = fbs(config.fireBase)
  const data = {
    key: pkg.name,
    value: {
      jobs: fs.readdirSync(config.JOB_DIRECTORY_PATH).filter(isJson).length,
      errors: fs.readdirSync(config.ERROR_DIRECTORY_PATH).filter(isJson).length,
      done: fs.readdirSync(config.DONE_DIRECTORY_PATH).filter(isJson).length,
      archive: fs.readdirSync(config.ARCHIVE_DIRECTORY_PATH).filter(isJson).length,
      distribution: fs.readdirSync(config.DISTRIBUTION_DIRECTORY_PATH).filter(isJson).length
    }
  }
  database.save(data)
    .then((result) => {
      console.log(`${item._id}: update-stats - finished - ${JSON.stringify(result)}`)
      return callback(null, JSON.stringify(item))
    }).catch((error) => {
      console.log(`${item._id}: update-stats - error - ${JSON.stringify(error)}`)
      return callback(null, JSON.stringify(item))
    })
})
