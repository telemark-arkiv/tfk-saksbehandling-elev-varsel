'use strict'

var templates = {
  'atferd': 'atferd.docx',
  'foresatte': 'foresatte.docx',
  'hemmelig-adresse': 'hemmelig-adresse.docx',
  'karakter': 'karakter.docx',
  'orden': 'orden.docx'
}

function getTemplatePath (id) {
  var doc = templates[id]
  if (!doc) {
    throw new Error('Template not found')
  } else {
    return __dirname.replace('/lib', '') + '/templates/' + doc
  }
}

module.exports = getTemplatePath
