'use strict'

const miss = require('mississippi')
const createPdfFromTemplate = require('tfk-template-to-pdf')
const uuid = require('uuid')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  var documents = item.distribution.documents || []
  var templates = item.distribution.documentTemplates || []
  var options = {
    templateData: '',
    templateFilepath: '',
    documentFilepath: '',
    templaterServiceUrl: 'https://templater.service.t-fk.no',
    pdfServiceUrl: 'https://pdfconvert.service.t-fk.no'
  }
  var jobsToDo = templates.length
  var jobsDone = 0

  function areWeDoneYet () {
    jobsDone++
    if (jobsToDo === jobsDone) {
      return callback(null, JSON.stringify(item))
    }
  }

  console.log(item._id + ': generate-documents')

  if (templates) {
    templates.forEach(function (document) {
      var documentPath = config.DISTRIBUTION_DIRECTORY_PATH + '/' + uuid.v4() + '.pdf'
      options.templateData = document.data
      options.templateFilepath = document.template
      options.documentFilepath = documentPath

      createPdfFromTemplate(options, function (error, data) {
        if (error) {
          item.errors.push(error.toString())
        } else {
          documents.push({
            title: item.archive.documentTitle,
            type: 'warning',
            document: documentPath
          })
          areWeDoneYet()
        }
      })
    })
  } else {
    return callback(null, JSON.stringify(item))
  }
})
