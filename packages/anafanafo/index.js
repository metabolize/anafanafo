'use strict'

const { createConsumer } = require('char-width-table-consumer')

const data = require('./data/widths.json')
const consumer = createConsumer(data)

module.exports = (text, options) => consumer.widthOf(text, options)
