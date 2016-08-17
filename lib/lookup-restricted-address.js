'use strict'

const miss = require('mississippi')
const isHemmelig = require('tfk-is-hemmelig-adresse')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  if (item.dsfError) {
    return callback(null, JSON.stringify(item))
  }

  var restrictedDsf = isHemmelig(item.dsfContact)
  var restricted360 = item.p360Contact ? isHemmelig(item.p360Contact) : false

  console.log(item._id + ': lookup-restricted-address')


  item.gotRestrictedAddress = restricted360 || restrictedDsf

  if (item.gotRestrictedAddress) {
    item.CALLBACK_STATUS_MESSAGE = 'Sendt til manuell distribusjon'
  } else {
    item.sendToDistribution = true
  }

  return callback(null, JSON.stringify(item))
})
