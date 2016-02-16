'use strict'

var miss = require('mississippi')
var createPdfFromTemplate = require('tfk-template-to-pdf')
var uuid = require('uuid')
var config = require('../config')

var generateDocumentNoGuardianFound = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var documentPath = config.DISTRIBUTION_DIRECTORY_PATH + '/' + uuid.v4() + '.pdf'
  var options = {
    templateData: item.distribution.noGuardianFoundNotification.data,
    templateFilepath: item.distribution.noGuardianFoundNotification.template,
    documentFilepath: documentPath,
    templaterServiceUrl: 'https://templater.service.t-fk.no',
    pdfServiceUrl: 'https://pdfconvert.service.t-fk.no'
  }

  console.log(item._id + ': generate-document-parent-different-address')

  createPdfFromTemplate(options, function (error, data) {
    if (error) {
      item.errors.push(error.toString())
    } else {
      item.distribution.noGuardianFoundNotification.document = documentPath
    }
    return callback(null, JSON.stringify(item))
  })
})

module.exports = generateDocumentNoGuardianFound
