import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { addHexPrefix } from './addPrefix.js';
import { hexToNumber } from './index.js';

describe('hexToNumber', (): void => {
  it('converts an empty to NaN', (): void => {
    expect(hexToNumber()).toEqual(NaN);
  });

  it('converts to a number from hex', (): void => {
    expect(hexToNumber('0x1234')).toEqual(0x1234);
  });

  it('should handle faker generated positive hex strings', () => {
    const num = faker.number.int({ max: Number.MAX_SAFE_INTEGER, min: 0 });
    const hex = addHexPrefix(num.toString(16));

    expect(hexToNumber(hex)).toEqual(num);
  });

  it('should handle faker generated negative hex strings', () => {
    // Example: -1 in 32-bit two's complement is 0xffffffff
    const hex = '0xffffffff';

    expect(hexToNumber(hex)).toEqual(-1);
  });

  it('should handle faker generated hex strings that result in NaN', () => {
    const invalidHex = faker.string.alpha({ length: 10 });

    expect(() => hexToNumber(invalidHex)).toThrow(
      /Expected hex value to convert/,
    );
  });
});
