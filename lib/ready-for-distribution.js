'use strict'

module.exports = item => {
  var distribution = false

  if (!item.gotRestrictedAddress && !item.dsfError && item.sendToDistribution) {
    distribution = true
  }

  return distribution
}
