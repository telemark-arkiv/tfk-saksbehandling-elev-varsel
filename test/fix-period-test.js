'use strict'

var tap = require('tap')
var fixPeriod = require('../lib/fix-period')
var periodToFix = 'Halvårsvurdering 1. termin'
var periodNotToFix = 'Standpunktkarakter'
var expectedPeriod = 'Halvårsvurdering 1.termin'

tap.equal(
  fixPeriod(periodToFix), expectedPeriod,
  'It returns expected period'
)

tap.equal(
  fixPeriod(periodNotToFix), periodNotToFix,
  'It returns expected period'
)

tap.throws(
  function () {
    fixPeriod()
  },
  {message: 'Missing required input: period'},
  'Throws if period not supplied'
)
