import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { toBase64 } from './toBase64.js';
import { base64ToU8a } from './toU8a.js';

describe('fromBase64', () => {
  it('should decode a base64 string', () => {
    const encoded = 'AQIDBAUGBwgJ';
    const decoded = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    expect(base64ToU8a(encoded)).toEqual(decoded);
  });

  it('should decode a faker generated base64 string', () => {
    const randomBytes = new Uint8Array(
      faker.helpers.arrayElements([...Array(256).keys()], 10),
    );
    const encoded = toBase64(randomBytes);
    const decoded = base64ToU8a(encoded);

    expect(decoded).toEqual(randomBytes);
  });

  it('should handle empty base64 string', () => {
    const emptyString = '';
    const decoded = base64ToU8a(emptyString);

    expect(decoded).toEqual(new Uint8Array([]));
  });
});
