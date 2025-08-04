import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { isUtf8 } from './utf8.js';

describe('isUtf8', (): void => {
  it('returns true for an ASCII string', (): void => {
    expect(isUtf8('Hello\tWorld!\n\rTesting')).toEqual(true);
  });

  it('returns true for ASCII bytes', (): void => {
    expect(isUtf8(new Uint8Array([0x31, 0x32, 0x20, 10]))).toEqual(true);
  });

  it('returns true for empty string inputs', (): void => {
    expect(isUtf8('')).toEqual(true);
  });

  it('returns true for empty U8a inputs', (): void => {
    expect(isUtf8(new Uint8Array())).toEqual(true);
  });

  it('returns false for empty undefined inputs', (): void => {
    expect(isUtf8()).toEqual(false);
  });

  it('is valid for ru', (): void => {
    expect(isUtf8('Приветствую, ми')).toEqual(true);
  });

  it('is valid for zh', (): void => {
    expect(isUtf8('你好')).toEqual(true);
  });

  it('is invalid for something random', (): void => {
    expect(isUtf8('0x7f07b1f87709608bee603bbc79a0dfc29cd315c1351a83aa31adf7458d7d3003')).toEqual(false);
    expect(isUtf8('0xc9ec51351beec59b52db06b3dd4685004013035df080358c319553ced597ca05')).toEqual(false);
    expect(isUtf8('0xd12cef06e90a05b63737d542aaee1389ff9f5c25e461b362180f025c3b2d5635')).toEqual(false);
  });

  it('should handle faker generated valid UTF-8 strings', () => {
    const utf8String = faker.lorem.sentence();
    expect(isUtf8(utf8String)).toBe(true);
  });

  it('should handle faker generated invalid UTF-8 Uint8Array', () => {
    const invalidUtf8Bytes = new Uint8Array([0xc3, 0x28]); // Incomplete UTF-8 sequence
    expect(isUtf8(invalidUtf8Bytes)).toBe(false);
  });

  it('should handle faker generated valid UTF-8 Uint8Array', () => {
    const utf8String = faker.lorem.sentence();
    const utf8Bytes = new TextEncoder().encode(utf8String);
    expect(isUtf8(utf8Bytes)).toBe(true);
  });
});
