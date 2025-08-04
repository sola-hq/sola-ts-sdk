import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { compactAddLength } from './index.js';

describe('compactAddLength', (): void => {
  it('correctly adds the length prefix', (): void => {
    expect(
      compactAddLength(Uint8Array.from([12, 13]))
    ).toEqual(Uint8Array.from([2 << 2, 12, 13]));
  });

  it('should handle faker generated Uint8Array', () => {
    const size = faker.number.int({ min: 0, max: 100 });
    const randomBytes = new Uint8Array(Array.from({ length: size }, () => faker.number.int({ min: 0, max: 255 })));
    const result = compactAddLength(randomBytes);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBeGreaterThanOrEqual(randomBytes.length);
  });

  it('should handle empty Uint8Array', () => {
    const emptyArray = new Uint8Array([]);
    const result = compactAddLength(emptyArray);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBeGreaterThan(0);
  });
});
