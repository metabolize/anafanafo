'use strict'

function format(value, { radix = 16 } = {}) {
  return value.toString(radix)
}

function formatRange(lower, upper, opts) {
  if (lower === upper) {
    return format(lower)
  } else {
    return `${format(lower)}-${format(upper)}`
  }
}

module.exports = {
  format,
  formatRange,
}
