'use strict'

const miss = require('mississippi')
const createPdfFromTemplate = require('tfk-template-to-pdf-node')
const uuid = require('uuid')
const config = require('../config')
const documentsInfo = require('./documents-info')

module.exports = miss.through((chunck, encoding, callback) => {
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
      documentFilepath: documentPath
    }
    createPdfFromTemplate(options, (error, data) => {
      if (error) {
        item.errors.push(error.toString())
      } else {
        const doc = documentsInfo(document, documentPath)
        documents.push(doc)
        if (document.distribution) {
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
