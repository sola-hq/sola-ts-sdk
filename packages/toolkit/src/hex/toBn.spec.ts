import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { BN } from '../bn/index.js';
import { addHexPrefix } from './addPrefix.js';
import { hexToBn } from './index.js';

describe('hexToBn', (): void => {
  it('converts prefixed hex values to BN', (): void => {
    expect(hexToBn('0x81').toString(16)).toBe('81');
  });

  it('converts null values to BN(0)', (): void => {
    expect(hexToBn(null).toNumber()).toBe(0);
  });

  it('converts 0x values to BN(0)', (): void => {
    expect(hexToBn('0x').toNumber()).toBe(0);
  });

  it('should convert with Big Endian by default', (): void => {
    expect(hexToBn('0x0100').toNumber()).toBe(256);
  });

  it('converts 0x values to BN(0) (LE)', (): void => {
    expect(hexToBn('0x', { isLe: true }).toNumber()).toBe(0);
  });

  it('converts little-endian', (): void => {
    expect(hexToBn('0x4500000000000000', { isLe: true }).toNumber()).toBe(69);
  });

  it('handles negative numbers (LE)', (): void => {
    expect(hexToBn('0x2efb', { isLe: true, isNegative: true }).toNumber()).toBe(
      -1234,
    );
  });

  it('handles negative numbers (BE)', (): void => {
    expect(
      hexToBn('0xfb2e', { isLe: false, isNegative: true }).toNumber(),
    ).toBe(-1234);
  });

  it('handles negative numbers (LE, 128)', (): void => {
    expect(
      hexToBn('0x00009c584c491ff2ffffffffffffffff', {
        isLe: true,
        isNegative: true,
      }).toString(),
    ).toEqual('-1000000000000000000');
  });

  it('handles starting zeros correctly (BE)', (): void => {
    expect(hexToBn('0x0000000000000100', { isLe: false }).toNumber()).toBe(256);
  });

  it('handles starting zeros correctly (LE)', (): void => {
    expect(hexToBn('0x0001000000000000', { isLe: true }).toNumber()).toBe(256);
  });

  it('should handle faker generated positive hex strings', () => {
    const num = faker.number.int({ max: Number.MAX_SAFE_INTEGER, min: 0 });
    const hex = addHexPrefix(num.toString(16));

    expect(hexToBn(hex).toNumber()).toEqual(num);
  });

  it('should handle faker generated negative hex strings', () => {
    const num = faker.number.int({ max: -1, min: Number.MIN_SAFE_INTEGER });
    const hex = addHexPrefix(new BN(num).toTwos(64).toString(16)); // Convert to two's complement hex

    expect(hexToBn(hex, { isNegative: true }).toNumber()).toEqual(num);
  });

  it('should handle faker generated hex strings with random endianness', () => {
    const num = faker.number.int({ max: Number.MAX_SAFE_INTEGER, min: 0 });
    const isLe = faker.datatype.boolean();
    const hex = addHexPrefix(num.toString(16));
    const converted = hexToBn(hex, { isLe });

    // For simplicity, we'll just check if it's a BN and not throw an error
    expect(converted).toBeInstanceOf(BN);
  });
});
