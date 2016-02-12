'use strict'

var miss = require('mississippi')
var getAge = require('get-age')
var dateFromPersonalId = require('./birthdate-from-personal-id')

var setupRecipient = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log(item._id + ': setup-recipient')

  item.distribution.sendCopyToParents = getAge(dateFromPersonalId(item.studentId)) < 18
  item.distribution.recipientPersonalIdNumber = item.studentId
  item.distribution.recipientName = item.studentName
  item.distribution.svarUtTitle = 'Varsel fra videregående skole'

  return callback(null, JSON.stringify(item))
})

module.exports = setupRecipient
