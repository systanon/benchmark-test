import { describe, it } from 'node:test';
import { strict as assert } from 'assert';

import { countDecimals, formatNumber, ordersTableRounder, roundToFixed } from './numbers-old.js';

function each(table, fn) {
  for (const row of table) {
    fn(row);
  }
}


describe('Numbers old', () =>  {
  it('countDecimals basic', () => {
    const table = [
      { input: 1, expected: 0 },
      { input: 1.1, expected: 1 },
      { input: 1.11, expected: 2 },
      { input: 1.111, expected: 3 },
      { input: 1.1111, expected: 4 },
      { input: 1.11111, expected: 5 },
      { input: 999999, expected: 0 },
      { input: 999999.1, expected: 1 },
      { input: 999999.01, expected: 2 },
      { input: 0.0000000001, expected: 10 },
      { input: 1e3, expected: 0 },
      { input: 1e-3, expected: 3 },
      { input: 1e-10, expected: 10 },
      { input: 1.21e3, expected: 0 },
    ];
    each(table, ({ input, expected }) => {
      assert.strictEqual(countDecimals(input), expected);
      assert.strictEqual(countDecimals(-input), expected);
    });
  });
  
  it('roundToFixed with tick', () => {
    const table = [
      { value: 0.13, tick: 0.05, expected: '0.15' },
      { value: 0.366666666667, tick: 0.0001, expected: '0.3667' },
    ];
    each(table, ({ value, tick, expected }) => {
      const result = roundToFixed(value, { tick });
      assert.strictEqual(result, expected);
    });
  });
  
  it('roundToFixed with precision and rounding', () => {
    const table = [
      { value: 0.11, precision: 1, round: 'ceil', expected: '0.2' },
      { value: 0.11, precision: 1, round: 'floor', expected: '0.1' },
    ];
    each(table, ({ value, precision, round, expected }) => {
      const result = roundToFixed(value, { precision, round });
      assert.strictEqual(result, expected);
    });
  });
  
  it('roundToFixed with format', () => {
    const result = roundToFixed(1000, { format: true });
    assert.strictEqual(result, '1 000.00');
  });
  
  it('formatNumber', () => {
    const table = [
      { value: 0, expected: '0' },
      { value: 1000, expected: '1 000' },
      { value: 123456789, expected: '123 456 789' },
      { value: '123456789.123456789', expected: '123 456 789.123456789' },
    ];
    each(table, ({ value, expected }) => {
      const result = formatNumber(value);
      assert.strictEqual(result, expected);
    });
  });
  
  it('ordersTableRounder', () => {
    const table = [
      { value: null, tick: 1e-4, expected: '-' },
      { value: 0, tick: 1e-4, expected: '-' },
      { value: 0.001, tick: 1e-4, expected: '0.001' },
      { value: 1e-12, tick: 1e-4, expected: '0' },
    ];
    each(table, ({ value, tick, expected }) => {
      const result = ordersTableRounder(value, tick);
      assert.strictEqual(result, expected);
    });
  });
})
