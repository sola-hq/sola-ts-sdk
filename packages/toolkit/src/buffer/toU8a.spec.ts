import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { bufferToU8a } from './index.js';

describe('bufferToU8a', (): void => {
  it('returns an empty buffer when null provided', (): void => {
    expect(bufferToU8a(null)).toEqual(new Uint8Array());
  });

  it('returns a Uint8Buffer with the correct values', (): void => {
    expect(bufferToU8a(Buffer.from([128, 0, 10]))).toEqual(
      new Uint8Array([128, 0, 10]),
    );
  });

  it('should handle faker generated arrays of numbers', () => {
    const size = faker.number.int({ min: 1, max: 100 });
    const randomNumbers = Array.from({ length: size }, () =>
      faker.number.int({ min: 0, max: 255 }),
    );
    const buffer = Buffer.from(randomNumbers);

    expect(bufferToU8a(buffer)).toEqual(new Uint8Array(randomNumbers));
  });

  it('should handle empty faker generated arrays', () => {
    const emptyArray: number[] = [];
    const buffer = Buffer.from(emptyArray);

    expect(bufferToU8a(buffer)).toEqual(new Uint8Array(emptyArray));
  });
});
