'use strict'

var miss = require('mississippi')
var createPdfFromTemplate = require('tfk-template-to-pdf')
var uuid = require('uuid')
var config = require('../config')

var generateDocument = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var documents = item.distribution.documents || []
  var options = {
    templateData: '',
    templateFilepath: '',
    documentFilepath: '',
    templaterServiceUrl: 'https://templater.service.t-fk.no',
    pdfServiceUrl: 'https://pdfconvert.service.t-fk.no'
  }
  var jobsToDo = documents.length
  var jobsDone = 0

  function areWeDoneYet () {
    jobsDone++
    if (jobsToDo === jobsDone) {
      return callback(null, JSON.stringify(item))
    }
  }

  console.log('generate-documents')

  if (documents) {
    documents.forEach(function (document) {
      options.templateData = document.data
      options.templateFilepath = document.template
      options.documentFilepath = config.DISTRIBUTION_DIRECTORY_PATH + '/' + uuid.v4() + '.pdf'

      createPdfFromTemplate(options, function (error, data) {
        if (error) {
          item.errors.push(error)
        } else {
          areWeDoneYet()
        }
      })
    })
  } else {
    return callback(null, JSON.stringify(item))
  }
})

module.exports = generateDocument
