'use strict'

const fs = require('fs')
const miss = require('mississippi')

module.exports = miss.through((chunck, encoding, callback) => {
  const item = JSON.parse(chunck)
  const documents = item.documents || []

  if (item.errors.length > 0) {
    console.log(item._id + ': cleanup-documents')

    documents.forEach(function (doc) {
      fs.unlinkSync(doc.document)
    })
  }

  return callback(null, JSON.stringify(item))
})
