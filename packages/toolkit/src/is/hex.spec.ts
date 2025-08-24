import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { isHex } from './index.js';

describe('isHex', (): void => {
  it('returns true on 0x hex values', (): void => {
    expect(isHex('0x')).toEqual(true);
  });

  it('returns true on hex values', (): void => {
    const hex = faker.string.hexadecimal({ length: 10 });

    expect(isHex(hex)).toEqual(true);
  });

  it('returns true on hex values with String', (): void => {
    const hex = faker.string.hexadecimal({ length: 8 });

    expect(isHex(String(hex))).toEqual(true);
  });

  it('returns false on hex values (non % 2)', (): void => {
    const oddLengthHex = faker.string.hexadecimal({
      casing: 'lower',
      length: 11,
    });

    console.log('oddLengthHex : ', oddLengthHex);
    expect(isHex(oddLengthHex)).toEqual(false);
  });

  it('returns true on uppercase values', (): void => {
    const test = faker.string.hexadecimal({ casing: 'upper', length: 8 });

    expect(isHex(test)).toEqual(true);
  });

  it('return false on hex values unprefixed', (): void => {
    const test = faker.string.hexadecimal({ length: 8 }).slice(2);

    expect(isHex(test)).toEqual(false);
  });

  it('returns false on non-string values', (): void => {
    expect(isHex(false)).toEqual(false);
    expect(isHex(123)).toEqual(false);
    expect(isHex(null)).toEqual(false);
    expect(isHex(undefined)).toEqual(false);
  });

  it('returns true when valid hex and bitLength matches', (): void => {
    expect(isHex('0x1234', 16)).toEqual(true);
  });

  it('returns false when valid hex and bitLength does not match', (): void => {
    expect(isHex('0x1234', 8)).toEqual(false);
  });

  it('does ignore lengths as required', (): void => {
    expect(isHex('0x123')).toEqual(false);
    expect(isHex('0x123', -1, true)).toEqual(true);
  });

  it('should handle various hex formats', (): void => {
    const validHex = faker.string.hexadecimal({ length: 6 });

    expect(isHex(validHex)).toEqual(true);
  });
});
