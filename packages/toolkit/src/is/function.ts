/* eslint-disable @typescript-eslint/no-unsafe-function-type */

/**
 * @name isFunction
 * @summary Checks if the value is a function.
 * @description
 * `isFunction` checks if the value is a function.
 * @example
 * <BR>
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}
