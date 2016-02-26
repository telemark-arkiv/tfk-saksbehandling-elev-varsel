'use strict'

var miss = require('mississippi')
var capitalize = require('capitalize')
var getSkoleAar = require('get-skole-aar')
var fixPeriod = require('./fix-period')

function generateTitle (item) {
  var title = []
  var now = new Date()
  title.push(capitalize(item.documentType))
  title.push(item.documentCategory)
  title.push(item.studentName)
  title.push(item.studentMainGroupName)
  title.push(item.schoolName)
  if (item.documentCategory === 'fag') {
    item.coursesList.split('\n').forEach(function (course) {
      title.push(course)
    })
  }
  title.push(now.getFullYear())
  title.push(fixPeriod(item.period))
  title.push(getSkoleAar())

  return title.join(' - ')
}

var setupArchive = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var now = new Date()
  var archive = {}

  console.log(item._id + ': setup-archive')

  archive._id = item._id
  archive.title = generateTitle(item)
  archive.documentTitle = capitalize(item.documentType) + ' - ' + item.documentCategory
  archive.documentType = item.documentType
  archive.documentCategory = item.documentCategory
  archive.CALLBACK_STATUS_URL = item.CALLBACK_STATUS_URL
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

  item.restrictedAddressArchive = JSON.parse(JSON.stringify(archive))

  item.noGuardianFoundArchive = JSON.parse(JSON.stringify(archive))

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
