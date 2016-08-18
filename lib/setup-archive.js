'use strict'

const miss = require('mississippi')
const capitalize = require('capitalize')
const getSkoleAar = require('get-skole-aar')
const datePadding = require('./date-padding')
const fixPeriod = require('./fix-period')

function generateTitle (item) {
  var title = []
  title.push(capitalize(item.documentType))
  title.push(item.documentCategory)
  title.push(item.studentName)
  title.push(item.studentMainGroupName)
  title.push(item.schoolName)
  title.push(fixPeriod(item.period))
  title.push(getSkoleAar())

  return title.join(' - ')
}

module.exports = miss.through((chunck, encoding, callback) => {
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
  archive.documentCreated = item.timeStamp

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
