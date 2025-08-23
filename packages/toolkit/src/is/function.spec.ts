import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { isFunction } from './function.js';

describe('isFunction', (): void => {
  it('returns true on valid functions', (): void => {
    expect(isFunction(isFunction)).toEqual(true);
  });

  it('returns false on invalid functions', (): void => {
    expect(isFunction('notAFunction')).toEqual(false);
  });

  it('should handle faker generated functions', () => {
    const randomFunction = () => faker.number.int();

    expect(isFunction(randomFunction)).toBe(true);
  });

  it('should handle faker generated non-function values', () => {
    const randomString = faker.lorem.word();

    expect(isFunction(randomString)).toBe(false);
  });
});
