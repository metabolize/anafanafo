'use strict'

function compact(values, offset) {
  const compacted = []

  let intervalValue = values[0]
  let intervalStart = 0

  for (let i = 1; i < values.length; ++i) {
    const thisValue = values[i]
    if (thisValue === intervalValue) {
      continue
    } else {
      compacted.push([intervalStart + offset, i - 1 + offset, intervalValue])
      intervalStart = i
      intervalValue = thisValue
    }
  }

  compacted.push([
    intervalStart + offset,
    values.length - 1 + offset,
    intervalValue,
  ])

  return compacted
}

module.exports = { compact }
