import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { isObject } from './index.js';

describe('isObject', (): void => {
  it('returns true on valid objects', (): void => {
    expect(
      isObject({})
    ).toEqual(true);
  });

  it('returns false on invalid objects', (): void => {
    expect(
      isObject('notAnObject')
    ).toEqual(false);
  });

  it('returns false on null', (): void => {
    expect(
      isObject(null)
    ).toEqual(false);
  });

  it('returns false on bigint', (): void => {
    expect(
      isObject(123n)
    ).toEqual(false);
  });

  it('should handle faker generated objects', () => {
    const randomObject = { [faker.lorem.word()]: faker.lorem.word() };
    expect(isObject(randomObject)).toBe(true);
  });

  it('should handle faker generated non-object values', () => {
    const randomNumber = faker.number.int();
    expect(isObject(randomNumber)).toBe(false);
  });
});
