import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { isNull } from './index.js';

describe('isNull', (): void => {
  it('returns true when a null value', (): void => {
    expect(
      isNull(null)
    ).toEqual(true);
  });

  it('returns false on non-null values', (): void => {
    expect(
      isNull()
    ).toEqual(false);
  });

  it('should handle faker generated non-null values', () => {
    const randomNumber = faker.number.int();
    expect(isNull(randomNumber)).toBe(false);
  });

  it('should handle faker generated non-null objects', () => {
    const randomObject = { key: faker.lorem.word() };
    expect(isNull(randomObject)).toBe(false);
  });
});
