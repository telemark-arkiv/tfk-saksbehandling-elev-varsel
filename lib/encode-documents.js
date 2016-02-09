'use strict'

var fs = require('fs')
var miss = require('mississippi')

var encodeDocuments = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var documentsForDistribution = item.distribution.documents || []
  var documentsForArchive = item.archive.documents || []

  console.log(item._id + ': encode-documents')

  documentsForDistribution.forEach(function (documentPath) {
    var document = fs.readFileSync(documentPath)
    documentsForArchive.push({
      data: document.toString('base64'),
      type: 'warning'
    })
  })

  return callback(null, JSON.stringify(item))
})

module.exports = encodeDocuments
