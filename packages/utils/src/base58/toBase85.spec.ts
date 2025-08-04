
import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { toBase58 } from './toBase58.js';

describe('toBase58', () => {
  it('should encode a Uint8Array to a base58 string', () => {
    const decoded = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const encoded = toBase58(decoded);
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);
  });

  it('should handle faker generated Uint8Array', () => {
    const randomBytes = new Uint8Array(faker.helpers.arrayElements([...Array(256).keys()], 10));
    const encoded = toBase58(randomBytes);
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);
  });

  it('should handle empty Uint8Array', () => {
    const emptyArray = new Uint8Array([]);
    const encoded = toBase58(emptyArray);
    expect(typeof encoded).toBe('string');
  });
});
