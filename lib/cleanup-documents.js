'use strict'

const fs = require('fs')
const miss = require('mississippi')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  var documentsForDistribution = item.distribution.documents || []

  if (item.errors.length > 0) {
    console.log(item._id + ': cleanup-documents')

    documentsForDistribution.forEach(function (documentPath) {
      fs.unlinkSync(documentPath)
    })
  }

  return callback(null, JSON.stringify(item))
})
