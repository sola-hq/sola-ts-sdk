import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { nToHex } from './toHex.js';

describe('nToHex', (): void => {
  it('converts null values to 0x00', (): void => {
    expect(nToHex(null)).toBe('0x00');
  });

  it('converts null values to 0x00000000 (with bitLength)', (): void => {
    expect(nToHex(null, { bitLength: 32 })).toBe('0x00000000');
  });

  it('converts values to a prefixed hex representation', (): void => {
    expect(nToHex(128)).toBe('0x80');
  });

  it('converts values to a prefixed hex representation (bitLength)', (): void => {
    expect(nToHex(128n, { bitLength: 16 })).toBe('0x0080');
  });

  it('converts values to a prefixed hex representation (bitLength + le)', (): void => {
    expect(nToHex(128, { bitLength: 16, isLe: true })).toBe('0x8000');
  });

  it('converts values to a prefixed hex representation (LE)', (): void => {
    expect(nToHex(128, { bitLength: 16, isLe: true })).toBe('0x8000');
  });

  it('handles negative numbers', (): void => {
    expect(nToHex(-1234, { isNegative: true })).toBe('0xfb2e');
  });

  it('handles negative numbers (with bitLength)', (): void => {
    expect(nToHex(-1234, { bitLength: 32, isNegative: true })).toBe(
      '0xfffffb2e',
    );
  });

  it('should handle faker generated positive numbers', (): void => {
    const positiveNumber = faker.number.int({ max: 1000, min: 1 });
    const hexResult = nToHex(positiveNumber);

    expect(hexResult.startsWith('0x')).toBe(true);
  });

  it('should handle faker generated negative numbers', (): void => {
    const negativeNumber = faker.number.int({ max: -1, min: -1000 });
    const hexResult = nToHex(negativeNumber, { isNegative: true });

    expect(hexResult.startsWith('0x')).toBe(true);
  });
});
