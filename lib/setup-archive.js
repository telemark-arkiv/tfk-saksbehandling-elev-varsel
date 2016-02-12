'use strict'

var miss = require('mississippi')
var config = require('../config')

var setupArchive = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var now = new Date()
  var archive = {}

  console.log(item._id + ': setup-archive')

  archive._id = item._id
  archive.title = item.documentType + ' - ' + item.documentCategory + ' - ' + item.studentName + ' - ' + item.studentMainGroupName + ' - ' + item.schoolName + ' - ' + now.getFullYear() + ' - ' + item.period.replace(/\s+/g, '')
  archive.documentType = item.documentType
  archive.documentCategory = item.documentCategory
  archive.CALLBACK_STATUS_URL = config.CALLBACK_STATUS_URL + '/' + item._id
  archive.date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  archive.year = now.getFullYear()

  archive.student = {
    id: item.studentId,
    firstName: item.studentFirstName,
    middleName: item.studentMiddleName,
    lastName: item.studentLastName,
    email: item.studentMail,
    phone: item.studentPhone,
    fullName: item.studentName
  }

  archive.school = {
    name: item.schoolName,
    id: item.schoolId,
    orgId: item.schoolOrganizationNumber.replace(/\D+/, ''),
    mainGroup: item.studentMainGroupName
  }

  archive.documents = []

  item.archive = archive

  return callback(null, JSON.stringify(item))
})

function datePadding (date) {
  var padded = date.toString()
  if (padded.length === 1) {
    padded = '0' + date.toString()
  }
  return padded
}

module.exports = setupArchive
