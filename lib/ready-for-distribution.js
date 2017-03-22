'use strict'

module.exports = item => {
  let distribution = false

  if (!item.gotRestrictedAddress && !item.dsfError && item.sendToDistribution) {
    distribution = true
  }

  if (item.dsfContact && item.dsfContact['STAT-KD'] && item.dsfContact['STAT-KD'].toString() !== '1') {
    distribution = false
  }

  if (item.dsfContact && item.dsfContact['SPES-KD'] && item.dsfContact['SPES-KD'].toString() !== '0') {
    distribution = false
  }

  return distribution
}
