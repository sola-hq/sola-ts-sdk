

import type { ToNumberOptions, ToBn } from '../types.js';
import type { BN } from './bn.js';

import { nToU8a } from '../bigint/toU8a.js';
import { bnToBn } from './toBn.js';

const DEFAULT_OPTS: ToNumberOptions = { bitLength: -1, isLe: true, isNegative: false };

/**
 * @name bnToU8a
 * @summary Creates a Uint8Array object from a BN.
 * @description
 * `null`/`undefined`/`NaN` inputs returns an empty `Uint8Array` result. `BN` input values return the actual bytes value converted to a `Uint8Array`. Optionally convert using little-endian format if `isLE` is set.
 * @example
 * <BR>
 *
 * ```javascript
 * import { bnToU8a } from '@sola-hq/util';
 *
 * bnToU8a(new BN(0x1234)); // => [0x12, 0x34]
 * ```
 */
export function bnToU8a<ExtToBn extends ToBn>(value?: ExtToBn | BN | bigint | number | null, options: ToNumberOptions = DEFAULT_OPTS): Uint8Array {
  return nToU8a(bnToBn(value), options);
}
