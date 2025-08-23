import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { isError } from './index.js';

describe('isError', (): void => {
  it('returns true when an Error value', (): void => {
    expect(isError(new Error('testing'))).toEqual(true);
  });

  it('returns false on non-Error values', (): void => {
    expect(isError(0)).toEqual(false);
  });

  it('should handle faker generated Error messages', () => {
    const errorMessage = faker.lorem.sentence();

    expect(isError(new Error(errorMessage))).toBe(true);
  });

  it('should handle faker generated non-Error values', () => {
    const randomNumber = faker.number.int();

    expect(isError(randomNumber)).toBe(false);
  });
});
