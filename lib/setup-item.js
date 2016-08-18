'use strict'

const miss = require('mississippi')
const config = require('../config')
const getAge = require('get-age')
const dateFromPersonalId = require('birthdate-from-id')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  console.log(item._id + ': ' + item.studentName)
  console.log(item._id + ': setup-item')

  item.errors = []
  item.CALLBACK_STATUS_MESSAGE = config.CALLBACK_STATUS_MESSAGE
  item.sendToDistribution = false
  item.sendCopyToGuardian = getAge(dateFromPersonalId(item.studentId)) < 18
  item.documents = []
  item.documentTemplates = []

  return callback(null, JSON.stringify(item))
})
