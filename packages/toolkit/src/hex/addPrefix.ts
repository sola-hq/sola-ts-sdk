import { hexHasPrefix } from './hasPrefix.js';

/**
 * @name addHexPrefix
 * @summary Adds the `0x` prefix to string values.
 * @description
 * Returns a `0x` prefixed string from the input value. If the input is already prefixed, it is returned unchanged.
 * @example
 * <BR>
 *
 * ```javascript
 * import { addHexPrefix } from '@sola-hq/toolkit';
 *
 * console.log('With prefix', addHexPrefix('0a0b12')); // => 0x0a0b12
 * ```
 */
export function addHexPrefix(value?: string | null | number): string {
  if (hexHasPrefix(value)) return value as string;
  if (typeof value === 'number') return `0x${value.toString(16)}`;
  if (typeof value === 'string')
    return `0x${value && value.length % 2 === 1 ? '0' : ''}${value || ''}`;

  return '';
}
