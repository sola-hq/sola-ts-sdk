import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import BN from 'bn.js';
import { isToBn } from './toBn.js';

describe('isToBn', (): void => {
  it('is false on no value', (): void => {
    expect(isToBn(undefined)).toEqual(false);
  });

  it('is false on non-compact value', (): void => {
    expect(isToBn(123)).toEqual(false);
  });

  it('is true when compact-like signature is found', (): void => {
    expect(isToBn({
      toBigInt: () => BigInt(1),
      toBn: () => new BN(1)
    })).toEqual(true);
  });

  it('should handle faker generated objects with toBn method', () => {
    const randomNumber = faker.number.int();
    const obj = { toBn: () => new BN(randomNumber) };
    expect(isToBn(obj)).toBe(true);
  });

  it('should handle faker generated objects without toBn method', () => {
    const randomObject = { [faker.lorem.word()]: faker.lorem.word() };
    expect(isToBn(randomObject)).toBe(false);
  });

  it('should handle faker generated non-object values', () => {
    const randomNumber = faker.number.int();
    expect(isToBn(randomNumber)).toBe(false);
  });
});
