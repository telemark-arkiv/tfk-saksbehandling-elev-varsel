'use strict'

const miss = require('mississippi')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  var list = []

  if (item.dsfError) {
    return callback(null, JSON.stringify(item))
  }

  if (item.dsfParents) {
    item.dsfParents.forEach(function (parent) {
      if (parseInt(parent['STAT-KD'], 10) === 1) {
        list.push(parent)
      }
    })

    item.dsfParents = list

    console.log(item._id + ': filter-parents-information')
  }

  return callback(null, JSON.stringify(item))
})
