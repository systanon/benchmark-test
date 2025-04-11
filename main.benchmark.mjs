import Benchmark from 'benchmark'

import { formatToString, formatFixed, formatByPrecision, formatByStep } from './main.mjs'

import { roundToFixed }  from './numbers-old.js'

const suite = new Benchmark.Suite;

suite
  .add('formatToString', function () {
    formatToString(1234.5678)
  })
  .add('roundToFixed', function () {
    roundToFixed(1234.5678 , {tick: 0.0001})
  })
  .add('formatByPrecision', function () {
    formatByPrecision(1234.5678, {precision: 8})
  })
  .add('formatByStep', function () {
    formatByStep(12345678, {step: 0.00000001})
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ 'async': true })
