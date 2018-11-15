'use strict'

const path = require('path')
const fs = require('fs')
const { toBeWithin } = require('@coderbyheart/jest-expect-tobewithin')
const { PDFKitTextMeasurer } = require('gh-badges/lib/text-measurer')
const { createConsumer } = require('.')
const { verdanaWidths } = require('./test-fixtures')
expect.extend({ toBeWithin })

const consumer = createConsumer(verdanaWidths)

it('Basic test', () => {
  expect(consumer.widthOf('m')).toBe(106.99)
})

const fontPath = path.join(__dirname, 'Verdana.ttf')
const haveFont = fs.existsSync(fontPath)
const maybeDescribe = haveFont ? describe : describe.skip

maybeDescribe('Parity with PDFKitTextMeasurer', () => {
  let measurer
  beforeAll(() => {
    if (haveFont) {
      measurer = new PDFKitTextMeasurer(fontPath)
    }
  })

  describe('ASCII strings, with a fairly small tolerance', () => {
    const EPSILON_PIXELS = 0.75

    test.each([
      'This is the dawning of the Age of Aquariums',
      'v1.2.511',
      '5 passed, 2 failed, 1 skipped',
      '[prismic "1.1"]',
    ])('%s', str => {
      // PDFKitTextMeasurer uses 12 pt Verdana; the test data is for 120 pt.
      const expected = 10.0 * measurer.widthOf(str)
      const actual = consumer.widthOf(str)
      expect(actual).toBeWithin(
        expected - EPSILON_PIXELS,
        expected + EPSILON_PIXELS
      )
    })
  })

  describe('Non-ASCII strings, with a very large tolerance', () => {
    const EPSILON_PIXELS = 50.0

    test.each(['爱', '★★★½☆', '\u2026'])('%s', str => {
      const expected = 10.0 * measurer.widthOf(str)
      const actual = consumer.widthOf(str)
      expect(actual).toBeWithin(
        expected - EPSILON_PIXELS,
        expected + EPSILON_PIXELS
      )
    })
  })
})
