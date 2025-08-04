
import { HEX_PREFIX, isHex } from '../is/hex.js';

/**
 * @name hexHasPrefix
 * @summary Tests for the existence of a `0x` prefix.
 * @description
 * Checks for a valid hex input value and if the start matched `0x`
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexHasPrefix } from '@sola-hq/util';
 *
 * console.log('has prefix', hexHasPrefix('0x1234')); // => true
 * ```
 */
export function hexHasPrefix(value?: string | null | number): boolean {
  if (typeof value !== 'string') return false;
  return value.startsWith(HEX_PREFIX);
}
