import { autocorrelation } from '@lp-labs/autocorrelation';
if (autocorrelation([1, 2, 3], 2)[1] !== 8) throw new Error('Correlation');
// @ts-expect-error invalid argument must be rejected by declarations
autocorrelation([1], 0, 'other');
