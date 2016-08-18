'use strict'

const miss = require('mississippi')
const createPdfFromTemplate = require('tfk-template-to-pdf')
const uuid = require('uuid')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  if (item.sendCopyToGuardian && !item.dsfGuardian) {
    const prefix = document.sendToDistribution ? config.DISTRIBUTION_DIRECTORY_PATH : config.JOB_DIRECTORY_PATH
    const documentPath = prefix + '/' + uuid.v4() + '.pdf'
    const options = {
      templateData: item.noGuardianFoundNotification.data,
      templateFilepath: item.noGuardianFoundNotification.template,
      documentFilepath: documentPath,
      pdfServiceUrl: config.PDF_SERVICE_URL
    }

    console.log(item._id + ': generate-document-no-guardian-found')

    createPdfFromTemplate(options, function (error, data) {
      if (error) {
        item.errors.push(error.toString())
      } else {
        item.noGuardianFoundNotification.document = documentPath
      }
      return callback(null, JSON.stringify(item))
    })
  } else {
    console.log(item._id + ': generate-document-no-guardian-found - skipped')
    return callback(null, JSON.stringify(item))
  }
})
