import { describe, expect, it, test } from 'vitest';

import { u8aToNumber } from './index.js';

describe('u8aToNumber', (): void => {
  describe('empty creation', (): void => {
    it('handles unsigned (le)', (): void => {
      expect(u8aToNumber(new Uint8Array())).toBe(0);
    });

    it('handles signed (le)', (): void => {
      expect(u8aToNumber(new Uint8Array(), { isNegative: true })).toBe(0);
    });
  });

  describe('conversion tests', (): void => {
    const cases = [
      [false, false, [0], '0'],
      [false, true, [0], '0'],
      [true, false, [0], '0'],
      [true, true, [0], '0'],
    ] as const;

    test.each(cases)(
      'creates %s (bitLength=%s, isLe=%s, isNegative=%s)',
      (isLe, isNegative, numarr, strval) => {
        expect(
          u8aToNumber(new Uint8Array(numarr as unknown as number[]), {
            isLe,
            isNegative,
          }).toString(),
        ).toBe(strval);
      },
    );
  });
});
