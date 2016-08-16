'use strict'

const miss = require('mississippi')
const unwrap360Contact = require('tfk-360-unwrap-contact')
const unwrapDsfContact = require('tfk-dsf-unwrap-contact')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  if (item.dsfError) {
    return callback(null, JSON.stringify(item))
  }

  item.p360Contact = unwrap360Contact(item.p360Data)
  item.dsfContact = unwrapDsfContact(item.dsfData)

  return callback(null, JSON.stringify(item))
})
