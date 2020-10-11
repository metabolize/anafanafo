'use strict'

const fs = require('fs')
const path = require('path')
const {
  computeWidthsOfRanges,
  computeKerning,
  selectedRanges,
  shortListOfRanges,
} = require('../../char-width-table-builder')

const COMPUTE_KERNING = false

const DATA_DIR = path.join(__dirname, '..', 'data')

const fonts = {
  '10px-normal': '10px Verdana',
  '10px-bold': 'bold 10px Verdana',
  '11px-normal': '11px Verdana',
  '11px-bold': 'bold 11px Verdana',
}

async function main() {
  for (const [name, font] of Object.entries(fonts)) {
    console.log(`Measuring ${name}`)
    const widths = await computeWidthsOfRanges(selectedRanges, {
      measurerOptions: { font },
    })
    fs.writeFileSync(
      `${path.join(DATA_DIR, name)}.json`,
      JSON.stringify(widths)
    )
  }

  if (COMPUTE_KERNING) {
    const kerning = await computeKerning(shortListOfRanges)
    fs.writeFileSync('kerning.json', JSON.stringify(kerning))
  }
}

;(async () => main())()
