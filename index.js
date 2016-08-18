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
  const setupRecipient = require('./lib/setup-recipient')
  const setupTemplates = require('./lib/setup-templates')
  const generateDocumentWarning = require('./lib/generate-document-warning')
  const generateDocumentNoGuardianFound = require('./lib/generate-document-no-guardian-found')
  const generateDocumentRestrictedAddress = require('./lib/generate-document-restricted-address')
  const encodeDocumentsToArchive = require('./lib/encode-documents-to-archive')
  const saveJobDistribution = require('./lib/save-job-distribution')
  const saveJobDone = require('./lib/save-job-done')
  const saveJobError = require('./lib/save-job-error')
  const cleanupJob = require('./lib/cleanup-job')
  const cleanupDocuments = require('./lib/cleanup-documents')
  const sendStatusMessage = require('./lib/send-status-message')
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
    generateDocumentWarning,
    generateDocumentNoGuardianFound,
    generateDocumentRestrictedAddress,
    encodeDocumentsToArchive,
    sendStatusMessage,
    saveJobDistribution,
    saveJobDone,
    saveJobError,
    cleanupDocuments,
    cleanupJob,
    finished
  )
}
