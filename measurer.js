'use strict'

const puppeteer = require('puppeteer')

module.exports = class Measurer {
  constructor({ font = '110px Verdana' } = {}) {
    this.font = font
    this.browser = undefined
    this.page = undefined
  }

  async init() {
    this.browser = await puppeteer.launch()
    this.page = await this.browser.newPage()
    await this.page.evaluate(() => {
      window.canvas = document.createElement('canvas')
    })
  }

  async destroy() {
    return this.browser.close()
  }

  async widthOf(text) {
    const { font } = this
    return this.page.evaluate(
      ({ text, font }) => {
        const ctx = window.canvas.getContext('2d')
        ctx.font = font
        return ctx.measureText(text).width
      },
      { text, font }
    )
  }

  async widthOfRange([lower, upper], { precision = 2 } = {}) {
    const widths = []
    for (let charCode = lower; charCode < upper; ++charCode) {
      let width
      if (charCode < 32) {
        width = 0.0
      } else {
        const char = String.fromCharCode(charCode)
        width = await this.widthOf(char)
      }
      widths.push(parseFloat(width.toFixed(precision)))
    }
    return widths
  }

  async kerningAdjustmentFor(
    firstCharCode,
    secondCharCode,
    { precision = 4 } = {}
  ) {
    const first = String.fromCharCode(firstCharCode)
    const second = String.fromCharCode(secondCharCode)

    const pair = `${first}${second}`
    const asPair = await this.widthOf(pair)

    const individually =
      (await this.widthOf(first)) + (await this.widthOf(second))

    if (asPair === individually) {
      return undefined
    } else {
      return parseFloat((asPair - individually).toFixed(precision))
    }
  }
}
