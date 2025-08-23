import { hasBuffer } from '../has.js';

export function isBuffer(value: unknown): value is Buffer {
  return (
    hasBuffer && !!value && typeof value === 'object' && Buffer.isBuffer(value)
  );
}
