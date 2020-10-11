'use strict'

const { expect } = require('chai')
const Measurer = require('./measurer')

describe('Measurer', function () {
  let measurer
  afterEach(async function () {
    if (measurer) {
      await measurer.destroy()
      measurer = undefined
    }
  })

  it('can measure 10px Roboto', async function () {
    this.timeout('15s')

    measurer = new Measurer({
      font: '10px Roboto',
      stylesheets:
        '<link href="https://fonts.googleapis.com/css2?family=Roboto&display=block" rel="stylesheet">',
    })
    await measurer.init()
    const width = await measurer.widthOf(
      'Almost before we knew it, we had left the ground.'
    )
    // TODO: https://github.com/metabolize/anafanafo/issues/170
    if (process.env.CI) {
      expect(width).to.be.within(215 - 0.1, 215 + 0.1)
    } else {
      expect(width).to.be.within(218.5 - 0.1, 218.5 + 0.1)
    }
  })
})
