import { toBase58 } from '../base58/toBase58.js';

export function u8aToBase58(value: Uint8Array): string {
  return toBase58(value);
}
