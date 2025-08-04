import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { BN } from '../bn/index.js';
import { nToBigInt } from './index.js';

describe('nToBigInt', (): void => {
  it('converts null values to 0x00', (): void => {
    expect(nToBigInt(null)).toEqual(0n);
  });

  it('converts 0x values to 0x00', (): void => {
    expect(nToBigInt('0x')).toEqual(0n);
  });

  it('converts BN values to bigint', (): void => {
    expect(nToBigInt(new BN(128))).toEqual(128n);
  });

  it('converts BigInt values to bigint', (): void => {
    expect(nToBigInt(128821n)).toEqual(128821n);
  });

  it('converts number values to bigint', (): void => {
    expect(nToBigInt(128)).toEqual(128n);
  });

  it('converts string to bigint', (): void => {
    expect(nToBigInt('123')).toEqual(123n);
  });

  it('converts hex to bigint', (): void => {
    expect(nToBigInt('0x0123')).toEqual(0x123n);
  });

  it('converts Compact to bigint (via toBn)', (): void => {
    expect(nToBigInt({
      something: 'test',
      toBn: () => new BN(1234)
    })).toEqual(1234n);
  });

  it('converts Compact to bigint', (): void => {
    expect(nToBigInt({
      something: 'test',
      toBigInt: () => 1234n
    })).toEqual(1234n);
  });

  it('should handle faker generated numbers', (): void => {
    const number = faker.number.int({ min: 1, max: 1000 });
    expect(nToBigInt(number)).toEqual(BigInt(number));
  });

  it('should handle faker generated strings', (): void => {
    const numberString = faker.number.int({ min: 1, max: 1000 }).toString();
    expect(nToBigInt(numberString)).toEqual(BigInt(numberString));
  });

  it('should handle faker generated hex strings', (): void => {
    const hexString = faker.string.hexadecimal({ length: 6 });
    expect(nToBigInt(hexString)).toEqual(BigInt(hexString));
  });
});
