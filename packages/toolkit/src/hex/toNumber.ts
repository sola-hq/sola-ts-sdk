import { hexStripPrefix } from './stripPrefix.js';
import { hexToBn } from './toBn.js';

/**
 * @name hexToNumber
 * @summary Creates a Number value from a Buffer object.
 * @description
 * `null` inputs returns an NaN result, `hex` values return the actual value as a `Number`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexToNumber } from '@sola-hq/util';
 *
 * hexToNumber('0x1234'); // => 0x1234
 * ```
 */
export function hexToNumber(value?: string | null): number {
  if (!value) {
    return NaN;
  }

  const stripped = hexStripPrefix(value);
  const isNegative = stripped.length > 0 && parseInt(stripped[0], 16) >= 8;

  return hexToBn(value, { isNegative }).toNumber();
}
