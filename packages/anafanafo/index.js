'use strict'

const path = require('path')
const { loadConsumerSync } = require('char-width-table-consumer')

const dataPath = path.join(__dirname, 'data', 'widths.json')
const consumer = loadConsumerSync(dataPath)

module.exports = (text, options) => consumer.widthOf(text, options)
