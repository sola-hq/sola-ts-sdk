import type { ToBn, ToNumberOptions } from '../types.js';
import type { BN } from './bn.js';

import { u8aToHex } from '../u8a/index.js';
import { bnToU8a } from './toU8a.js';

export function bnToHex<T extends ToBn>(
  value?: T | BN | bigint | number | null,
  { bitLength = -1, isLe = false, isNegative = false }: ToNumberOptions = {},
): string {
  return u8aToHex(bnToU8a(value, { bitLength, isLe, isNegative }));
}
