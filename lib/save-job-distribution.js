'use strict'

var fs = require('fs')
var miss = require('mississippi')
var config = require('../config')

var saveJobDistribution = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var fileName = config.DISTRIBUTION_DIRECTORY_PATH + '/' + item._id + '.json'

  if (item.errors.length === 0) {
    console.log(item._id + ': save-job-distribution')
    item.distribution.archive = JSON.parse(JSON.stringify(item.archive))
    item.distribution.noGuardianFoundNotification.document = JSON.parse(JSON.stringify(item.noGuardianFoundNotification.document))
    item.distribution.noGuardianFoundNotification.type = 'note-dsf'
    item.distribution.noGuardianFoundNotification.title = 'Varsel tilhørende ' + item.studentName + ' må distribueres'
    item.distribution.restrictedAddressNotification.document = JSON.parse(JSON.stringify(item.restrictedAddressNotification.document))
    item.distribution.restrictedAddressNotification.type = 'note-secret'
    item.distribution.restrictedAddressNotification.title = 'Varsel må sendes til ' + item.studentName
    fs.writeFileSync(fileName, JSON.stringify(item.distribution, null, 2))
  }

  return callback(null, JSON.stringify(item))
})

module.exports = saveJobDistribution
