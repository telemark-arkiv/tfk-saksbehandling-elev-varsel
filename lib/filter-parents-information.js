'use strict'

const miss = require('mississippi')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  if (item.dsfError) {
    console.log(item._id + ': filter-parents-information - skipped due to dsfError')
    return callback(null, JSON.stringify(item))
  }

  if (item.dsfParents) {
    const isParent = parent => parseInt(parent['STAT-KD'], 10) === 1
    item.dsfParents = item.dsfParents.filter(isParent)
    console.log(item._id + ': filter-parents-information')
  } else {
    console.log(item._id + ': filter-parents-information - skipped due to no dsfParents')
  }

  return callback(null, JSON.stringify(item))
})
