'use strict'

const miss = require('mississippi')
const unwrapParents = require('tfk-dsf-unwrap-parents')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  if (item.dsfError) {
    console.log(item._id + ': unwrap-parents-information - skipped due to dsfError')
    return callback(null, JSON.stringify(item))
  }

  if (item.sendCopyToGuardian) {
    console.log(item._id + ': unwrap-parents-information')
    item.dsfParents = unwrapParents(item.dsfData)
  } else {
    console.log(item._id + ': unwrap-parents-information - skipped due to age')
  }

  return callback(null, JSON.stringify(item))
})
