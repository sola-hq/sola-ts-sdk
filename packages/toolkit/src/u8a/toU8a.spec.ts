import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { u8aToU8a } from './index.js';

describe('u8aToU8a', (): void => {
  it('returns an empty Uint8Array when null/undefined/"" provided', () => {
    expect(u8aToU8a(null)).toHaveLength(0);
    expect(u8aToU8a()).toHaveLength(0);
    expect(u8aToU8a('')).toHaveLength(0);
    expect(u8aToU8a('')).toEqual(new Uint8Array());
  });

  it('Throw error on null/undefined values on strict checking', () => {
    expect(() => u8aToU8a(undefined, true)).toThrow(
      'u8aToU8a: Expected non-null, non-undefined value',
    );
    expect(() => u8aToU8a(null, true)).toThrow(
      'u8aToU8a: Expected non-null, non-undefined value',
    );
  });

  it('returns a Uint8Array as-is (u8a input)', (): void => {
    const input = new Uint8Array([128, 0, 10]);

    expect(u8aToU8a(input)).toEqual(input);
  });

  it('should handle faker generated Uint8Array', () => {
    const size = faker.number.int({ min: 0, max: 100 });
    const randomBytes = new Uint8Array(
      Array.from({ length: size }, () =>
        faker.number.int({ min: 0, max: 255 }),
      ),
    );

    expect(u8aToU8a(randomBytes)).toEqual(randomBytes);
  });

  it('should handle faker generated hex strings', () => {
    const hexString = faker.string.hexadecimal({ length: 10 });

    // Convert hex string to expected Uint8Array manually
    const hexWithoutPrefix = hexString.slice(2); // Remove '0x' prefix
    const bytePairs = hexWithoutPrefix.match(/.{1,2}/g);

    if (!bytePairs) {
      throw new Error('Failed to parse hex string into byte pairs');
    }

    const expectedU8a = new Uint8Array(
      bytePairs.map((byte) => parseInt(byte, 16)),
    );

    expect(u8aToU8a(hexString)).toEqual(expectedU8a);
  });

  it('should handle faker generated strings', () => {
    const randomString = faker.lorem.sentence();
    const expectedU8a = new TextEncoder().encode(randomString);

    expect(u8aToU8a(randomString)).toEqual(expectedU8a);
  });

  it('should handle faker generated number arrays', () => {
    const size = faker.number.int({ min: 0, max: 100 });
    const numberArray = Array.from({ length: size }, () =>
      faker.number.int({ min: 0, max: 255 }),
    );

    expect(u8aToU8a(numberArray)).toEqual(new Uint8Array(numberArray));
  });

  it('should handle faker generated Buffer', () => {
    const size = faker.number.int({ min: 0, max: 100 });
    const randomBytes = new Uint8Array(
      Array.from({ length: size }, () =>
        faker.number.int({ min: 0, max: 255 }),
      ),
    );
    const buffer = Buffer.from(randomBytes);

    expect(u8aToU8a(buffer)).toEqual(randomBytes);
  });
});
