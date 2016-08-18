'use strict'

const miss = require('mississippi')
const isHemmelig = require('tfk-is-hemmelig-adresse')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)

  if (item.dsfError) {
    console.log(item._id + ': lookup-restricted-address - skipped due to dsfError')
    return callback(null, JSON.stringify(item))
  }

  const restrictedDsf = isHemmelig(item.dsfContact)
  const restricted360 = item.p360Contact ? isHemmelig(item.p360Contact) : false

  console.log(item._id + ': lookup-restricted-address')

  item.gotRestrictedAddress = restricted360 || restrictedDsf

  if (item.gotRestrictedAddress) {
    item.CALLBACK_STATUS_MESSAGE = 'Sendt til manuell distribusjon'
  } else {
    item.sendToDistribution = true
  }

  return callback(null, JSON.stringify(item))
})
