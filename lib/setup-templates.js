'use strict'

const miss = require('mississippi')
const getTemplatePath = require('tfk-saksbehandling-elev-varsel-templates')
const getSchoolInfo = require('tfk-saksbehandling-schools-info')
const getSkoleAar = require('get-skole-aar')

module.exports = miss.through((chunk, encoding, callback) => {
  var item = JSON.parse(chunk)

  const now = new Date()
  const date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  const schoolInfo = getSchoolInfo(item.schoolOrganizationNumber.replace(/\D/g, ''))

  console.log(item._id + ': setup-templates - warning')

  const warningDocument = {
    data: {
      dato: date,
      navnElev: item.studentName,
      navnAvsender: item.userName,
      navnSkole: item.schoolName,
      tlfSkole: schoolInfo.phoneNumber,
      Arsak: item.behaviourCategories || item.orderCategories || item.gradesCategories || '',
      fag: item.coursesList || '',
      varselPeriode: item.period.toLowerCase(),
      skoleAar: getSkoleAar()
    },
    template: getTemplatePath(item.documentCategory),
    type: 'warning',
    distribution: true
  }

  if (item.documentTemplates) {
    item.documentTemplates.push(warningDocument)
  } else {
    item.documentTemplates = [warningDocument]
  }

  if ((item.sendToDistribution && item.gotRestrictedAddress) || item.dsfError) {
    console.log(item._id + ': setup-templates - restricted address')
    const restrictedDocument = {
      archiveTitle: 'Varsel må sendes til ' + item.studentName,
      archiveOffTitle: 'Varsel må sendes til elev',
      data: {
        dato: date,
        navnElev: item.studentName,
        klasseElev: item.studentMainGroupName,
        navnAvsender: item.userName,
        navnSkole: item.schoolName,
        tlfSkole: schoolInfo.phoneNumber
      },
      template: getTemplatePath('hemmelig-adresse'),
      type: 'note-secret',
      distribution: false
    }
    item.documents.push(restrictedDocument)
  }

  if (item.sendCopyToGuardian && !item.dsfGuardian) {
    console.log(item._id + ': setup-templates - missing guardian')
    const guardianDocument = {
      archiveTitle: 'Varsel tilhørende ' + item.studentName + ' må distribueres',
      archiveOffTitle: 'Varsel må distribueres',
      data: {
        dato: date,
        navnElev: item.studentName,
        klasseElev: item.studentMainGroupName,
        navnAvsender: item.userName,
        navnSkole: item.schoolName,
        tlfSkole: schoolInfo.phoneNumber
      },
      template: getTemplatePath('foresatte'),
      type: 'note-dsf',
      distribution: false
    }
    item.documents.push(guardianDocument)
  }
  return callback(null, JSON.stringify(item))
})

const datePadding = date => {
  var padded = date.toString()
  if (padded.length === 1) {
    padded = '0' + date.toString()
  }
  return padded
}
