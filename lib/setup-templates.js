'use strict'

var miss = require('mississippi')

var setupTemplates = miss.through(function (chunk, encoding, callback) {
  var item = JSON.parse(chunk)
  var document = {}
  var templateFilePath = 'templates/' + item.documentCategory + '.docx'
  var restrictedAddressTemplateFilePath = 'templates/hemmelig-adresse.docx'
  var now = new Date()
  var date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  console.log('setup-templates')

  document.data = {
    dato: date,
    navnElev: item.studentName,
    navnAvsender: item.userName,
    navnSkole: item.schoolName,
    tlfSkole: item.schoolPhone,
    Arsak: item.behaviourCategories || item.orderCategories || item.gradesCategories || '',
    fag: item.coursesList || ''
  }

  document.template = templateFilePath

  if (item.distribution.documents) {
    item.distribution.documents.push(document)
  } else {
    item.distribution.documents = [document]
  }

  item.distribution.restrictedAddressNotification = {
    data: {
      navnElev: item.studentName,
      klasseElev: item.mainGroupName,
      navnAvsender: item.userName

    },
    template: restrictedAddressTemplateFilePath
  }

  return callback(null, JSON.stringify(item))
})

function datePadding (date) {
  var padded = date.toString()
  if (padded.length === 1) {
    padded = '0' + date.toString()
  }
  return padded
}

module.exports = setupTemplates
