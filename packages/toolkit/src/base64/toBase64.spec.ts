
import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { toBase64 } from './toBase64.js';

describe('toBase64', () => {
  it('should encode a Uint8Array to a base64 string', () => {
    const decoded = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const encoded = 'AQIDBAUGBwgJ';
    expect(toBase64(decoded)).toBe(encoded);
  });

  it('should handle faker generated Uint8Array', () => {
    const randomBytes = new Uint8Array(faker.helpers.arrayElements([...Array(256).keys()], 10));
    const encoded = toBase64(randomBytes);
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);
  });

  it('should handle empty Uint8Array', () => {
    const emptyArray = new Uint8Array([]);
    const encoded = toBase64(emptyArray);
    expect(typeof encoded).toBe('string');
    expect(encoded).toBe('');
  });
});
