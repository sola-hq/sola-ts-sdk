import { describe, expect, it } from 'vitest';

import { u8aEq } from './eq.js';

describe('u8aEq', (): void => {
  it('returns false when the lengths do not match', (): void => {
    expect(u8aEq(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2]))).toEqual(
      false,
    );
  });

  it('returns false when the contents do not match', (): void => {
    expect(u8aEq(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 4]))).toEqual(
      false,
    );
  });

  it('returns true when the contents do match', (): void => {
    expect(u8aEq(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 3]))).toEqual(
      true,
    );
  });

  it('returns false when the contents do not match (with u32 start)', (): void => {
    expect(
      u8aEq(
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3]),
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 4]),
      ),
    ).toEqual(false);
  });

  it('returns true when the contents do match (with u32 start)', (): void => {
    expect(
      u8aEq(
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3]),
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3]),
      ),
    ).toEqual(true);
  });

  it('returns false when the contents do not match (u32 only)', (): void => {
    expect(
      u8aEq(
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 9]),
      ),
    ).toEqual(false);
  });

  it('returns true when the contents do match (u32 only)', (): void => {
    expect(
      u8aEq(
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
      ),
    ).toEqual(true);
  });

  it('returns true with equalvalent hex & Uint8array', (): void => {
    expect(u8aEq('0x010203', new Uint8Array([1, 2, 3]))).toEqual(true);
  });

  it('works on aubarray values', (): void => {
    const a = new Uint8Array(16);

    for (let i = 0, count = a.length; i < count; i++) {
      a[i] = i;
    }

    expect(u8aEq(a.subarray(0, 5), a.subarray(0, 5))).toEqual(true);
  });
});
