'use strict'

function tfkSaksbehandlingElevVarsel (item, callback) {
  var miss = require('mississippi')
  var streamifier = require('streamifier')
  var getNextJob = require('./lib/get-next-job')
  var setupItem = require('./lib/setup-item')
  var setupRecipient = require('./lib/setup-recipient')
  var setupTemplates = require('./lib/setup-templates')
  var generateDocuments = require('./lib/generate-documents')
  var saveJobArchive = require('./lib/save-job-archive')
  var saveJobDistribution = require('./lib/save-job-distribution')
  var saveJobDone = require('./lib/save-job-done')
  var cleanupJob = require('./lib/cleanup-job')
  var sendStatusMessage = require('./lib/send-status-message')
  var starter = streamifier.createReadStream(JSON.stringify(item))

  function finished (error) {
    if (error) {
      callback(error, null)
    } else {
      callback(null, {message: 'Success'})
    }
  }

  miss.pipe(
    starter,
    getNextJob,
    setupItem,
    setupRecipient,
    setupTemplates,
    generateDocuments,
    sendStatusMessage,
    saveJobArchive,
    saveJobDistribution,
    saveJobDone,
    cleanupJob,
    finished
  )
}

module.exports = tfkSaksbehandlingElevVarsel
