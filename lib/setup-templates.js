'use strict'

var miss = require('mississippi')
var getTemplatePath = require('tfk-saksbehandling-elev-varsel-templates')

var setupTemplates = miss.through(function (chunk, encoding, callback) {
  var item = JSON.parse(chunk)
  var document = {}
  var templateFilePath = getTemplatePath(item.documentCategory)
  var restrictedAddressTemplateFilePath = getTemplatePath('hemmelig-adresse')
  var parentsDifferentAddressTemplateFilePath = getTemplatePath('foresatte')
  var now = new Date()
  var date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  console.log(item._id + ': setup-templates')

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

  if (item.distribution.documentTemplates) {
    item.distribution.documentTemplates.push(document)
  } else {
    item.distribution.documentTemplates = [document]
  }

  item.distribution.restrictedAddressNotification = {
    data: {
      dato: date,
      navnElev: item.studentName,
      klasseElev: item.studentMainGroupName,
      navnAvsender: item.userName,
      navnSkole: item.schoolName

    },
    template: restrictedAddressTemplateFilePath
  }

  item.distribution.parentsDifferentAddressNotification = {
    data: {
      dato: date,
      navnElev: item.studentName,
      klasseElev: item.studentMainGroupName,
      navnAvsender: item.userName,
      navnSkole: item.schoolName

    },
    template: parentsDifferentAddressTemplateFilePath
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
