import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { stringToU8a } from '../string/toU8a.js';
import { isAscii } from './ascii.js';

describe('isAscii', (): void => {
  it('returns true for an ASCII string', (): void => {
    expect(isAscii('Hello World! Testing')).toEqual(true);
  });

  it('returns false for an ASCII string (with formatters)', (): void => {
    expect(isAscii('Hello\tWorld!\n\rTesting')).toEqual(false);
  });

  it('returns false on an non-ascii string', (): void => {
    expect(isAscii('简体中文')).toEqual(false);
    expect(isAscii('繁體中文')).toEqual(false);
  });

  it('returns true for ASCII bytes', (): void => {
    expect(isAscii(stringToU8a('Hello World! Testing'))).toEqual(true);
  });

  it('returns true for empty string inputs', (): void => {
    expect(isAscii('')).toEqual(true);
  });

  it('returns true for empty U8a inputs', (): void => {
    expect(isAscii(new Uint8Array())).toEqual(true);
  });

  it('returns false for empty undefined inputs', (): void => {
    expect(isAscii()).toEqual(false);
  });

  it('returns false for non-printable characters', (): void => {
    expect(isAscii(new Uint8Array([5]))).toEqual(false);
  });

  it('returns false for hex input, non-ascii', (): void => {
    expect(isAscii('0x010203')).toEqual(false);
  });

  it('should handle faker generated ASCII strings', () => {
    const asciiString = faker.lorem.word();

    expect(isAscii(asciiString)).toBe(true);
  });

  it('should handle faker generated non-ASCII strings', () => {
    const nonAsciiString = '你好世界';

    expect(isAscii(nonAsciiString)).toBe(false);
  });

  it('should handle faker generated ASCII Uint8Array', () => {
    const asciiBytes = new Uint8Array(
      faker.lorem
        .word()
        .split('')
        .map(char => char.charCodeAt(0)),
    );

    expect(isAscii(asciiBytes)).toBe(true);
  });

  it('should handle faker generated non-ASCII Uint8Array', () => {
    const nonAsciiBytes = new Uint8Array([200, 201, 202, 203, 204]);

    expect(isAscii(nonAsciiBytes)).toBe(false);
  });
});
