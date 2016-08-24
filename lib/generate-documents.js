'use strict'

const miss = require('mississippi')
const createPdfFromTemplate = require('tfk-template-to-pdf')
const uuid = require('uuid')
const config = require('../config')

module.exports = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var documents = item.documents || []
  var documentsForDistribution = item.distribution.documents
  var templates = item.documentTemplates || []

  item.CALLBACK_STATUS_MESSAGE = 'Varselbrev produsert'

  const areWeDoneYet = () => {
    if (templates.length > 0) {
      next()
    } else {
      return callback(null, JSON.stringify(item))
    }
  }

  const next = () => {
    const document = templates.pop()
    const prefix = document.sendToDistribution ? config.DISTRIBUTION_DIRECTORY_PATH : config.JOB_DIRECTORY_PATH
    const documentPath = prefix + '/' + uuid.v4() + '.pdf'
    const options = {
      templateData: document.data,
      templateFilepath: document.template,
      documentFilepath: documentPath,
      pdfServiceUrl: config.PDF_SERVICE_URL
    }
    createPdfFromTemplate(options, function (error, data) {
      if (error) {
        item.errors.push(error.toString())
      } else {
        const doc = {
          title: document.title,
          offTitle: document.offTitle,
          type: document.type,
          document: documentPath,
          distribution: document.distribution
        }
        documents.push(doc)
        if (document.distribution) {
          doc.filsti = documentPath
          doc.mimetype = 'application/pdf'
          documentsForDistribution.push(doc)
        }
      }
      areWeDoneYet()
    })
  }

  console.log(item._id + ': generate-documents')

  if (templates) {
    next()
  } else {
    return callback(null, JSON.stringify(item))
  }
})
