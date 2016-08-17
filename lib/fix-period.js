'use strict'

module.exports = period => {
  if (!period) {
    throw new Error('Missing required input: period')
  }

  var matched = period.match(/\.\s\w/g) || ['']
  var fixed = matched[0].replace(' ', '')
  return period.replace(matched, fixed)
}
