import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { isBuffer } from './index.js';

describe('isBuffer', (): void => {
  it('returns true when a Buffer value', (): void => {
    const testData = faker.string.alphanumeric(10);
    const buffer = Buffer.from(testData);

    expect(isBuffer(buffer)).toEqual(true);
  });

  it('returns false on non-Buffer values (number)', (): void => {
    expect(isBuffer(123)).toEqual(false);
  });

  it('returns false on non-Buffer values (null)', (): void => {
    expect(isBuffer(null)).toEqual(false);
  });

  it('returns false on non-Buffer values (string)', (): void => {
    const testString = faker.string.alphanumeric(10);

    expect(isBuffer(testString)).toEqual(false);
  });

  it('returns false on non-Buffer values (object)', (): void => {
    const testObject = { test: faker.string.alphanumeric(5) };

    expect(isBuffer(testObject)).toEqual(false);
  });

  it('returns false on non-Buffer values (array)', (): void => {
    const testArray = faker.helpers.arrayElements(['a', 'b', 'c'], 3);

    expect(isBuffer(testArray)).toEqual(false);
  });
});
