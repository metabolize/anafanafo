'use strict'

const { expect } = require('chai')
const anafanafo = require('.')

it('Basic test', () => {
  expect(anafanafo('m')).to.equal(106.99)
  expect(anafanafo('v1.2.511')).to.be.within(494.77 - 0.1, 494.77 + 0.1)
})
