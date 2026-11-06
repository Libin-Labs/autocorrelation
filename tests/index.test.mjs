import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('raw sums', () => {
  assert.deepEqual(api.autocorrelation([1, 2, 3], 2), [14, 8, 3]);
});
test('biased', () => {
  assert.deepEqual(api.autocorrelation([1, 2, 3], 2, 'biased'), [14 / 3, 8 / 3, 1]);
});
test('unbiased', () => {
  assert.deepEqual(api.autocorrelation([1, 2, 3], 2, 'unbiased'), [14 / 3, 4, 3]);
});
test('zero signal', () => {
  assert.deepEqual(api.autocorrelation([0, 0], 1), [0, 0]);
});
test('lag and mode validation', () => {
  assert.throws(() => api.autocorrelation([1, 2], 2));
  assert.throws(() => api.autocorrelation([1], 0, 'other'));
});
test('sample contract', () => {
  assert.throws(() => api.autocorrelation([], 0));
  assert.throws(() => api.autocorrelation([1, , 2], 1));
});
