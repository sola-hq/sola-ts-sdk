import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { addHexPrefix } from './addPrefix.js';

describe('addHexPrefix', (): void => {
  it('does not add when prefix is available', (): void => {
    expect(addHexPrefix('0x0123')).toEqual('0x0123');
  });

  it('adds the prefix when it is not available', (): void => {
    expect(addHexPrefix('0123')).toEqual('0x0123');
  });

  it('adds extra 0 when length % 2 === 1', (): void => {
    expect(addHexPrefix('123')).toEqual('0x0123');
  });

  it('returns empty string for null', (): void => {
    expect(addHexPrefix(null)).toEqual('');
  });

  it('should handle faker generated hex strings', (): void => {
    const hexString = faker.string.hexadecimal({ length: 8 });
    expect(addHexPrefix(hexString)).toEqual(hexString);
  });

  it('should handle odd length hex strings', (): void => {
    const oddHexString = faker.string.hexadecimal({ length: 7 }).slice(2); // Remove 0x prefix
    expect(addHexPrefix(oddHexString)).toEqual(`0x0${oddHexString}`);
  });
});
