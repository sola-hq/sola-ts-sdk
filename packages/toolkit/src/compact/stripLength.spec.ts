import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { compactAddLength } from './addLength.js';
import { compactStripLength } from './index.js';

describe('compactStripLength', (): void => {
  it('correctly removes the length prefix', (): void => {
    expect(compactStripLength(Uint8Array.from([2 << 2, 12, 13]))).toEqual([
      3,
      Uint8Array.from([12, 13]),
    ]);
  });

  it('should handle faker generated Uint8Array', () => {
    const size = faker.number.int({ min: 0, max: 100 });
    const randomBytes = new Uint8Array(
      Array.from({ length: size }, () =>
        faker.number.int({ min: 0, max: 255 }),
      ),
    );
    const encoded = compactAddLength(randomBytes);
    const [_, decoded] = compactStripLength(encoded);

    expect(decoded).toEqual(randomBytes);
  });

  it('should handle empty Uint8Array', () => {
    const emptyArray = new Uint8Array([]);
    const encoded = compactAddLength(emptyArray);
    const [_, decoded] = compactStripLength(encoded);

    expect(decoded).toEqual(emptyArray);
  });
});
