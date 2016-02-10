'use strict'

var miss = require('mississippi')

var setupRecipient = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log(item._id + ': setup-recipient')

  item.distribution.sendCopyToParents = true
  item.distribution.recipientPersonalIdNumber = item.studentId
  item.distribution.recipientName = item.studentName

  return callback(null, JSON.stringify(item))
})

module.exports = setupRecipient
