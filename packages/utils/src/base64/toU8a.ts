
import { u8aToU8a } from '../u8a/toU8a.js';
import { base64 } from '@scure/base';

export function base64ToU8a(value: string): Uint8Array {
  return base64.decode(value);
}
