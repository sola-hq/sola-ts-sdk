import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { bnToBn } from './toBn.js';
import { BN } from './bn.js';

describe('bnToBn', (): void => {
  it('converts null values to 0x00', (): void => {
    expect(bnToBn(null).toNumber()).toEqual(0);
  });

  it('converts BN values to BN', (): void => {
    expect(bnToBn(new BN(128)).toNumber()).toEqual(128);
  });

  it('converts BigInt values to BN', (): void => {
    expect(bnToBn(128821n).toNumber()).toEqual(128821);
  });

  it('converts number values to BN', (): void => {
    expect(bnToBn(128).toNumber()).toEqual(128);
  });

  it('converts string to BN', (): void => {
    expect(bnToBn('123').toNumber()).toEqual(123);
  });

  it('converts hex to BN', (): void => {
    expect(bnToBn('0x0123').toNumber()).toEqual(0x123);
  });

  it('converts Compact to BN', (): void => {
    expect(bnToBn({
      something: 'test',
      toBn: (): BN => new BN(1234)
    }).toNumber()).toEqual(1234);
  });

  it('should handle faker generated numbers', (): void => {
    const number = faker.number.int({ min: 1, max: 1000 });
    expect(bnToBn(number).toNumber()).toEqual(number);
  });

  it('should handle faker generated strings', (): void => {
    const numberString = faker.number.int({ min: 1, max: 1000 }).toString();
    expect(bnToBn(numberString).toNumber()).toEqual(parseInt(numberString));
  });

  it('should handle faker generated hex strings', (): void => {
    const hexString = faker.string.hexadecimal({ length: 6 });
    expect(bnToBn(hexString).toNumber()).toEqual(parseInt(hexString, 16));
  });
});
