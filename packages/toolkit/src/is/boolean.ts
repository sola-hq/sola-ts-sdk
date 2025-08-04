

import { isString } from "./string.js";

/**
 * @name isBoolean
 * @summary Tests for a boolean value.
 * @description
 * Checks to see if the input value is a JavaScript boolean.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isBoolean } from '@sola-hq/util';
 *
 * isBoolean(false); // => true
 * ```
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * @name isBooleanLike
 * @summary Tests for a boolean-like value.
 * @description
 * Checks to see if the input value is a JavaScript boolean, number, or string.
 */
export function isBooleanLike(value: unknown): value is boolean | number | string {
  if (typeof value === 'boolean') return true;
  if (typeof value === 'number') return value === 0 || value === 1;
  if (isString(value)) {
    const set = new Set(['true', 'false', '1', '0', 'yes', 'no', 'y', 'n']);
    return set.has(value.toLowerCase());
  }
  return false;
}