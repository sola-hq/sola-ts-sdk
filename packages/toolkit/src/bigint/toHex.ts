import type { BN } from '../bn/bn.js';
import type { ToNumberOptions, ToBigInt, ToBn } from '../types.js';

import { u8aToHex } from '../u8a/index.js';
import { nToU8a } from './toU8a.js';

/**
 * @name nToHex
 * @summary Creates a hex value from a bigint object.
 */
export function nToHex<T extends ToBn | ToBigInt>(value?: T | BN | bigint | number | null, { bitLength = -1, isLe = false, isNegative = false }: ToNumberOptions = {}): string {
  return u8aToHex(nToU8a(value || 0, { bitLength, isLe, isNegative }));
}
