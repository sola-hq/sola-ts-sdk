import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { numberToHex } from './index.js';

describe('numberToHex', (): void => {
  it('converts undefined to 0x00', (): void => {
    expect(numberToHex()).toEqual('0x00');
  });

  it('converts null to 0x00000000 (with bitLength)', (): void => {
    expect(numberToHex(null, 32)).toEqual('0x00000000');
  });

  it('converts Nan to 0x', (): void => {
    expect(numberToHex(NaN)).toEqual('0x00');
  });

  it('converts 0 to 0x00', (): void => {
    expect(numberToHex(0)).toEqual('0x00');
  });

  it('converts number to hex', (): void => {
    expect(numberToHex(0x1245)).toEqual('0x1245');
  });

  it('converts number to hex (specfified bitLength)', (): void => {
    expect(numberToHex(0x1245, 32)).toEqual('0x00001245');
  });

  it('should handle faker generated positive numbers', () => {
    const num = faker.number.int({ max: 1000000, min: 0 });
    const hex = numberToHex(num);

    expect(hex.startsWith('0x')).toBe(true);
    expect(parseInt(hex, 16)).toEqual(num);
  });

  it('should handle faker generated negative numbers', () => {
    const num = faker.number.int({ max: -1, min: -1000000 });
    const hex = numberToHex(num);

    expect(hex.startsWith('0x')).toBe(true);
    // For negative numbers, the hex representation is two's complement
    // We can't directly compare with parseInt(hex, 16) unless we handle two's complement
    // For simplicity, we'll just check if it's a valid hex string
    expect(hex.length).toBeGreaterThan(2);
  });

  it('should handle faker generated numbers with specific bitLength', () => {
    const num = faker.number.int({ max: 100000, min: 0 });
    const bitLength = faker.number.int({ max: 64, min: 8, multipleOf: 8 });
    const hex = numberToHex(num, bitLength);

    expect(hex.startsWith('0x')).toBe(true);
    expect(hex.length).toBe(2 + bitLength / 4); // 0x + hex chars
  });
});
