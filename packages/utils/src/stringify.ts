
import { isBigInt } from './is/bigint.js';

export function stringify(value: unknown, space?: string | number): string {
  return JSON.stringify(value, (_, v) => isBigInt(v) ? v.toString() : v, space);
}
