'use strict'

module.exports = item => {
  let distribution = false

  if (!item.gotRestrictedAddress && !item.dsfError && item.sendToDistribution) {
    distribution = true
  }

  if (item.dsfContact['STAT-KD'].toString() !== '1') {
    distribution = false
  }

  return distribution
}
