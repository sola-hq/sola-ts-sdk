import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { isNumber, isNumberLike } from './index.js';

describe('isNumber', (): void => {
  it('returns true on valid numbers', (): void => {
    expect(
      isNumber(2)
    ).toEqual(true);
  });

  it('returns false on invalid numbers', (): void => {
    expect(
      isNumber('2')
    ).toEqual(false);
  });

  it('should handle faker generated numbers', () => {
    const randomNumber = faker.number.int();
    expect(isNumber(randomNumber)).toBe(true);
  });

  it('should handle faker generated non-number values', () => {
    const randomString = faker.lorem.word();
    expect(isNumber(randomString)).toBe(false);
  });

  it('should handle faker generated number-like strings', () => {
    const numberString = faker.number.int().toString();
    expect(isNumberLike(numberString)).toBe(true);
  });

  it('should handle faker generated non-number-like strings', () => {
    const nonNumberString = faker.lorem.word();
    expect(isNumberLike(nonNumberString)).toBe(false);
  });

  it('should handle faker generated number-like BigInts', () => {
    const numberBigInt = faker.number.bigInt();
    expect(isNumberLike(numberBigInt)).toBe(true);
  });
});
