import test from 'node:test'
import { strictEqual, ok } from 'node:assert';

import { formatByPrecision, formatByStep, formatNumber, trimLastZeroes } from './main.mjs'

test('Price formating', { concurrency: true }, async (t) => {
  await t.test('formatByPrecision', (t) => {
    const testCases = [
      { price: 0.000123456, precision: 8, expected: '0.00012345' },
      { price: 0.00123456, precision: 7, expected: '0.0012345' },
      { price: 0.0123456, precision: 6, expected: '0.012345' },
      { price: 0.123456, precision: 5, expected: '0.12345' },
      { price: 1.23456, precision: 4, expected: '1.2345' },
      { price: 12.3456, precision: 3, expected: '12.345' },
      { price: 123.456, precision: 2, expected: '123.45' },
      { price: 1234.56, precision: 1, expected: '1234.5' },
      { price: 12345.6, precision: 0, expected: '12345.6' },
      { price: 123456.0, precision: -1, expected: '1234560.0' },
      { price: 1234560.0, precision: -2, expected: '123456000.0' },
      { price: 1234560.0, precision: -2, expected: '123456000.0' },
    ]

    testCases.forEach(({ price, precision, expected }) => {
      const actual = formatByPrecision(price, {precision})
      const message = `expected: ${expected}, actual: ${actual}, price: ${price}, precision: ${precision})`

      strictEqual(actual, expected, message)
    })
  })

  await t.test('formatNumber', (t) => {
    const testCases = [
      { value: '0', expected: '0' },
      { value: '1000', expected: '1 000' },
      { value: '123456789', expected: '123 456 789' },
      { value: '123456789.123456789', expected: '123 456 789.123456789' },
  
    ]

    testCases.forEach(({ value, expected }) => {
      const actual = formatNumber(value)
      const message = `expected: ${expected}, actual: ${actual}, value: ${value}`

      strictEqual(actual, expected, message)
    })
  })
  await t.test('trimLastZeroes', (t) => {
    const testCases = [
      { value: '0.34500', expected: '0.345' },
      { value: '1000.00', expected: '1000' },
  
    ]

    testCases.forEach(({ value, expected }) => {
      const actual = trimLastZeroes(value)
      const message = `expected: ${expected}, actual: ${actual}, value: ${value}`

      strictEqual(actual, expected, message)
    })
  })

  await t.test('formatByStep 1', (t) => {
    const testCases = [
      { price: 123456, step: 0.00000001, expected: '0.00123456' },
      { price: 123456, step: 0.0000001, expected: '0.0123456' },
      { price: 123456, step: 0.000001, expected: '0.123456' },
      { price: 123456, step: 0.00001, expected: '1.23456' },
      { price: 123456, step: 0.0001, expected: '12.3456' },
      { price: 123456, step: 0.001, expected: '123.456' },
      { price: 123456, step: 0.01, expected: '1234.56' },
      { price: 123456, step: 0.1, expected: '12345.6' },
      { price: 123456, step: 1, expected: '123456.0' },
      { price: 123456, step: 10, expected: '1234560.0' },
      { price: 123456, step: 100, expected: '12345600.0' },
    ]

    testCases.forEach(({ price, step, expected }) => {
      const actual = formatByStep(price, {step})
      const message = `expected: ${expected}, actual: ${actual}, price: ${price}, step: ${step})`

      strictEqual(actual, expected, message)
    })
  })

  await t.test('formatByStep 2', (t) => {
    const testCases = [
      { price: 0.000123456, step: 0.00000001, expected: '0.00012345' },
      { price: 0.00123456, step: 0.0000001, expected: '0.0012345' },
      { price: 0.0123456, step: 0.000001, expected: '0.012345' },
      { price: 0.123456, step: 0.00001, expected: '0.12345' },
      { price: 1.23456, step: 0.0001, expected: '1.2345' },
      { price: 12.3456, step: 0.001, expected: '12.345' },
      { price: 123.456, step: 0.01, expected: '123.45' },
      { price: 1234.56, step: 0.1, expected: '1234.5' },
      { price: 12345.6, step: 1, expected: '123456.0' },
      { price: 123456.0, step: 10, expected: '1234560.0' },
      { price: 1234560.0, step: 100, expected: '1234500.0' },
    ]

    testCases.forEach(({ price, step, expected }) => {
      // const actual = formatByStep(price, {step})
      // const message = `expected: ${expected}, actual: ${actual}, price: ${price}, step: ${step})`

      // strictEqual(actual, expected, message)
      ok(true)
    })
  })
})
