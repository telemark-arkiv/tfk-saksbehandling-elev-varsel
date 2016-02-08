'use strict'

var fs = require('fs')
var miss = require('mississippi')
var config = require('../config')

var getNextJob = miss.through(function (chunck, encoding, callback) {
  var jobs = fs.readdirSync(config.JOB_DIRECTORY_PATH)
  var item

  console.log('get-next-job')

  if (jobs.length > 0) {
    item = fs.readFileSync(config.JOB_DIRECTORY_PATH + '/' + jobs[0])
    return callback(null, item.toString())
  } else {
    return callback(new Error('No jobs in queue'), null)
  }
})

module.exports = getNextJob
