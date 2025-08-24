import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { TESTS } from '../bigint/toU8a.spec.js';
import { u8aToBigInt } from './index.js';

// test-cases are the same as in u8aToBn
describe('u8aToBigInt', (): void => {
  it('converts little-endian by default', (): void => {
    expect(u8aToBigInt(new Uint8Array([0x12, 0x34])).toString(16)).toBe('3412');
  });

  describe('empty creation', (): void => {
    it('handles unsigned (le)', (): void => {
      expect(u8aToBigInt(new Uint8Array(), { isLe: true }).toString(16)).toBe(
        '0',
      );
    });

    it('handles signed (le)', (): void => {
      expect(
        u8aToBigInt(new Uint8Array(), {
          isLe: true,
          isNegative: true,
        }).toString(16),
      ).toBe('0');
    });

    it('handles unsigned (be)', (): void => {
      expect(u8aToBigInt(new Uint8Array(), { isLe: false }).toString(16)).toBe(
        '0',
      );
    });

    it('handles signed (be)', (): void => {
      expect(
        u8aToBigInt(new Uint8Array(), {
          isLe: false,
          isNegative: true,
        }).toString(16),
      ).toBe('0');
    });
  });

  it('handles overflows correctly (little-endian)', (): void => {
    expect(
      u8aToBigInt(new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0]), { isLe: true }),
    ).toBe(256n);
  });

  describe('length tests', (): void => {
    [true, false].forEach(isLe => {
      for (let i = 1; i < 32; i++) {
        const tu8a = [
          0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56,
          0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34,
          0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78,
        ];
        const tstr = tu8a.map(n => n.toString(16));

        it(`converts values with bitLength=${i * 8}, isLe=${isLe}`, (): void => {
          expect(
            u8aToBigInt(new Uint8Array(tu8a.slice(0, i)), { isLe }).toString(
              16,
            ),
          ).toBe(
            isLe
              ? tstr.slice(0, i).reverse().join('')
              : tstr.slice(0, i).join(''),
          );
        });
      }
    });
  });

  describe('conversion tests', (): void => {
    TESTS.forEach(([isLe, isNegative, numarr, strval], i): void => {
      it(`#${i}: creates ${strval} (bitLength=${numarr.length * 8}, isLe=${isLe}, isNegative=${isNegative})`, (): void => {
        expect(
          u8aToBigInt(new Uint8Array(numarr), { isLe, isNegative }).toString(),
        ).toBe(strval);
      });
    });
  });

  it('should handle faker generated positive Uint8Array', () => {
    const size = faker.number.int({ max: 8, min: 1 });
    const randomBytes = new Uint8Array(
      Array.from({ length: size }, () =>
        faker.number.int({ max: 255, min: 0 }),
      ),
    );
    const expectedBigInt = randomBytes.reduce(
      (acc, byte, index) => acc + BigInt(byte) * (1n << BigInt(index * 8)),
      0n,
    );

    expect(u8aToBigInt(randomBytes, { isLe: true })).toEqual(expectedBigInt);
  });

  it('should handle faker generated negative Uint8Array', () => {
    const size = faker.number.int({ max: 8, min: 1 });
    const randomBytes = new Uint8Array(
      Array.from({ length: size }, () =>
        faker.number.int({ max: 255, min: 0 }),
      ),
    );

    // Ensure the last byte has MSB set for negative interpretation
    randomBytes[size - 1] |= 0x80;
    const expectedBigInt = u8aToBigInt(randomBytes, {
      isLe: true,
      isNegative: true,
    });

    expect(u8aToBigInt(randomBytes, { isLe: true, isNegative: true })).toEqual(
      expectedBigInt,
    );
  });

  it('should handle faker generated Uint8Array with random endianness', () => {
    const size = faker.number.int({ max: 8, min: 1 });
    const randomBytes = new Uint8Array(
      Array.from({ length: size }, () =>
        faker.number.int({ max: 255, min: 0 }),
      ),
    );
    const isLe = faker.datatype.boolean();
    const converted = u8aToBigInt(randomBytes, { isLe });

    expect(typeof converted).toBe('bigint');
  });
});
