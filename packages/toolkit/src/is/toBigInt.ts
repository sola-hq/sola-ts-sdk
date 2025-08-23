import type { ToBigInt } from '../types.js';

/**
 * @description Checks if the value is an object with a toBigInt method
 * @param value - The value to check
 * @returns True if the value is an object with a toBigInt method, false otherwise
 */
export const isToBigInt = (value: unknown): value is ToBigInt => {
  return typeof value === 'object' && value !== null && 'toBigInt' in value;
};
