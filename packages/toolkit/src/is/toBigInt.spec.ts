import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { isToBigInt } from './toBigInt.js';

describe('isToBigInt', (): void => {
  it('is false on no value', (): void => {
    expect(isToBigInt(undefined)).toEqual(false);
  });

  it('is false on non-compact value', (): void => {
    expect(isToBigInt(123)).toEqual(false);
  });

  it('is true when compact-like signature is found', (): void => {
    expect(
      isToBigInt({
        toBigInt: () => BigInt(1),
      }),
    ).toEqual(true);
  });

  it('should handle faker generated objects with toBigInt method', () => {
    const randomBigInt = faker.number.bigInt();
    const obj = { toBigInt: () => randomBigInt };

    expect(isToBigInt(obj)).toBe(true);
  });

  it('should handle faker generated objects without toBigInt method', () => {
    const randomObject = { [faker.lorem.word()]: faker.lorem.word() };

    expect(isToBigInt(randomObject)).toBe(false);
  });

  it('should handle faker generated non-object values', () => {
    const randomNumber = faker.number.int();

    expect(isToBigInt(randomNumber)).toBe(false);
  });
});
