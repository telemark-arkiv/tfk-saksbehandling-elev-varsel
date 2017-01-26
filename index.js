'use strict'

module.exports = (item, callback) => {
  const miss = require('mississippi')
  const getNextJob = require('./lib/get-next-job')
  const setupItem = require('./lib/setup-item')
  const lookupDsf = require('./lib/loookup-dsf')
  const lookup360 = require('./lib/lookup-360')
  const unwrapContactInformation = require('./lib/unwrap-contact-information')
  const unwrapParentsInformation = require('./lib/unwrap-parents-information')
  const filterParentsInformation = require('./lib/filter-parents-information')
  const lookupGuardianInformation = require('./lib/lookup-guardian-information')
  const lookupRestrictedAddress = require('./lib/lookup-restricted-address')
  const setupArchive = require('./lib/setup-archive')
  const setupDistribution = require('./lib/setup-distribution')
  const setupRecipient = require('./lib/setup-recipients')
  const setupTemplates = require('./lib/setup-templates')
  const generateDocuments = require('./lib/generate-documents')
  const encodeDocumentsToArchive = require('./lib/encode-documents-to-archive')
  const saveJobArchive = require('./lib/save-job-archive')
  const saveJobDistribution = require('./lib/save-job-distribution')
  const saveJobDone = require('./lib/save-job-done')
  const saveJobError = require('./lib/save-job-error')
  const cleanupJob = require('./lib/cleanup-job')
  const cleanupDocuments = require('./lib/cleanup-documents')
  const sendStatusMessage = require('./lib/send-status-message')
  const updateStats = require('./lib/update-stats')
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
    setupDistribution,
    setupRecipient,
    setupTemplates,
    generateDocuments,
    encodeDocumentsToArchive,
    sendStatusMessage,
    saveJobDistribution,
    saveJobArchive,
    saveJobDone,
    saveJobError,
    cleanupDocuments,
    cleanupJob,
    updateStats,
    finished
  )
}
