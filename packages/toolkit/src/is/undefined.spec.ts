import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { isUndefined } from './undefined.js';

describe('isUndefined', (): void => {
  it('returns true on undefined values', (): void => {
    expect(
      isUndefined()
    ).toEqual(true);
  });

  it('returns false on defined values', (): void => {
    expect(
      isUndefined(null)
    ).toEqual(false);
  });

  it('should handle faker generated defined values', () => {
    const randomNumber = faker.number.int();
    expect(isUndefined(randomNumber)).toBe(false);
  });

  it('should handle faker generated defined objects', () => {
    const randomObject = { [faker.lorem.word()]: faker.lorem.word() };
    expect(isUndefined(randomObject)).toBe(false);
  });
});
