import type { BN } from '../bn/bn.js';
import type { ToBigInt, ToBn } from '../types.js';

import { hexToBigInt } from '../hex/toBigInt.js';
import { isBn } from '../is/bn.js';
import { isHex } from '../is/hex.js';
import { isToBigInt } from '../is/toBigInt.js';
import { isToBn } from '../is/toBn.js';

/**
 * @name nToBigInt
 * @summary Creates a bigInt value from a BN, bigint, string (base 10 or hex) or number input.
 */
export function nToBigInt<T extends ToBigInt | ToBn>(
  value?: T | BN | bigint | string | number | null,
): bigint {
  // Early return for null/undefined/empty values
  if (!value) {
    return BigInt(0);
  }

  // Early return for bigint type
  if (typeof value === 'bigint') {
    return value;
  }

  // Handle hex strings
  if (isHex(value)) {
    return hexToBigInt(value);
  }

  // Handle BN objects
  if (isBn(value)) {
    return BigInt(value.toString());
  }

  // Handle objects with toBigInt method
  if (isToBigInt(value)) {
    return value.toBigInt();
  }

  // Handle objects with toBn method
  if (isToBn(value)) {
    return BigInt(value.toBn().toString());
  }

  // Default case: try to convert to BigInt
  return BigInt(value);
}
