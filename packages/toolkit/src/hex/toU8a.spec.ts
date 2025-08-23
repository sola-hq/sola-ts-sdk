import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { hexToU8a } from './toU8a.js';

describe('hexToU8a', (): void => {
  it('returns an empty Uint8Array when null provided', (): void => {
    expect(hexToU8a(null)).toHaveLength(0);
  });

  it('returns an empty Uint8Array when 0x provided', (): void => {
    expect(hexToU8a('0x')).toHaveLength(0);
  });

  it('returns a Uint8Array with the correct values', (): void => {
    expect(hexToU8a('0x80000a')).toEqual(new Uint8Array([128, 0, 10]));
  });

  it('returns a Uint8Array with the correct values (bitLength > provided)', (): void => {
    expect(hexToU8a('0x80000A', 64)).toEqual(
      new Uint8Array([0, 0, 0, 0, 0, 128, 0, 10]),
    );
  });

  it('returns a Uint8Array with the correct values (bitLength < provided)', (): void => {
    expect(hexToU8a('0x80000a', 16)).toEqual(new Uint8Array([128, 0]));
  });

  it('converts a non-aligned string', (): void => {
    expect(hexToU8a('0x123')).toEqual(new Uint8Array([0x12, 0x30]));
  });

  it('converts known bytes to their correct values', (): void => {
    expect(
      hexToU8a('0x68656c6c6f20776f726c64'), // hello world (11 bytes, non-aligned)
    ).toEqual(
      new Uint8Array([
        0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64,
      ]),
    );
  });

  it('converts known bytes to their correct values (upper/lower)', (): void => {
    expect(
      hexToU8a('0x68656C6c6f20776F726c64'), // hello world (11 bytes, non-aligned)
    ).toEqual(
      new Uint8Array([
        0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64,
      ]),
    );
  });

  it('converts a random hex string to Uint8Array', (): void => {
    const randomHex = faker.string.hexadecimal({ length: 32, casing: 'lower' });

    // Convert hex string to expected Uint8Array manually
    const hexWithoutPrefix = randomHex.slice(2); // Remove '0x' prefix
    const bytePairs = hexWithoutPrefix.match(/.{1,2}/g);

    if (!bytePairs) {
      throw new Error('Failed to parse hex string into byte pairs');
    }

    const expectedU8a = new Uint8Array(
      bytePairs.map((byte) => parseInt(byte, 16)),
    );

    expect(hexToU8a(randomHex)).toEqual(expectedU8a);
  });
});
