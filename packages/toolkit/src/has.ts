/** true if the environment has proper BigInt support */
export const hasBigInt = typeof BigInt === 'function' && typeof BigInt.asIntN === 'function';

/** true if the environment has support for Buffer (typically Node.js) */
export const hasBuffer = typeof Buffer !== 'undefined' && typeof Buffer.isBuffer === 'function';

