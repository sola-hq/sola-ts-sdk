
import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { base58ToU8a } from './toU8a.js';
import { toBase58 } from './toBase58.js';

describe('base58ToU8a', () => {
  it('should decode a base58 string', () => {
    const decoded = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const encoded = toBase58(decoded);
    expect(base58ToU8a(encoded)).toEqual(decoded);
  });

  it('should decode a faker generated base58 string', () => {
    const randomBytes = new Uint8Array(faker.helpers.arrayElements([...Array(256).keys()], 10));
    const encoded = toBase58(randomBytes);
    const decoded = base58ToU8a(encoded);
    expect(decoded).toEqual(randomBytes);
  });

  it('should handle empty base58 string', () => {
    const emptyString = '';
    const decoded = base58ToU8a(emptyString);
    expect(decoded).toEqual(new Uint8Array([]));
  });
});
