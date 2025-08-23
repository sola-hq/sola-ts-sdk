import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { BN } from '../bn/bn.js';
import { hexToU8a } from '../hex/toU8a.js';
import { compactFromU8a, compactFromU8aLim } from './index.js';
import { compactToU8a } from './toU8a.js';

describe('compactFromU8a', (): void => {
  it('decoded u8 value', (): void => {
    expect(compactFromU8a(new Uint8Array([0b11111100]))).toEqual([
      1,
      new BN(63),
    ]);
  });

  it('decodes from same u16 encoded value', (): void => {
    expect(
      compactFromU8a(new Uint8Array([0b11111101, 0b00000111])).toString(),
    ).toEqual([2, new BN(511)].toString());
  });

  it('decodes from same u32 encoded value (short)', (): void => {
    expect(compactFromU8a(new Uint8Array([254, 255, 3, 0])).toString()).toEqual(
      [4, new BN(0xffff)].toString(),
    );
  });

  it('decodes from same u32 encoded value (short, max)', (): void => {
    expect(
      compactFromU8a(new Uint8Array([254, 255, 255, 255])).toString(),
    ).toEqual([4, new BN(1073741823)].toString());
  });

  it('decodes from same u32 encoded value (full)', (): void => {
    expect(compactFromU8a(new Uint8Array([3, 249, 255, 255, 255]))).toEqual([
      5,
      new BN(0xfffffff9),
    ]);
  });

  it('decodes from same u32 as u64 encoded value (full, default)', (): void => {
    expect(
      compactFromU8a(new Uint8Array([3 + ((4 - 4) << 2), 249, 255, 255, 255])),
    ).toEqual([5, new BN(0xfffffff9)]);
  });

  it('decodes an actual value', (): void => {
    expect(compactFromU8a(hexToU8a('0x0b00407a10f35a'))).toEqual([
      7,
      new BN('5af3107a4000', 16),
    ]);
  });

  it('decodes an actual value (Buffer)', (): void => {
    expect(compactFromU8a(Buffer.from('0b00407a10f35a', 'hex'))).toEqual([
      7,
      new BN('5af3107a4000', 16),
    ]);
  });

  it('decodes an actual value (100000000)', (): void => {
    expect(compactFromU8a(hexToU8a('0x0284d717'))[1].toString()).toEqual(
      '100000000',
    );
  });

  it('should handle faker generated numbers (compactFromU8a)', () => {
    const num = faker.number.int({ min: 0, max: 1000000 });
    const compactU8a = compactToU8a(new BN(num));
    const [_, decodedBn] = compactFromU8a(compactU8a);

    expect(decodedBn.toNumber()).toEqual(num);
  });

  it('should handle faker generated numbers (compactFromU8aLim)', () => {
    const num = faker.number.int({ min: 0, max: 1000000 });
    const compactU8a = compactToU8a(new BN(num));
    const [_, decodedNum] = compactFromU8aLim(compactU8a);

    expect(decodedNum).toEqual(num);
  });

  it('should throw error for large numbers in compactFromU8aLim', () => {
    const num = faker.number.bigInt({
      min: BigInt(Number.MAX_SAFE_INTEGER) + 1n,
      max: BigInt(Number.MAX_SAFE_INTEGER) * 2n,
    });
    const compactU8a = compactToU8a(new BN(num.toString()));

    expect(() => compactFromU8aLim(compactU8a)).toThrow(
      'Compact input is > Number.MAX_SAFE_INTEGER',
    );
  });
});
