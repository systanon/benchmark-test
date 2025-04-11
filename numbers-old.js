import { bignumber, chain, format as mathFormat } from 'mathjs'


export const PRECISION = Object.freeze({
  DEFAULT_TICK: 0.5,
  SYMBOLS_0: 0,
  SYMBOLS_1: 1,
  SYMBOLS_2: 2,
  SYMBOLS_3: 3,
  SYMBOLS_4: 4,
  SYMBOLS_5: 6,
  SYMBOLS_7: 7,
  SYMBOLS_8: 8,
  SYMBOLS_9: 9
})

const DIGIT_GRADE_REGEX = /(\d+)(\d{3})/

export const inRange = (value, { range, start = 0, end = Infinity } = {}) => {
  if (range.length) {
    const [first, last] = range
    start = first
    end = last
  }

  return value >= start && value <= end
}

export const countDecimals = value => {
  if (!value || Number.isInteger(value)) return 0

  const stringValue = mathFormat(value, { notation: 'fixed' })
  const dotIndex = stringValue.indexOf('.')

  return stringValue.length - dotIndex - 1
}

export const formatNumber = value => {
  if (!value) return '0'

  const integerWithFraction = value.toString().split('.')
  const fraction = integerWithFraction[1] ? `.${integerWithFraction[1]}` : ''
  let integer = integerWithFraction[0]
  while (DIGIT_GRADE_REGEX.test(integer)) {
    integer = integer.replace(DIGIT_GRADE_REGEX, '$1 $2')
  }
  return integer + fraction
}

const getPrecision = (precision, tick) => {
  if (tick) return countDecimals(tick)
  if (typeof precision === 'number') return precision
  if (!precision) return PRECISION.SYMBOLS_2

  const precisionKey = precision.toLowerCase()
  // return config.decimalPlaces[precisionKey] ?? config.precision[precisionKey] ?? PRECISION.SYMBOLS_2
  return PRECISION.SYMBOLS_2
}

export const trimLastZeroes = value => {
  if (value.indexOf('.') === -1) return value
  return value.replace(/\.?0+$/, '')
}

export const roundToFixed = (
  value,
  { tick, precision, format = false, round = 'round', zeroEnding = true, suffix = null } = {}
) => {
  if (!value && value !== 0) return
  if (typeof value !== 'number') value = Number(value)
  if (isNaN(value)) return
  const localPrecision = getPrecision(precision, tick)
  const precisionFactor = Math.pow(10, localPrecision)
  const localTick = tick ?? 1 / precisionFactor

  const bigNumValue = bignumber(value)
  const bigNumTick = bignumber(localTick)

  const roundedValue = chain(bigNumValue)
    .divide(bigNumTick)
    // eslint-disable-next-line no-unexpected-multiline
    [round]()
    .multiply(precisionFactor)
    .multiply(bigNumTick)
    .divide(precisionFactor)
    .done()

  let stringValue = mathFormat(roundedValue, { notation: 'fixed', precision: localPrecision })
  if (format) stringValue = formatNumber(stringValue)
  if (!zeroEnding) stringValue = trimLastZeroes(stringValue)

  return suffix ? `${stringValue}${suffix}` : stringValue
}

export const ordersTableRounder = (value, tick, options = {}) => {
  return value && value !== 0 ? roundToFixed(value, { tick, format: false, zeroEnding: false, ...options }) : '-'
}
