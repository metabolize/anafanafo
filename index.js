'use strict'

const CharWidthTableConsumer = require('./consumer')

const { create: createConsumer, load: loadConsumer } = CharWidthTableConsumer

module.exports = {
  createConsumer,
  loadConsumer,
  CharWidthTableConsumer,
}
