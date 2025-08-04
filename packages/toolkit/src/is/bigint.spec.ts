import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { isBigInt } from './bigint.js';

describe('isBigint', (): void => {
  it('returns true with a ...n value', (): void => {
    expect(
      isBigInt(123456n)
    ).toEqual(true);
  });

  it('returns true with a BigInt(...) value', (): void => {
    expect(
      isBigInt(BigInt(123456))
    ).toEqual(true);
  });

  it('returns false on non-BigInt values', (): void => {
    expect(
      isBigInt(0)
    ).toEqual(false);
  });

  it('should handle faker generated BigInt values', () => {
    const randomBigInt = faker.number.bigInt();
    expect(isBigInt(randomBigInt)).toBe(true);
  });

  it('should handle faker generated non-BigInt values', () => {
    const randomNumber = faker.number.int();
    expect(isBigInt(randomNumber)).toBe(false);
  });
});
