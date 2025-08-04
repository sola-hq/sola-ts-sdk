import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { stringToU8a } from './toU8a.js';

const RUSS_HELLO = new Uint8Array([208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130, 44, 32, 208, 188, 208, 184, 209, 128, 33]);

describe('stringToU8a', (): void => {
  it('decodes to an empty string for undefined/null', (): void => {
    expect(
      stringToU8a()
    ).toEqual(new Uint8Array());
    expect(
      stringToU8a(null)
    ).toEqual(new Uint8Array());
  });

  it('encodes the string correctly', (): void => {
    expect(
      stringToU8a('Привет, мир!')
    ).toEqual(RUSS_HELLO);
  });

  it('encodes the string correctly (String)', (): void => {
    expect(
      stringToU8a(String('Привет, мир!'))
    ).toEqual(RUSS_HELLO);
  });

  it('should handle faker generated strings', () => {
    const randomString = faker.lorem.sentence();
    const u8a = stringToU8a(randomString);
    expect(u8a).toBeInstanceOf(Uint8Array);
    expect(new TextDecoder().decode(u8a)).toEqual(randomString);
  });

  it('should handle faker generated empty strings', () => {
    const emptyString = '';
    const u8a = stringToU8a(emptyString);
    expect(u8a).toEqual(new Uint8Array());
  });

  it('should handle faker generated strings with special characters', () => {
    const specialString = faker.lorem.sentence() + '!@#$%^&*()_+';
    const u8a = stringToU8a(specialString);
    expect(u8a).toBeInstanceOf(Uint8Array);
    expect(new TextDecoder().decode(u8a)).toEqual(specialString);
  });
});
