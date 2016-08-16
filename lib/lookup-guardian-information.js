'use strict'

const miss = require('mississippi')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  var contact = item.dsfContact
  var guardian

  if (item.dsfError) {
    return callback(null, JSON.stringify(item))
  }

  if (item.dsfParents) {
    item.dsfParents.forEach(function (parent) {
      if (contact.ADR === parent.ADR && contact.POSTN === parent.POSTN && contact.POSTS === parent.POSTS) {
        guardian = parent
      }
    })

    item.dsfGuardian = guardian

    console.log(item._id + ': lookup-guardian-information')
  }

  return callback(null, JSON.stringify(item))
})
