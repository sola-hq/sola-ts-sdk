import type { BN } from '../bn/bn.js';
import type { ToBigInt, ToBn, ToNumberOptions } from '../types.js';

import { nToBigInt } from './toBigInt.js';

const DIV = BigInt(256);

function toU8a(value: bigint, isLe: boolean): Uint8Array {
  const arr: number[] = [];

  while (value !== BigInt(0)) {
    const mod = value % DIV;
    const val = Number(mod);

    if (isLe) {
      arr.push(val);
    } else {
      arr.unshift(val);
    }

    value = (value - mod) / DIV;
  }

  return Uint8Array.from(arr);
}

/**
 * @name nToU8a
 * @summary Creates a Uint8Array object from a bigint.
 */
export function nToU8a<T extends ToBn | ToBigInt>(
  value?: T | BN | bigint | number | null,
  { bitLength = -1, isLe = true, isNegative = false }: ToNumberOptions = {},
): Uint8Array {
  let valueBi = nToBigInt(value);

  if (valueBi === BigInt(0)) {
    return bitLength === -1
      ? new Uint8Array(1)
      : new Uint8Array(Math.ceil((bitLength || 0) / 8));
  }

  // Handle negative numbers for two's complement
  if (isNegative && valueBi < BigInt(0)) {
    // Determine the effective bit length if not provided
    const effectiveBitLength =
      bitLength === -1
        ? Math.ceil(valueBi.toString(2).length / 8) * 8 // Smallest multiple of 8
        : bitLength;

    const twoPowN = BigInt(1) << BigInt(effectiveBitLength);

    valueBi = twoPowN + valueBi;
  }

  const u8a = toU8a(valueBi, isLe);

  if (bitLength === -1) {
    return u8a;
  }

  const byteLength = Math.ceil((bitLength || 0) / 8);
  const output = new Uint8Array(byteLength);

  // Truncate u8a if it's larger than byteLength
  const truncatedU8a =
    u8a.length > byteLength
      ? isLe
        ? u8a.slice(0, byteLength)
        : u8a.slice(u8a.length - byteLength)
      : u8a;

  output.set(truncatedU8a, isLe ? 0 : byteLength - truncatedU8a.length);

  return output;
}
