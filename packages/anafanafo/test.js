'use strict'

const { expect } = require('chai')
const anafanafo = require('.')

describe('anafanafo', () => {
  it('Measures 11px Verdana', () => {
    const options = { size: '10px', weight: 'normal' }
    expect(anafanafo('m', options)).to.equal(9.73)
    expect(anafanafo('v1.2.511', options)).to.be.within(
      44.98 - 0.1,
      44.98 + 0.1
    )
  })

  it('Measures bold 10px Verdana', () => {
    const options = { size: '10px', weight: 'bold' }
    expect(anafanafo('m', options)).to.be.within(10.59 - 0.1, 10.59 + 0.1)
    expect(anafanafo('v1.2.511', options)).to.be.within(
      49.28 - 0.1,
      49.28 + 0.1
    )
  })

  it('Measures 11px Verdana', () => {
    const options = { size: '11px', weight: 'normal' }
    expect(anafanafo('m', options)).to.equal(10.7)
    expect(anafanafo('v1.2.511', options)).to.be.within(
      49.48 - 0.1,
      49.48 + 0.1
    )
  })

  it('Measures bold 11px Verdana', () => {
    const options = { size: '11px', weight: 'bold' }
    expect(anafanafo('m', options)).to.equal(11.64)
    expect(anafanafo('v1.2.511', options)).to.be.within(54.2 - 0.1, 54.2 + 0.1)
  })
})
