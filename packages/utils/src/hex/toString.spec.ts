import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { hexToString } from './index.js';
import { stringToHex } from '../string/toHex.js';
import { hexToU8a } from './toU8a.js';

describe('hexToString', (): void => {
  it('converts an empty to ""', (): void => {
    expect(
      hexToString()
    ).toEqual('');
  });

  it('converts to a string from hex', (): void => {
    expect(
      hexToString('0x68656c6c6f')
    ).toEqual('hello');
  });

  it('should handle faker generated strings', () => {
    const randomString = faker.lorem.word();
    const hex = stringToHex(randomString);
    expect(hexToString(hex)).toEqual(randomString);
  });

  it('should handle faker generated empty strings', () => {
    const emptyString = '';
    const hex = stringToHex(emptyString);
    expect(hexToString(hex)).toEqual(emptyString);
  });

  it('should throw for invalid hex strings', () => {
    const invalidHex = faker.string.alpha({ length: 10 });
    expect(() => hexToString(invalidHex)).toThrow(/Expected hex value to convert/);
  });
});
