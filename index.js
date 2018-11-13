'use strict'

const fs = require('fs')
const { selectedRanges, shortListOfRanges } = require('./code-point-ranges')
const Measurer = require('./measurer')
const { format, formatRange } = require('./format')
const { compact } = require('./compact')
const { eachCharOfRanges } = require('./range')

async function computeWidthsOfRanges(ranges, { verbose = true } = {}) {
  const measurer = new Measurer()
  await measurer.init()

  let collected = []

  for (const [lower, upper] of ranges) {
    if (verbose) {
      console.log(`Computing widths for ${formatRange(lower, upper)}`)
    }
    const widths = await measurer.widthOfRange([lower, upper])
    const compacted = compact(widths, lower)
    collected = collected.concat(compacted)
  }

  measurer.destroy()

  return collected
}

async function computeKerning(ranges, { verbose = true } = {}) {
  const measurer = new Measurer()
  await measurer.init()

  const eachChar = eachCharOfRanges(ranges)
  const collected = []

  for (const second of eachChar) {
    console.log(format(second))
    for (const first of eachChar) {
      const kerningAdjustment = await measurer.kerningAdjustmentFor(
        first,
        second
      )

      if (kerningAdjustment) {
        collected.push([first, second, kerningAdjustment])
        if (verbose) {
          console.log(`${format(first)} ${format(second)} ${kerningAdjustment}`)
        }
      }
    }
  }

  measurer.destroy()

  return collected
}

async function main() {
  const widths = await computeWidthsOfRanges(selectedRanges)
  // const widths = await computeWidthsOfRanges(shortListOfRanges)

  fs.writeFileSync('widths.json', JSON.stringify(widths))

  const kerning = await computeKerning(shortListOfRanges)

  fs.writeFileSync('kerning.json', JSON.stringify(kerning))
}

;(async () => main())()
