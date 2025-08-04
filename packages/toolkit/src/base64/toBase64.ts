import { base64 } from '@scure/base';

import { U8aLike } from '../types.js';
import { u8aToU8a } from '../u8a/toU8a.js';

export function toBase64(value: U8aLike): string {
  return base64.encode(u8aToU8a(value));
}
