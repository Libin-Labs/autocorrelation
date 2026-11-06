function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function sample(values: readonly number[], max = 2048): void {
  if (!Array.isArray(values) || !values.length || values.length > max)
    throw new RangeError('Nonempty bounded sample required');
  for (const v of values) finite(v, -1e6, 1e6);
}
export type CorrelationNormalization = 'none' | 'biased' | 'unbiased';
export function autocorrelation(
  values: readonly number[],
  maxLag: number,
  normalization: CorrelationNormalization = 'none',
): number[] {
  sample(values, 4096);
  integer(maxLag, 0, values.length - 1);
  if (!['none', 'biased', 'unbiased'].includes(normalization))
    throw new RangeError('Unknown normalization');
  const out: number[] = [];
  for (let lag = 0; lag <= maxLag; lag++) {
    let sum = 0;
    for (let i = 0; i < values.length - lag; i++) sum += values[i]! * values[i + lag]!;
    out.push(
      sum /
        (normalization === 'none'
          ? 1
          : normalization === 'biased'
            ? values.length
            : values.length - lag),
    );
  }
  return out;
}
