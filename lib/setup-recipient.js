'use strict'

var miss = require('mississippi')

var setupRecipient = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log('setup-recipient')

  item.distribution.copyToParents = true
  item.distribution.recipientPersonalIdNumber = item.studentId
  item.distribution.recipientName = item.studentName

  return callback(null, JSON.stringify(item))
})

module.exports = setupRecipient
