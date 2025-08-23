import type { U8aLike } from '../types.js';

import { base58 } from '@scure/base';

import { u8aToU8a } from '../u8a/toU8a.js';

export function toBase58(value: U8aLike): string {
  return base58.encode(u8aToU8a(value));
}
