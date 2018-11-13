'use strict'

const { toBeWithin } = require('@coderbyheart/jest-expect-tobewithin')
const anafanafo = require('.')
expect.extend({ toBeWithin })

it('Basic test', () => {
  expect(anafanafo('m')).toBe(106.99)
  expect(anafanafo('v1.2.511')).toBeWithin(494.77 - 0.1, 494.77 + 0.1)
})
