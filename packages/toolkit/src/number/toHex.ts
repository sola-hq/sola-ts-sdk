import { hexFixLength } from '../hex/fixLength.js';

/**
 * @name numberToHex
 * @summary Creates a hex value from a number.
 * @description
 * `null`/`undefined`/`NaN` inputs returns an empty `0x` result. `number` input values return the actual bytes value converted to a `hex`. With `bitLength` set, it converts the number to the equivalent size.
 * @example
 * <BR>
 *
 * ```javascript
 * import { numberToHex } from '@sola-hq/util';
 *
 * numberToHex(0x1234); // => '0x1234'
 * numberToHex(0x1234, 32); // => 0x00001234
 * ```
 */
export function numberToHex(value?: number | null, bitLength = -1): string {
  if (!value || Number.isNaN(value)) {
    return hexFixLength('0', bitLength, true);
  }

  let hex: string;

  if (value < 0) {
    // Convert to two's complement for negative numbers
    const effectiveBitLength =
      bitLength === -1
        ? Math.ceil(Math.log2(Math.abs(value) + 1) / 8) * 8
        : bitLength;
    const twoPowN = 1 << effectiveBitLength;

    hex = (twoPowN + value).toString(16);
  } else {
    hex = value.toString(16);
  }

  return hexFixLength(hex.length % 2 ? `0${hex}` : hex, bitLength, true);
}
