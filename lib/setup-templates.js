'use strict'

var miss = require('mississippi')

var setupTemplates = miss.through(function (chunk, encoding, callback) {
  var item = JSON.parse(chunk)
  var templateFilePath = 'templates/' + item.documentCategory + '.docx'
  var restrictedAddressTemplateFilePath = 'templates/hemmelig-adresse.docx'
  var now = new Date()
  var date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth()+1) + '.' + now.getFullYear()
  console.log('setup-templates')

  item.templateWarning = {
    data: {
      dato: date,
      navnElev: 'Vanja Valjord Christensen',
      navnAvsender: 'Geir Gåsodden',
      navnSkole: 'Livets harde skole',
      tlfSkole: '35 91 70 00',
      Arsak: 'Eleven forstyrrer undervisning eller skoleaktivitet\nEleven utviser provoserende atferd mot ansatte eller medelever\nEleven har benyttet rusmidler i skoletida',
      fag: ''
    },
    template: templateFilePath
  }

  item.templateRestrictedAddress = {
    data: {
      navnElev: '',
      klasseElev: '',
      navnAvsender: ''

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
