import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { isString } from './string.js';

describe('isString', (): void => {
  it('returns true on valid strings', (): void => {
    expect(
      isString('123')
    ).toEqual(true);
  });

  it('returns true on empty strings', (): void => {
    expect(
      isString('')
    ).toEqual(true);
  });

  it('returns true on String object', (): void => {
    expect(
      isString(String('foo'))
    ).toEqual(true);
  });

  it('returns false on invalid numbers', (): void => {
    expect(
      isString(2)
    ).toEqual(false);
  });

  it('should handle faker generated strings', () => {
    const randomString = faker.lorem.word();
    expect(isString(randomString)).toBe(true);
  });

  it('should handle faker generated non-string values', () => {
    const randomNumber = faker.number.int();
    expect(isString(randomNumber)).toBe(false);
  });
});
