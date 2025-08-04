import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { hexFixLength } from './index.js';

describe('hexFixLength', (): void => {
  it('returns bitLength === -1 as-is', (): void => {
    expect(
      hexFixLength('0x12345678')
    ).toEqual('0x12345678');
  });

  it('does not change when bitlength === length', (): void => {
    expect(
      hexFixLength('0x12345678', 32)
    ).toEqual('0x12345678');
  });

  it('trims values when bitLength > length', (): void => {
    expect(
      hexFixLength('0x12345678', 16)
    ).toEqual('0x5678');
  });

  it('returns as-is when bitLength < length', (): void => {
    expect(
      hexFixLength('0x1234', 32)
    ).toEqual('0x1234');
  });

  it('adds zeros when bitLength < length (withPadded)', (): void => {
    expect(
      hexFixLength('0x1234', 32, true)
    ).toEqual('0x00001234');
  });

  it('should handle faker generated hex strings with exact length', () => {
    const hexString = '0x12345678';
    const length = 8;
    const bitLength = length * 4;
    expect(hexFixLength(hexString, bitLength)).toEqual(hexString);
  });

  it('should handle faker generated hex strings that need trimming', () => {
    const originalLength = faker.number.int({ min: 5, max: 10 }) * 2; // Even length
    const hexString = faker.string.hexadecimal({ length: originalLength + 2 });
    const targetLength = faker.number.int({ min: 1, max: originalLength / 2 }) * 2; // Smaller even length
    const bitLength = targetLength * 4;
    const expected = `0x${hexString.slice(-targetLength)}`;
    expect(hexFixLength(hexString, bitLength)).toEqual(expected);
  });

  it('should handle faker generated hex strings that need padding', () => {
    const originalHexChars = faker.number.int({ min: 1, max: 5 }) * 2; // Even number of hex characters
    const hexString = faker.string.hexadecimal({ length: originalHexChars + 2 }); // +2 for 0x prefix
    const targetHexChars = faker.number.int({ min: originalHexChars + 1, max: originalHexChars + 5 }) * 2; // Larger even number of hex characters
    const bitLength = targetHexChars * 4;
    const strLength = Math.ceil(bitLength / 4);
    const expected = `0x${'0'.repeat(strLength - hexString.slice(2).length)}${hexString.slice(2)}`;
    expect(hexFixLength(hexString, bitLength, true)).toEqual(expected);
  });
});
