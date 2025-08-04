import { u8aConcatStrict } from '../u8a/concat.js';
import { compactToU8a } from './toU8a.js';

export function compactAddLength(input: Uint8Array): Uint8Array {
  return u8aConcatStrict([
    compactToU8a(input.length),
    input
  ]);
}
