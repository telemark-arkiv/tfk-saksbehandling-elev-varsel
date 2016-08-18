'use strict'

const miss = require('mississippi')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  var contact = item.dsfContact
  var guardian = false

  if (item.dsfError) {
    console.log(item._id + ': lookup-guardian-information - skipped due to dsfError')
    return callback(null, JSON.stringify(item))
  }

  if (item.dsfParents) {
    item.dsfParents.forEach(parent => {
      if (contact.ADR === parent.ADR && contact.POSTN === parent.POSTN && contact.POSTS === parent.POSTS) {
        guardian = parent
      }
    })

    item.dsfGuardian = guardian

    console.log(item._id + ': lookup-guardian-information')
  }

  return callback(null, JSON.stringify(item))
})
