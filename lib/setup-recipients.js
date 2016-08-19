'use strict'

const miss = require('mississippi')
const createRecipient = require('./create-recipient')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  if (item.sendToDistribution && !item.dsfError) {
    var recipients = item.distribution.recipients

    console.log(item._id + ': setup-recipient')

    recipients.push(createRecipient(item.dsfContact))

    if (item.sendCopyToGuardian && item.dsfGuardian) {
      console.log(item._id + ': setup-recipient - Adds guardian')
      recipients.push(createRecipient(item.dsfGuardian))
    }
  } else {
    console.log(item._id + ': setup-recipient - nothing to distribute')
  }

  return callback(null, JSON.stringify(item))
})
