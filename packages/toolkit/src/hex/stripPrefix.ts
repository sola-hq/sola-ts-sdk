import { REGEX_HEX_WITH_PREFIX, REGEX_HEX_WITHOUT_PREFIX } from '../is/hex.js';

/**
 * @name hexStripPrefix
 * @summary Strips any leading `0x` prefix.
 * @description
 * Tests for the existence of a `0x` prefix, and returns the value without the prefix. Un-prefixed values are returned as-is.
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexStripPrefix } from '@sola-hq/util';
 *
 * console.log('stripped', hexStripPrefix('0x1234')); // => 1234
 * ```
 */
export function hexStripPrefix(value?: string | null): string {
  if (!value || value === '0x') {
    return '';
  } else if (REGEX_HEX_WITH_PREFIX.test(value)) {
    return value.substring(2);
  } else if (REGEX_HEX_WITHOUT_PREFIX.test(value)) {
    return value;
  }

  throw new Error(`Expected hex value to convert, found '${value}'`);
}
