import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { stringToHex } from './toHex.js';

describe('hexToString', (): void => {
  it('converts an empty to ""', (): void => {
    expect(stringToHex()).toEqual('0x');
  });

  it('converts to a hex from string', (): void => {
    expect(stringToHex('hello')).toEqual('0x68656c6c6f');
  });

  it('converts to a hex from String', (): void => {
    expect(stringToHex(String('hello'))).toEqual('0x68656c6c6f');
  });

  it('should handle faker generated strings', () => {
    const randomString = faker.lorem.word();
    const hex = stringToHex(randomString);

    expect(hex.startsWith('0x')).toBe(true);
    expect(hex.length).toBeGreaterThan(2);
  });

  it('should handle faker generated empty strings', () => {
    const emptyString = '';
    const hex = stringToHex(emptyString);

    expect(hex).toEqual('0x');
  });

  it('should handle faker generated strings with special characters', () => {
    const specialString = faker.lorem.sentence() + '!@#$%^&*()_+';
    const hex = stringToHex(specialString);

    expect(hex.startsWith('0x')).toBe(true);
    expect(hex.length).toBeGreaterThan(2);
  });
});
