import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { isBoolean, isBooleanLike } from './boolean.js';

describe('isBoolean', (): void => {
  it('returns true on false', (): void => {
    expect(isBoolean(false)).toEqual(true);
  });

  it('returns true on true', (): void => {
    expect(isBoolean(true)).toEqual(true);
  });

  it('returns false on invalid booleans', (): void => {
    expect(isBoolean('notABool')).toEqual(false);
  });

  it('returns true on boolean-like values', (): void => {
    expect(isBooleanLike('true')).toEqual(true);
    expect(isBooleanLike('false')).toEqual(true);
    expect(isBooleanLike('1')).toEqual(true);
    expect(isBooleanLike('0')).toEqual(true);
    expect(isBooleanLike(true)).toEqual(true);
    expect(isBooleanLike(false)).toEqual(true);
    expect(isBooleanLike(1)).toEqual(true);
    expect(isBooleanLike(0)).toEqual(true);
  });

  it('should handle faker generated boolean-like values', (): void => {
    const booleanString = faker.helpers.arrayElement(['true', 'false', '1', '0']);
    expect(isBooleanLike(booleanString)).toEqual(true);
  });

  it('should return false for non-boolean-like values', (): void => {
    const nonBooleanString = faker.string.alphanumeric(5);
    expect(isBooleanLike(nonBooleanString)).toEqual(false);
  });
});
