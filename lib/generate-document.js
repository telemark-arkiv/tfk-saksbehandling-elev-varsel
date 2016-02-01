'use strict'

var miss = require('mississippi')
var createPdfFromTemplate = require('tfk-template-to-pdf')

var generateDocument = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var options = {
    templateData: item.templateWarning.data,
    templateFilepath: item.templateWarning.template,
    documentFilepath: 'test/data/document.pdf',
    templaterServiceUrl: 'https://templater.service.t-fk.no',
    pdfServiceUrl: 'https://pdfconvert.service.t-fk.no'
  }

  console.log('generate-document')

  createPdfFromTemplate(options, function (error, data) {
    if (error) {
      console.error(error)
      return callback(error)
    } else {
      return callback(null, JSON.stringify(item))
    }
  })
})

module.exports = generateDocument
