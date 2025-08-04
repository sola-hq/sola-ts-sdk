import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { BN, bnToHex } from './index.js';

describe('bnToHex', (): void => {
  it('converts null values to 0x00', (): void => {
    expect(bnToHex(null)).toBe('0x00');
  });

  it('converts null values to 0x00000000 (with bitLength)', (): void => {
    expect(bnToHex(null, { bitLength: 32 })).toBe('0x00000000');
  });

  it('converts BN values to a prefixed hex representation', (): void => {
    expect(bnToHex(new BN(128))).toBe('0x80');
  });

  it('converts BN values to a prefixed hex representation (bitLength)', (): void => {
    expect(bnToHex(new BN(128), { bitLength: 16 })).toBe('0x0080');
  });

  it('converts BN values to a prefixed hex representation (LE)', (): void => {
    expect(bnToHex(new BN(128), { bitLength: 16, isLe: true })).toBe('0x8000');
  });

  it('handles negative numbers', (): void => {
    expect(bnToHex(new BN(-1234), { isNegative: true })).toBe('0xfb2e');
  });

  it('handles negative numbers (with bitLength)', (): void => {
    expect(bnToHex(new BN(-1234), { bitLength: 32, isNegative: true })).toBe('0xfffffb2e');
  });

  it('should handle faker generated positive numbers', (): void => {
    const positiveNumber = faker.number.int({ min: 1, max: 1000 });
    const hexResult = bnToHex(new BN(positiveNumber));
    expect(hexResult.startsWith('0x')).toBe(true);
  });

  it('should handle faker generated negative numbers', (): void => {
    const negativeNumber = faker.number.int({ min: -1000, max: -1 });
    const hexResult = bnToHex(new BN(negativeNumber), { isNegative: true });
    expect(hexResult.startsWith('0x')).toBe(true);
  });
});
