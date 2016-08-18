'use strict'

const miss = require('mississippi')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  console.log(item._id + ': setup-recipient')

  item.distribution.recipientPersonalIdNumber = item.studentId
  item.distribution.recipientName = item.studentName

  return callback(null, JSON.stringify(item))
})
