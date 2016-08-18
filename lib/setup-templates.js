'use strict'

const miss = require('mississippi')
const getTemplatePath = require('tfk-saksbehandling-elev-varsel-templates')
const getSchoolInfo = require('tfk-saksbehandling-schools-info')
const getSkoleAar = require('get-skole-aar')
const datePadding = require('./date-padding')

module.exports = miss.through((chunk, encoding, callback) => {
  var item = JSON.parse(chunk)

  const now = new Date()
  const date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  const schoolInfo = getSchoolInfo(item.schoolOrganizationNumber.replace(/\D/g, ''))

  console.log(item._id + ': setup-templates - warning')

  const warningDocument = {
    title: '',
    offTitle: '',
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
      title: 'Varsel må sendes til ' + item.studentName,
      offTitle: 'Varsel må sendes til elev',
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
      title: 'Varsel tilhørende ' + item.studentName + ' må distribueres',
      offTitle: 'Varsel må distribueres',
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
