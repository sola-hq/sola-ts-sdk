import { base64 } from '@scure/base';

export function base64ToU8a(value: string): Uint8Array {
  return base64.decode(value);
}
