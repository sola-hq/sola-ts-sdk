import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { isU8a } from './index.js';

describe('isU8a', (): void => {
  it('returns false on undefined values', (): void => {
    expect(isU8a()).toEqual(false);
  });

  it('returns false on null values', (): void => {
    expect(isU8a(null)).toEqual(false);
  });

  it('returns false on Array values', (): void => {
    expect(isU8a([1, 2, 3])).toEqual(false);
  });

  it('returns true on Buffer values', (): void => {
    // under Node, Buffer implements Uint8Array
    expect(isU8a(Buffer.from([1, 2, 3]))).toEqual(true);
  });

  it('returns true on Uint8Array values', (): void => {
    expect(isU8a(new Uint8Array())).toEqual(true);
  });

  it('should handle faker generated Uint8Array values', () => {
    const size = faker.number.int({ max: 100, min: 0 });
    const randomBytes = new Uint8Array(
      Array.from({ length: size }, () =>
        faker.number.int({ max: 255, min: 0 }),
      ),
    );

    expect(isU8a(randomBytes)).toBe(true);
  });

  it('should handle faker generated non-Uint8Array values', () => {
    const randomNumber = faker.number.int();

    expect(isU8a(randomNumber)).toBe(false);
  });
});
