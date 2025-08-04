import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { BN } from '../bn/index.js';
import { isBn } from './bn.js';

describe('isBN', (): void => {
  it('returns true when a BN value', (): void => {
    expect(
      isBn(new BN(123))
    ).toEqual(true);
  });

  it('returns false on non-BN values', (): void => {
    expect(
      isBn(0)
    ).toEqual(false);
  });

  it('should handle faker generated BN values', () => {
    const randomNumber = faker.number.int();
    expect(isBn(new BN(randomNumber))).toBe(true);
  });

  it('should handle faker generated non-BN values', () => {
    const randomNumber = faker.number.int();
    expect(isBn(randomNumber)).toBe(false);
  });
});
