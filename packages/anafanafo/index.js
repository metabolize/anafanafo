'use strict'

const { createConsumer } = require('char-width-table-consumer')

const SIZES = ['10px', '11px']
const WEIGHTS = ['normal', 'bold']

const consumers = {
  '10px-normal': createConsumer(require('./data/10px-normal.json')),
  '10px-bold': createConsumer(require('./data/10px-bold.json')),
  '11px-normal': createConsumer(require('./data/11px-normal.json')),
  '11px-bold': createConsumer(require('./data/11px-bold.json')),
}

module.exports = function measure(text, { size, weight, ...rest }) {
  if (!SIZES.includes(size)) {
    throw Error(`Unknown size "${size}", expected ${SIZES.join(', ')}`)
  }
  if (!WEIGHTS.includes(weight)) {
    throw Error(`Unknown weight "${weight}", expected ${WEIGHTS.join(', ')}`)
  }
  return consumers[`${size}-${weight}`].widthOf(text, { ...rest })
}
