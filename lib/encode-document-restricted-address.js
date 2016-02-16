'use strict'

var fs = require('fs')
var miss = require('mississippi')

var encodeDocumentRestrictedAddress = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var document = fs.readFileSync(item.restrictedAddressNotification.document)
  var documentTitle = 'Varsel må sendes til ' + item.studentName

  item.restrictedAddressArchive.documents.push(
    {
      title: documentTitle,
      data: document.toString('base64'),
      type: 'note-secret'
    }
  )

  return callback(null, JSON.stringify(item))
})

module.exports = encodeDocumentRestrictedAddress
