'use strict'

function datePadding (date) {
  var padded = date.toString()
  if (padded.length === 1) {
    padded = '0' + date.toString()
  }
  return padded
}

function birthdateFromPersonalId (id) {
  var now = new Date()
  var personalid = id.replace(/\D+/, '').toString()
  var personalYearEnd = parseInt(personalid.substr(4, 2), 10)
  var realYearEnd = parseInt(now.getFullYear().toString().substr(2, 2), 10)
  var realYearStart = parseInt(now.getFullYear().toString().substr(0, 2), 10)
  var birthYear

  if (personalYearEnd > realYearEnd) {
    realYearStart--
  }

  birthYear = realYearStart.toString() + datePadding(personalYearEnd.toString())

  return birthYear + '-' + personalid.substr(2, 2) + '-' + personalid.substr(0, 2)
}

module.exports = birthdateFromPersonalId
