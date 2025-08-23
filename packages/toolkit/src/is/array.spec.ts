import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { isArray } from './array.js';

describe('isArray', (): void => {
  it('is false on no value', (): void => {
    expect(isArray()).toEqual(false);
  });

  it('is false on non-array', (): void => {
    expect(isArray(123)).toEqual(false);
  });

  it('is true when Array is found', (): void => {
    expect(isArray([1, 2, 3])).toEqual(true);
  });

  it('should handle faker generated arrays', () => {
    const size = faker.number.int({ min: 0, max: 10 });
    const randomArray = Array.from({ length: size }, () => faker.lorem.word());

    expect(isArray(randomArray)).toBe(true);
  });

  it('should handle faker generated non-array values', () => {
    const randomString = faker.lorem.word();

    expect(isArray(randomString)).toBe(false);
  });
});
