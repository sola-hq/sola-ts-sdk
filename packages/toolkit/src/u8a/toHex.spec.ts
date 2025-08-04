import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { u8aToHex } from './toHex.js';

describe('u8aToHex', (): void => {
  it('returns empty as 0x', (): void => {
    expect(
      u8aToHex()
    ).toEqual('0x');
  });

  it('returns empty as "" (unprefixed)', (): void => {
    expect(
      u8aToHex(null, -1, false)
    ).toEqual('');
  });

  it('returns the hex value for the array', (): void => {
    expect(
      u8aToHex(
        new Uint8Array([128, 0, 10])
      )
    ).toEqual('0x80000a');
  });

  it('returns the hex value for the array (unprefixed)', (): void => {
    expect(
      u8aToHex(
        new Uint8Array([128, 0, 10]),
        -1,
        false
      )
    ).toEqual('80000a');
  });

  it('handles starting zeros correctly', (): void => {
    expect(
      u8aToHex(
        new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0])
      )
    ).toEqual('0x0001000000000000');
  });

  it('returns the trimmed hex value where allowed >= max', (): void => {
    expect(
      u8aToHex(
        new Uint8Array([128, 0, 10, 11, 12, 13]),
        32
      )
    ).toEqual('0x8000…0c0d');
  });

  it('converts known bytes to their correct values', (): void => {
    const bytes = faker.string.hexadecimal({ length: 10, casing: 'lower' });
    const u8a = new Uint8Array(bytes.length / 2);
    expect(
      u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64]))
    ).toEqual('0x68656c6c6f20776f726c64');
  });

});
