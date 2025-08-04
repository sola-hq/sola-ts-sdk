import { describe, expect, it, test } from 'vitest';
import { faker } from '@faker-js/faker';

import { TESTS } from '../bigint/toU8a.spec.js';
import { bnToU8a } from './toU8a.js';
import { BN } from './index.js';

describe('bnToU8a', (): void => {
  it('converts null values to 0x00', (): void => {
    expect(
      bnToU8a(null)
    ).toEqual(new Uint8Array(1));
  });

  it('converts null values to 0x00000000 (bitLength)', (): void => {
    expect(
      bnToU8a(null, { bitLength: 32 })
    ).toEqual(new Uint8Array([0, 0, 0, 0]));
  });

  it('converts BN values to a prefixed hex representation', (): void => {
    expect(
      bnToU8a(new BN(0x123456), { isLe: false })
    ).toEqual(new Uint8Array([0x12, 0x34, 0x56]));
  });

  it('converts BN values to a prefixed hex representation (bitLength)', (): void => {
    expect(
      bnToU8a(new BN(0x123456), { bitLength: 32, isLe: false })
    ).toEqual(new Uint8Array([0x00, 0x12, 0x34, 0x56]));
  });

  it('converts using little endian (as set)', (): void => {
    expect(
      bnToU8a(new BN(0x123456), { bitLength: 32, isLe: true })
    ).toEqual(new Uint8Array([0x56, 0x34, 0x12, 0x00]));
  });

  describe('conversion tests', (): void => {
    TESTS.forEach(([isLe, isNegative, numarr, strval], i): void => {
      const bitLength = numarr.length * 8;

      it(`#${i}: converts from ${strval} (bitLength=${bitLength}, isLe=${isLe}, isNegative=${isNegative})`, (): void => {
        expect(
          bnToU8a(
            new BN(strval),
            { bitLength, isLe, isNegative }
          )
        ).toEqual(new Uint8Array(numarr));
      });
    });
  });

  it('should handle faker generated positive numbers', () => {
    const num = faker.number.int({ min: 0, max: Number.MAX_SAFE_INTEGER });
    const u8a = bnToU8a(new BN(num));
    expect(u8a).toBeInstanceOf(Uint8Array);
    expect(u8a.length).toBeGreaterThan(0);
  });

  it('should handle faker generated negative numbers', () => {
    const num = faker.number.int({ min: Number.MIN_SAFE_INTEGER, max: -1 });
    const u8a = bnToU8a(new BN(num), { isNegative: true });
    expect(u8a).toBeInstanceOf(Uint8Array);
    expect(u8a.length).toBeGreaterThan(0);
  });

  it('should handle faker generated numbers with specific bitLength', () => {
    const num = faker.number.int({ min: 0, max: 100000 });
    const bitLength = faker.number.int({ min: 8, max: 64, multipleOf: 8 });
    const u8a = bnToU8a(new BN(num), { bitLength });
    expect(u8a).toBeInstanceOf(Uint8Array);
    expect(u8a.length).toBe(Math.ceil(bitLength / 8));
  });
});
