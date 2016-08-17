'use strict'

module.exports = (item, callback) => {
  var miss = require('mississippi')
  var getNextJob = require('./lib/get-next-job')
  var setupItem = require('./lib/setup-item')
  const lookupDsf = require('./lib/loookup-dsf')
  const lookup360 = require('./lib/lookup-360')
  const unwrapContactInformation = require('./lib/unwrap-contact-information')
  const unwrapParentsInformation = require('./lib/unwrap-parents-information')
  const filterParentsInformation = require('./lib/filter-parents-information')
  const lookupGuardianInformation = require('./lib/lookup-guardian-information')
  const lookupRestrictedAddress = require('./lib/lookup-restricted-address')
  var setupArchive = require('./lib/setup-archive')
  var setupRecipient = require('./lib/setup-recipient')
  var setupTemplates = require('./lib/setup-templates')
  var generateDocuments = require('./lib/generate-documents')
  var generateDocumentNoGuardianFound = require('./lib/generate-document-no-guardian-found')
  var generateDocumentRestrictedAddress = require('./lib/generate-document-restricted-address')
  var saveJobDistribution = require('./lib/save-job-distribution')
  var saveJobDone = require('./lib/save-job-done')
  var saveJobError = require('./lib/save-job-error')
  var cleanupJob = require('./lib/cleanup-job')
  var cleanupDocuments = require('./lib/cleanup-documents')
  var sendStatusMessage = require('./lib/send-status-message')
  const starter = fromString(JSON.stringify(item))

  function fromString (string) {
    return miss.from(function (size, next) {
      // if there's no more content
      // left in the string, close the stream.
      if (string.length <= 0) return next(null, null)

      // Pull in a new chunk of text,
      // removing it from the string.
      var chunk = string.slice(0, size)
      string = string.slice(size)

      // Emit "chunk" from the stream.
      next(null, chunk)
    })
  }

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
    lookupDsf,
    lookup360,
    unwrapContactInformation,
    unwrapParentsInformation,
    filterParentsInformation,
    lookupGuardianInformation,
    lookupRestrictedAddress,
    setupArchive,
    setupRecipient,
    setupTemplates,
    generateDocuments,
    generateDocumentNoGuardianFound,
    generateDocumentRestrictedAddress,
    sendStatusMessage,
    saveJobDistribution,
    saveJobDone,
    saveJobError,
    cleanupDocuments,
    cleanupJob,
    finished
  )
}
