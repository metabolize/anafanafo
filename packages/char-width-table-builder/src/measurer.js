'use strict'

const puppeteer = require('puppeteer')

// `stylesheets`: Style sheets to be loaded in the browser, e.g.
// `<link href="https://fonts.googleapis.com/css2?family=Roboto&display=block" rel="stylesheet">`
// This is useful for measuring web fonts and also for testing.
module.exports = class Measurer {
  constructor({ font = '110px Verdana', stylesheets } = {}) {
    this.font = font
    this.stylesheets = stylesheets
    this.browser = undefined
    this.page = undefined
  }

  static renderDocument({ font, stylesheets }) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        ${stylesheets}
      </head>
      <body>
        <p style="font: ${font};">This ensures the font is loaded.</p>
      </html>
    `
  }

  async init() {
    this.browser = await puppeteer.launch()
    this.page = await this.browser.newPage()
    if (this.stylesheets) {
      const { stylesheets, font } = this
      const document = Measurer.renderDocument({ stylesheets, font })
      await this.page.goto(`data:text/html,${document}`, {
        waitUntil: 'networkidle0',
      })
    }
    await this.page.evaluate(() => {
      window.canvas = document.createElement('canvas')
    })
  }

  async destroy() {
    await this.browser.close()
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
