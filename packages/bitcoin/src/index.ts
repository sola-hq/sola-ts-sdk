import { u8aToHex, u8aToU8a } from '@sola-hq/toolkit';

export function hello() {
  return u8aToHex(u8aToU8a('hello'), 16);
}
