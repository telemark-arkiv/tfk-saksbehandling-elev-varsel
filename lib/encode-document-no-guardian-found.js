'use strict'

var fs = require('fs')
var miss = require('mississippi')

var encodeDocumentNoGuardianFound = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var document = fs.readFileSync(item.noGuardianFoundNotification.document)
  var documentTitle = 'Varsel tilhørende ' + item.studentName + ' må distribueres'

  item.noGuardianFoundArchive.documents.push(
    {
      title: documentTitle,
      data: document.toString('base64'),
      type: 'note-dsf'
    }
  )

  return callback(null, JSON.stringify(item))
})

module.exports = encodeDocumentNoGuardianFound
