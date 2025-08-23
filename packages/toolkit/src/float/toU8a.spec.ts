import { faker } from '@faker-js/faker';
import { describe, expect, it, test } from 'vitest';

import { u8aToHex } from '../u8a/index.js';
import { floatToU8a } from './toU8a.js';

class ExtNumber extends Number {
  foo = 'bar';
}

class ExtString extends String {
  foo = 'bar';
}

describe('floatToU8a', (): void => {
  it('throws on invalid bitLength', (): void => {
    expect(() => floatToU8a(123, { bitLength: 48 as 32 })).toThrow();
  });

  describe('conversion tests', (): void => {
    test.each([
      [undefined, undefined, +0.0, '0x00000000'],
      [undefined, undefined, -0.0, '0x00000080'],
      [undefined, undefined, 123.456, '0x79e9f642'],
      [undefined, undefined, '123.456', '0x79e9f642'],
      [undefined, undefined, new ExtNumber(123.456), '0x79e9f642'],
      [undefined, undefined, new ExtString(123.456), '0x79e9f642'],
      [true, 32, new ExtString(123.456), '0x79e9f642'],
      [true, undefined, Number.NaN, '0x0000c07f'],
      [false, undefined, -0.0, '0x80000000'],
      [undefined, 64, +0.0, '0x0000000000000000'],
      [true, 64, -0.0, '0x0000000000000080'],
      [false, 64, -0.0, '0x8000000000000000'],
      [undefined, 64, Number.NaN, '0x000000000000f87f'],
    ])('should correctly encode %s', (isLe, bitLength, input, output) => {
      expect(
        u8aToHex(floatToU8a(input, { bitLength: bitLength as 32 | 64, isLe })),
      ).toEqual(output);
    });
  });

  it('should handle faker generated float numbers (32-bit)', () => {
    const num = faker.number.float({
      min: -100000,
      max: 100000,
      fractionDigits: 8,
    });
    const u8a = floatToU8a(num, { bitLength: 32 });

    expect(u8a).toBeInstanceOf(Uint8Array);
    expect(u8a.length).toBe(4);
    // Decode and compare (approximate due to float precision)
    const decodedNum = new DataView(u8a.buffer).getFloat32(0, true);

    expect(decodedNum).toBeCloseTo(num, 2);
  });

  it('should handle faker generated float numbers (64-bit)', () => {
    const num = faker.number.float({
      min: -1000000000,
      max: 1000000000,
      fractionDigits: 8,
    });
    const u8a = floatToU8a(num, { bitLength: 64 });

    expect(u8a).toBeInstanceOf(Uint8Array);
    expect(u8a.length).toBe(8);
    // Decode and compare (approximate due to float precision)
    const decodedNum = new DataView(u8a.buffer).getFloat64(0, true);

    expect(decodedNum).toBeCloseTo(num, 8);
  });

  it('should handle faker generated float numbers with different endianness', () => {
    const num = faker.number.float({
      min: -1000,
      max: 1000,
      fractionDigits: 8,
    });
    const isLe = faker.datatype.boolean();
    const u8a = floatToU8a(num, { bitLength: 32, isLe });

    expect(u8a).toBeInstanceOf(Uint8Array);
    expect(u8a.length).toBe(4);
    const decodedNum = new DataView(u8a.buffer).getFloat32(0, isLe);

    expect(decodedNum).toBeCloseTo(num, 2);
  });
});
