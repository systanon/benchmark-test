const DIGIT_GRADE_REGEX = /(\d+)(\d{3})/;

export const formatToString = (n) => `${n}`;

export const formatNumber = (value) => {
  const [integer, fraction] = value.split('.')
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return fraction ? `${formattedInteger}.${fraction}` : formattedInteger
};


export const trimLastZeroes = (value) => value.includes('.') ? value.replace(/\.?0+$/, '') : value;

export const formatFixed = (n, p = 2) => n.toFixed(p);

/*
 * @precision: -2, -1, 0, 1, 2, 3, 4, 5
 * @return: '123456.78'
 */
export const formatByPrecision = (n, { precision, zeroEnd = false, spase = false }) => {
  const factor = Math.pow(10, Math.abs(precision));
  const isAboveZero = precision > 0;
  let scaled = isAboveZero
    ? Math.floor(n * factor) / factor
    : precision === 0
    ? (n / factor) * factor
    : n * factor;

  const digits = isAboveZero ? precision : 1;

  scaled = formatFixed(scaled, digits);

  if (zeroEnd) {
    scaled = trimLastZeroes(scaled);
  } else if (spase) {
    scaled = formatNumber(scaled);
  }
  return scaled;
};
/*
 * @precision: -2, -1, 0, 1, 2, 3, 4, 5
 * @return: '123456.7800'
 */
export const formatByPrecisionWithZeroEnd = (n, precision) => `${n}`;
/*
 * @precision: -2, -1, 0, 1, 2, 3, 4, 5
 * @return: '123 456.78'
 */
export const formatByPrecisionWithSpace = (n, precision) => `${n}`;
/*
 * @precision: -2, -1, 0, 1, 2, 3, 4, 5
 * @return: '123 456.7800'
 */
export const formatByPrecisionWithSpaceZeroEnd = (n, precision) => `${n}`;

/*
 * @step: 100, 10, 1, 0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 0.0000001
 * @return: '123456.78'
 */
export const formatByStep = (n, { step, zeroEnd, spase }) => {
  const stepStr = step.toString();
  const mapper = {
    '1e-8': 8,
    '1e-7': 7,
  };
  const isInteger = Number.isInteger(step);
  let decimals = !isInteger ? mapper[stepStr] ?? stepStr.split('.')[1].length : step;
  const res = isInteger ? n * decimals : n / Math.pow(10, decimals);
  const fixed = isInteger ? 1 : decimals;
  return res.toFixed(fixed);
};
/*
 * @step: 100, 10, 1, 0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 0.0000001
 * @return: '123456.7800'
 */
export const formatByStepWithZeroEnd = (n, step) => `${n}`;
/*
 * @step: 100, 10, 1, 0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 0.0000001
 * @return: '123 456.78'
 */
export const formatByStepWithSpace = (n, step) => `${n}`;
/*
 * @step: 100, 10, 1, 0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 0.0000001
 * @return: '123 456.7800'
 */
export const formatByStepWithSpaceZeroEnd = (n, step) => `${n}`;
