import { base58 } from '@scure/base';

export function base58ToU8a(value: string): Uint8Array {
  return base58.decode(value);
}
