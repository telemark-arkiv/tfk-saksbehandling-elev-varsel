'use strict'

const miss = require('mississippi')
const getTemplatePath = require('tfk-saksbehandling-elev-varsel-templates')
const getSchoolInfo = require('tfk-saksbehandling-schools-info')
const getSkoleAar = require('get-skole-aar')

module.exports = miss.through((chunk, encoding, callback) => {
  var item = JSON.parse(chunk)
  var document = {}
  var templateFilePath = getTemplatePath(item.documentCategory)
  var restrictedAddressTemplateFilePath = getTemplatePath('hemmelig-adresse')
  var noGuardianFoundTemplateFilePath = getTemplatePath('foresatte')
  var now = new Date()
  var date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  var schoolInfo = getSchoolInfo(item.schoolOrganizationNumber.replace(/\D/g, ''))

  console.log(item._id + ': setup-templates')

  document.data = {
    dato: date,
    navnElev: item.studentName,
    navnAvsender: item.userName,
    navnSkole: item.schoolName,
    tlfSkole: schoolInfo.phoneNumber,
    Arsak: item.behaviourCategories || item.orderCategories || item.gradesCategories || '',
    fag: item.coursesList || '',
    varselPeriode: item.period.toLowerCase(),
    skoleAar: getSkoleAar()
  }

  document.template = templateFilePath

  if (item.distribution.documentTemplates) {
    item.distribution.documentTemplates.push(document)
  } else {
    item.distribution.documentTemplates = [document]
  }

  item.restrictedAddressNotification = {
    data: {
      dato: date,
      navnElev: item.studentName,
      klasseElev: item.studentMainGroupName,
      navnAvsender: item.userName,
      navnSkole: item.schoolName,
      tlfSkole: schoolInfo.phoneNumber
    },
    template: restrictedAddressTemplateFilePath
  }

  item.noGuardianFoundNotification = {
    data: {
      dato: date,
      navnElev: item.studentName,
      klasseElev: item.studentMainGroupName,
      navnAvsender: item.userName,
      navnSkole: item.schoolName,
      tlfSkole: schoolInfo.phoneNumber
    },
    template: noGuardianFoundTemplateFilePath
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
