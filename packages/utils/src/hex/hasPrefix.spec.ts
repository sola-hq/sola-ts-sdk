

import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { hexHasPrefix } from './index.js';

describe('hexHasPrefix', (): void => {
  it('returns true when hex prefix is found', (): void => {
    expect(
      hexHasPrefix('0x1234')
    ).toEqual(true);
  });

  it('returns false when no prefix attached', (): void => {
    expect(
      hexHasPrefix('123')
    ).toEqual(false);
  });

  it('returns false when null value supplied', (): void => {
    expect(
      hexHasPrefix(null)
    ).toEqual(false);
  });

  it('returns false when non-string value supplied', (): void => {
    expect(
      hexHasPrefix(false as unknown as string)
    ).toEqual(false);
  });

  it('should handle faker generated hex strings with prefix', () => {
    const hexString = faker.string.hexadecimal({ length: 10 });
    expect(hexHasPrefix(hexString)).toBe(true);
  });

  it('should handle faker generated hex strings without prefix', () => {
    const hexString = faker.string.hexadecimal({ length: 10 }).slice(2);
    expect(hexHasPrefix(hexString)).toBe(false);
  });

  it('should handle faker generated non-hex strings', () => {
    const randomString = faker.lorem.word();
    expect(hexHasPrefix(randomString)).toBe(false);
  });
});
