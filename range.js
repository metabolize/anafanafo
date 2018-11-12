'use strict'

function eachCharOfRanges(ranges) {
  return ranges.reduce((accum, [first, second]) => {
    for (let charCode = first; charCode <= second; ++charCode) {
      accum.push(charCode)
    }
    return accum
  }, [])
}

module.exports = {
  eachCharOfRanges,
}
