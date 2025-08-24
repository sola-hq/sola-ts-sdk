import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { numberToU8a } from './index.js';

describe('numberToU8a', (): void => {
  it('converts undefined to empty', (): void => {
    expect(numberToU8a()).toEqual(new Uint8Array(1));
  });

  it('converts null to empty', (): void => {
    expect(numberToU8a(null)).toEqual(new Uint8Array(1));
  });

  it('converts NaN to empty', (): void => {
    expect(numberToU8a(NaN)).toEqual(new Uint8Array(1));
  });

  it('converts 0 to u8a', (): void => {
    expect(numberToU8a(0)).toEqual(new Uint8Array([0]));
  });

  it('converts 0 to u8a (with length)', (): void => {
    expect(numberToU8a(0, 16)).toEqual(new Uint8Array([0, 0]));
  });

  it('converts values to the u8a', (): void => {
    expect(numberToU8a(0x3456)).toEqual(new Uint8Array([0x34, 0x56]));
  });

  it('converts values to the u8a (bitLength)', (): void => {
    expect(numberToU8a(0x3456, 32)).toEqual(
      new Uint8Array([0x00, 0x00, 0x34, 0x56]),
    );
  });

  it('should handle faker generated positive numbers', () => {
    const num = faker.number.int({ max: 1000000, min: 0 });
    const u8a = numberToU8a(num);

    expect(u8a).toBeInstanceOf(Uint8Array);
    expect(u8a.length).toBeGreaterThan(0);
  });

  it('should handle faker generated negative numbers', () => {
    const num = faker.number.int({ max: -1, min: -1000000 });
    const u8a = numberToU8a(num);

    expect(u8a).toBeInstanceOf(Uint8Array);
    expect(u8a.length).toBeGreaterThan(0);
  });

  it('should handle faker generated numbers with specific bitLength', () => {
    const num = faker.number.int({ max: 100000, min: 0 });
    const bitLength = faker.number.int({ max: 64, min: 8, multipleOf: 8 });
    const u8a = numberToU8a(num, bitLength);

    expect(u8a).toBeInstanceOf(Uint8Array);
    expect(u8a.length).toBe(bitLength / 8);
  });
});
