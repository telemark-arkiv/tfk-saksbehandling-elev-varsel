'use strict'

const miss = require('mississippi')
const getAge = require('get-age')
const dateFromPersonalId = require('birthdate-from-id')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  console.log(item._id + ': setup-recipient')

  item.distribution.sendCopyToGuardian = getAge(dateFromPersonalId(item.studentId)) < 18
  item.distribution.recipientPersonalIdNumber = item.studentId
  item.distribution.recipientName = item.studentName
  item.distribution.svarUtTitle = 'Varsel fra videregående skole'

  return callback(null, JSON.stringify(item))
})
