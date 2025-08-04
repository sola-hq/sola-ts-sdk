import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { hexStripPrefix } from './index.js';

describe('hexStripPrefix', (): void => {
  it('returns an empty string when null value supplied', (): void => {
    expect(
      hexStripPrefix(null)
    ).toEqual('');
  });

  it('returns an empty string when 0x value supplied', (): void => {
    expect(
      hexStripPrefix('0x')
    ).toEqual('');
  });

  it('strips the prefix from hex strings', (): void => {
    expect(
      hexStripPrefix('0x1223')
    ).toEqual('1223');
  });

  it('strips the prefix from hex strings (non 2 lnegth)', (): void => {
    expect(
      hexStripPrefix('0x123')
    ).toEqual('123');
  });

  it('returns un-prefixed hex as-is', (): void => {
    expect(
      hexStripPrefix('abcd1223')
    ).toEqual('abcd1223');
  });

  it('throws when invalid hex', (): void => {
    expect(
      () => hexStripPrefix('0x0x01ab')
    ).toThrow(/Expected hex value to convert/);
  });

  it('should handle faker generated hex strings with prefix', () => {
    const hexString = faker.string.hexadecimal({ length: 10 });
    expect(hexStripPrefix(hexString)).toEqual(hexString.slice(2));
  });

  it('should handle faker generated hex strings without prefix', () => {
    const hexString = faker.string.hexadecimal({ length: 10 }).slice(2);
    expect(hexStripPrefix(hexString)).toEqual(hexString);
  });

  it('should throw for faker generated invalid hex strings', () => {
    const invalidHex = `0x0x${faker.string.hexadecimal({ length: 8 }).slice(2)}`;
    expect(() => hexStripPrefix(invalidHex)).toThrow(/Expected hex value to convert/);
  });
});
