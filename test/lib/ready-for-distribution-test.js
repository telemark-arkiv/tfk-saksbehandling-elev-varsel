'use strict'

const tap = require('tap')
const readyForDistribution = require('../../lib/ready-for-distribution')
const readyData = require('./../data/ready-for-distribution.json')
const notReadyData = require('./../data/ready-for-distribution-not.json')

readyData.forEach(item => {
  tap.equal(readyForDistribution(item), true, 'Returns true if ready')
})

notReadyData.forEach(item => {
  tap.equal(readyForDistribution(item), false, 'Returns false if not ready')
})
