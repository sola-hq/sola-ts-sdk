import BN from 'bn.js';
import { base58, base64 } from '@scure/base';

var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/array/index.ts
var array_exports = {};
__export(array_exports, {
  range: () => range,
  shuffle: () => shuffle
});

// src/array/range.ts
function range(size, startAt = 0) {
  if (size <= 0) {
    throw new Error("Expected non-zero, positive number as a range size");
  }
  const result = new Array(size);
  for (let i = 0; i < size; i++) {
    result[i] = i + startAt;
  }
  return result;
}

// src/array/shuffle.ts
function shuffle(input) {
  const result = input.slice();
  let curr = result.length;
  if (curr === 1) {
    return result;
  }
  while (curr !== 0) {
    const rand = ~~(Math.random() * curr);
    curr--;
    [result[curr], result[rand]] = [result[rand], result[curr]];
  }
  return result;
}

// src/bigint/index.ts
var bigint_exports = {};
__export(bigint_exports, {
  nToBigInt: () => nToBigInt,
  nToHex: () => nToHex,
  nToU8a: () => nToU8a
});

// src/u8a/toBigInt.ts
var U8_MAX = BigInt(256);
var U16_MAX = BigInt(256 * 256);
var U64_MAX = BigInt("0x10000000000000000");
function u8aToBigInt(value, { isLe = true, isNegative = false } = {}) {
  if (!isLe) {
    value = value.slice().reverse();
  }
  const count = value.length;
  if (isNegative && count && value[count - 1] & 128) {
    switch (count) {
      case 0:
        return BigInt(0);
      case 1:
        return BigInt((value[0] ^ 255) * -1 - 1);
      case 2:
        return BigInt((value[0] + (value[1] << 8) ^ 65535) * -1 - 1);
      case 4:
        return BigInt((value[0] + (value[1] << 8) + (value[2] << 16) + value[3] * 16777216 ^ 4294967295) * -1 - 1);
    }
    const dvI2 = new DataView(value.buffer, value.byteOffset);
    if (count === 8) {
      return dvI2.getBigInt64(0, true);
    }
    let result = BigInt(0);
    const mod = count % 2;
    for (let i = count - 2; i >= mod; i -= 2) {
      result = result * U16_MAX + BigInt(dvI2.getUint16(i, true) ^ 65535);
    }
    if (mod) {
      result = result * U8_MAX + BigInt(value[0] ^ 255);
    }
    return result * -1n - 1n;
  }
  switch (count) {
    case 0:
      return BigInt(0);
    case 1:
      return BigInt(value[0]);
    case 2:
      return BigInt(value[0] + (value[1] << 8));
    case 4:
      return BigInt(value[0] + (value[1] << 8) + (value[2] << 16) + value[3] * 16777216);
  }
  const dvI = new DataView(value.buffer, value.byteOffset);
  switch (count) {
    case 8:
      return dvI.getBigUint64(0, true);
    case 16:
      return dvI.getBigUint64(8, true) * U64_MAX + dvI.getBigUint64(0, true);
    default: {
      let result = BigInt(0);
      const mod = count % 2;
      for (let i = count - 2; i >= mod; i -= 2) {
        result = result * U16_MAX + BigInt(dvI.getUint16(i, true));
      }
      if (mod) {
        result = result * U8_MAX + BigInt(value[0]);
      }
      return result;
    }
  }
}

// src/is/hex.ts
var HEX_PREFIX = "0x";
var REGEX_HEX_WITH_PREFIX = /^0x[0-9a-fA-F]*$/;
var REGEX_HEX_WITHOUT_PREFIX = /^[0-9a-fA-F]+$/;
function isHex(value, bitLength, ignoreLength) {
  if (typeof value !== "string") return false;
  if (value === "") return false;
  const isValidHex = REGEX_HEX_WITH_PREFIX.test(value);
  if (!isValidHex) return false;
  if (ignoreLength) return true;
  if (bitLength !== void 0 && bitLength > 0) {
    const hexValue2 = value.startsWith("0x") ? value.slice(2) : value;
    const expectedLength = Math.ceil(bitLength / 4);
    return hexValue2.length === expectedLength;
  }
  const hexValue = value.startsWith("0x") ? value.slice(2) : value;
  return hexValue.length % 2 === 0;
}

// src/hex/stripPrefix.ts
function hexStripPrefix(value) {
  if (!value || value === "0x") {
    return "";
  } else if (REGEX_HEX_WITH_PREFIX.test(value)) {
    return value.substring(2);
  } else if (REGEX_HEX_WITHOUT_PREFIX.test(value)) {
    return value;
  }
  throw new Error(`Expected hex value to convert, found '${value}'`);
}

// src/hex/toU8a.ts
var CHR = "0123456789abcdef";
var U8 = new Uint8Array(256);
var U16 = new Uint8Array(256 * 256);
for (let i = 0, count = CHR.length; i < count; i++) {
  U8[CHR[i].charCodeAt(0) | 0] = i | 0;
  if (i > 9) {
    U8[CHR[i].toUpperCase().charCodeAt(0) | 0] = i | 0;
  }
}
for (let i = 0; i < 256; i++) {
  const s = i << 8;
  for (let j = 0; j < 256; j++) {
    U16[s | j] = U8[i] << 4 | U8[j];
  }
}
function hexToU8a(value, bitLength = -1) {
  if (!value) {
    return new Uint8Array();
  }
  const stripped = hexStripPrefix(value);
  const decLength = Math.ceil(stripped.length / 2);
  const endLength = Math.ceil(
    bitLength === -1 ? decLength : bitLength / 8
  );
  const result = new Uint8Array(endLength);
  const offset = endLength > decLength ? endLength - decLength : 0;
  for (let i = offset, s = 0; i < endLength; i++, s += 2) {
    result[i] = U16[stripped.charCodeAt(s) << 8 | stripped.charCodeAt(s + 1)];
  }
  return result;
}

// src/hex/toBigInt.ts
function hexToBigInt(value, { isLe = false, isNegative = false } = {}) {
  return !value || value === "0x" ? BigInt(0) : u8aToBigInt(hexToU8a(value), { isLe, isNegative });
}

// src/is/bn.ts
function isBn(value) {
  return BN.isBN(value);
}

// src/is/toBigInt.ts
var isToBigInt = (value) => {
  return typeof value === "object" && value !== null && "toBigInt" in value;
};

// src/is/toBn.ts
var isToBn = (value) => {
  return typeof value === "object" && value !== null && "toBn" in value;
};

// src/bigint/toBigInt.ts
function nToBigInt(value) {
  if (!value) {
    return BigInt(0);
  }
  if (typeof value === "bigint") {
    return value;
  }
  if (isHex(value)) {
    return hexToBigInt(value);
  }
  if (isBn(value)) {
    return BigInt(value.toString());
  }
  if (isToBigInt(value)) {
    return value.toBigInt();
  }
  if (isToBn(value)) {
    return BigInt(value.toBn().toString());
  }
  return BigInt(value);
}

// src/u8a/index.ts
var u8a_exports = {};
__export(u8a_exports, {
  u8aConcatStrict: () => u8aConcatStrict,
  u8aEmpty: () => u8aEmpty,
  u8aEq: () => u8aEq,
  u8aFixLength: () => u8aFixLength,
  u8aToBase58: () => u8aToBase58,
  u8aToBigInt: () => u8aToBigInt,
  u8aToBn: () => u8aToBn,
  u8aToFloat: () => u8aToFloat,
  u8aToHex: () => u8aToHex,
  u8aToNumber: () => u8aToNumber,
  u8aToString: () => u8aToString,
  u8aToU8a: () => u8aToU8a
});

// src/u8a/empty.ts
function u8aEmpty(value) {
  const len = value.length | 0;
  for (let i = 0; i < len; i++) {
    if (value[i] | 0) {
      return false;
    }
  }
  return true;
}

// src/has.ts
var has_exports = {};
__export(has_exports, {
  hasBigInt: () => hasBigInt,
  hasBuffer: () => hasBuffer
});
var hasBigInt = typeof BigInt === "function" && typeof BigInt.asIntN === "function";
var hasBuffer = typeof Buffer !== "undefined" && typeof Buffer.isBuffer === "function";

// src/is/buffer.ts
function isBuffer(value) {
  return hasBuffer && !!value && typeof value === "object" && Buffer.isBuffer(value);
}

// src/is/u8a.ts
function isU8a(value) {
  return (value && value.constructor) === Uint8Array || value instanceof Uint8Array;
}

// src/string/toU8a.ts
var encoder = new TextEncoder();
function stringToU8a(value) {
  return value ? encoder.encode(value.toString()) : new Uint8Array();
}

// src/u8a/toU8a.ts
function u8aToU8a(value, strict = false) {
  if (strict && (value === null || value === void 0)) {
    throw new Error("u8aToU8a: Expected non-null, non-undefined value");
  }
  return isU8a(value) ? isBuffer(value) ? new Uint8Array(value) : value : isHex(value) ? hexToU8a(value) : Array.isArray(value) ? new Uint8Array(value) : stringToU8a(value);
}

// src/u8a/eq.ts
function u8aEq(a, b) {
  const u8aa = u8aToU8a(a);
  const u8ab = u8aToU8a(b);
  if (u8aa.length === u8ab.length) {
    const dvA = new DataView(u8aa.buffer, u8aa.byteOffset);
    const dvB = new DataView(u8ab.buffer, u8ab.byteOffset);
    const mod = u8aa.length % 4 | 0;
    const length = u8aa.length - mod | 0;
    for (let i = 0; i < length; i += 4) {
      if (dvA.getUint32(i) !== dvB.getUint32(i)) {
        return false;
      }
    }
    for (let i = length, count = u8aa.length; i < count; i++) {
      if (u8aa[i] !== u8ab[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

// src/u8a/fixLength.ts
function u8aFixLength(value, bitLength = -1, atStart = false) {
  const byteLength = Math.ceil(bitLength / 8);
  if (bitLength === -1 || value.length === byteLength) {
    return value;
  } else if (value.length > byteLength) {
    return value.subarray(0, byteLength);
  }
  const result = new Uint8Array(byteLength);
  result.set(value, atStart ? 0 : byteLength - value.length);
  return result;
}

// src/u8a/toBn.ts
function u8aToBn(value, { isLe = true, isNegative = false } = {}) {
  if (!isLe) {
    value = value.slice().reverse();
  }
  const count = value.length;
  if (isNegative && count && value[count - 1] & 128) {
    switch (count) {
      case 0:
        return new BN(0);
      case 1:
        return new BN((value[0] ^ 255) * -1 - 1);
      case 2:
        return new BN((value[0] + (value[1] << 8) ^ 65535) * -1 - 1);
      case 3:
        return new BN((value[0] + (value[1] << 8) + (value[2] << 16) ^ 16777215) * -1 - 1);
      case 4:
        return new BN((value[0] + (value[1] << 8) + (value[2] << 16) + value[3] * 16777216 ^ 4294967295) * -1 - 1);
      case 5:
        return new BN(((value[0] + (value[1] << 8) + (value[2] << 16) + value[3] * 16777216 ^ 4294967295) + (value[4] ^ 255) * 4294967296) * -1 - 1);
      case 6:
        return new BN(((value[0] + (value[1] << 8) + (value[2] << 16) + value[3] * 16777216 ^ 4294967295) + (value[4] + (value[5] << 8) ^ 65535) * 4294967296) * -1 - 1);
      default:
        return new BN(value, "le").fromTwos(count * 8);
    }
  }
  switch (count) {
    case 0:
      return new BN(0);
    case 1:
      return new BN(value[0]);
    case 2:
      return new BN(value[0] + (value[1] << 8));
    case 3:
      return new BN(value[0] + (value[1] << 8) + (value[2] << 16));
    case 4:
      return new BN(value[0] + (value[1] << 8) + (value[2] << 16) + value[3] * 16777216);
    case 5:
      return new BN(value[0] + (value[1] << 8) + (value[2] << 16) + (value[3] + (value[4] << 8)) * 16777216);
    case 6:
      return new BN(value[0] + (value[1] << 8) + (value[2] << 16) + (value[3] + (value[4] << 8) + (value[5] << 16)) * 16777216);
    default:
      return new BN(value, "le");
  }
}

// src/u8a/toFloat.ts
function u8aToFloat(value, { bitLength = 32, isLe = true } = {}) {
  if (bitLength !== 32 && bitLength !== 64) {
    throw new Error("Invalid bitLength provided, expected 32 or 64");
  } else if (value.length < bitLength / 8) {
    throw new Error(`Invalid input buffer provided, expected at least ${bitLength / 8} bytes, found ${value.length}`);
  }
  const dv = new DataView(value.buffer, value.byteOffset);
  return bitLength === 32 ? dv.getFloat32(0, isLe) : dv.getFloat64(0, isLe);
}

// src/u8a/toHex.ts
var U82 = new Array(256);
var U162 = new Array(256 * 256);
for (let n = 0; n < 256; n++) {
  U82[n] = n.toString(16).padStart(2, "0");
}
for (let i = 0; i < 256; i++) {
  const s = i << 8;
  for (let j = 0; j < 256; j++) {
    U162[s | j] = U82[i] + U82[j];
  }
}
function hex(value, result) {
  const mod = value.length % 2 | 0;
  const length = value.length - mod | 0;
  for (let i = 0; i < length; i += 2) {
    result += U162[value[i] << 8 | value[i + 1]];
  }
  if (mod) {
    result += U82[value[length] | 0];
  }
  return result;
}
function u8aToHex(value, bitLength = -1, isPrefixed = true) {
  const empty = isPrefixed ? "0x" : "";
  if (!value?.length) {
    return empty;
  } else if (bitLength > 0) {
    const length = Math.ceil(bitLength / 8);
    if (value.length > length) {
      return `${hex(value.subarray(0, length / 2), empty)}\u2026${hex(value.subarray(value.length - length / 2), "")}`;
    }
  }
  return hex(value, empty);
}

// src/u8a/toNumber.ts
function u8aToNumber(value, { isLe = true, isNegative = false } = {}) {
  if (!isLe) {
    value = value.slice().reverse();
  }
  const count = value.length;
  if (isNegative && count && value[count - 1] & 128) {
    switch (count) {
      case 0:
        return 0;
      case 1:
        return (value[0] ^ 255) * -1 - 1;
      case 2:
        return (value[0] + (value[1] << 8) ^ 65535) * -1 - 1;
      case 3:
        return (value[0] + (value[1] << 8) + (value[2] << 16) ^ 16777215) * -1 - 1;
      case 4:
        return (value[0] + (value[1] << 8) + (value[2] << 16) + value[3] * 16777216 ^ 4294967295) * -1 - 1;
      case 5:
        return ((value[0] + (value[1] << 8) + (value[2] << 16) + value[3] * 16777216 ^ 4294967295) + (value[4] ^ 255) * 4294967296) * -1 - 1;
      case 6:
        return ((value[0] + (value[1] << 8) + (value[2] << 16) + value[3] * 16777216 ^ 4294967295) + (value[4] + (value[5] << 8) ^ 65535) * 4294967296) * -1 - 1;
      default:
        throw new Error("Value more than 48-bits cannot be reliably converted");
    }
  }
  switch (count) {
    case 0:
      return 0;
    case 1:
      return value[0];
    case 2:
      return value[0] + (value[1] << 8);
    case 3:
      return value[0] + (value[1] << 8) + (value[2] << 16);
    case 4:
      return value[0] + (value[1] << 8) + (value[2] << 16) + value[3] * 16777216;
    case 5:
      return value[0] + (value[1] << 8) + (value[2] << 16) + (value[3] + (value[4] << 8)) * 16777216;
    case 6:
      return value[0] + (value[1] << 8) + (value[2] << 16) + (value[3] + (value[4] << 8) + (value[5] << 16)) * 16777216;
    default:
      throw new Error("Value more than 48-bits cannot be reliably converted");
  }
}

// src/u8a/toString.ts
var decoder = new TextDecoder();
function u8aToString(value) {
  return value ? decoder.decode(value) : "";
}

// src/u8a/concat.ts
function u8aConcatStrict(u8as, length = 0) {
  const count = u8as.length;
  let offset = 0;
  if (!length) {
    for (let i = 0; i < count; i++) {
      length += u8as[i].length;
    }
  }
  const result = new Uint8Array(length);
  for (let i = 0; i < count; i++) {
    result.set(u8as[i], offset);
    offset += u8as[i].length;
  }
  return result;
}
function toBase58(value) {
  return base58.encode(u8aToU8a(value));
}

// src/u8a/toBase58.ts
function u8aToBase58(value) {
  return toBase58(value);
}

// src/bigint/toU8a.ts
var DIV = BigInt(256);
BigInt(255);
function toU8a(value, isLe) {
  const arr = [];
  while (value !== BigInt(0)) {
    const mod = value % DIV;
    const val = Number(
      mod
    );
    if (isLe) {
      arr.push(val);
    } else {
      arr.unshift(val);
    }
    value = (value - mod) / DIV;
  }
  return Uint8Array.from(arr);
}
function nToU8a(value, { bitLength = -1, isLe = true, isNegative = false } = {}) {
  let valueBi = nToBigInt(value);
  if (valueBi === BigInt(0)) {
    return bitLength === -1 ? new Uint8Array(1) : new Uint8Array(Math.ceil((bitLength || 0) / 8));
  }
  if (isNegative && valueBi < BigInt(0)) {
    const effectiveBitLength = bitLength === -1 ? Math.ceil(valueBi.toString(2).length / 8) * 8 : bitLength;
    const twoPowN = BigInt(1) << BigInt(effectiveBitLength);
    valueBi = twoPowN + valueBi;
  }
  const u8a = toU8a(valueBi, isLe);
  if (bitLength === -1) {
    return u8a;
  }
  const byteLength = Math.ceil((bitLength || 0) / 8);
  const output = new Uint8Array(byteLength);
  const truncatedU8a = u8a.length > byteLength ? isLe ? u8a.slice(0, byteLength) : u8a.slice(u8a.length - byteLength) : u8a;
  output.set(truncatedU8a, isLe ? 0 : byteLength - truncatedU8a.length);
  return output;
}

// src/bigint/toHex.ts
function nToHex(value, { bitLength = -1, isLe = false, isNegative = false } = {}) {
  return u8aToHex(nToU8a(value || 0, { bitLength, isLe, isNegative }));
}

// src/bn/index.ts
var bn_exports = {};
__export(bn_exports, {
  BN: () => BN,
  BN_BILLION: () => BN_BILLION,
  BN_EIGHT: () => BN_EIGHT,
  BN_FIVE: () => BN_FIVE,
  BN_FOUR: () => BN_FOUR,
  BN_HUNDRED: () => BN_HUNDRED,
  BN_MAX_INTEGER: () => BN_MAX_INTEGER,
  BN_MILLION: () => BN_MILLION,
  BN_NINE: () => BN_NINE,
  BN_ONE: () => BN_ONE,
  BN_QUINTILL: () => BN_QUINTILL,
  BN_SEVEN: () => BN_SEVEN,
  BN_SIX: () => BN_SIX,
  BN_SQRT_MAX_INTEGER: () => BN_SQRT_MAX_INTEGER,
  BN_TEN: () => BN_TEN,
  BN_THOUSAND: () => BN_THOUSAND,
  BN_THREE: () => BN_THREE,
  BN_TWO: () => BN_TWO,
  BN_ZERO: () => BN_ZERO,
  bnToBn: () => bnToBn,
  bnToHex: () => bnToHex,
  bnToU8a: () => bnToU8a
});

// src/hex/toBn.ts
function hexToBn(value, { isLe = false, isNegative = false } = {}) {
  if (!value || value === "0x") {
    return new BN(0);
  }
  const stripped = hexStripPrefix(value);
  const bn = new BN(stripped, 16, isLe ? "le" : "be");
  return isNegative ? bn.fromTwos(stripped.length * 4) : bn;
}

// src/is/bigint.ts
function isBigInt(value) {
  return typeof value === "bigint";
}

// src/bn/toBn.ts
function bnToBn(value) {
  return value ? BN.isBN(value) ? value : isHex(value) ? hexToBn(value.toString()) : isBigInt(value) ? new BN(value.toString()) : isToBn(value) ? value.toBn() : isToBigInt(value) ? new BN(value.toBigInt().toString()) : new BN(value) : new BN(0);
}

// src/bn/toU8a.ts
var DEFAULT_OPTS = { bitLength: -1, isLe: true, isNegative: false };
function bnToU8a(value, options = DEFAULT_OPTS) {
  return nToU8a(bnToBn(value), options);
}

// src/bn/toHex.ts
function bnToHex(value, { bitLength = -1, isLe = false, isNegative = false } = {}) {
  return u8aToHex(bnToU8a(value, { bitLength, isLe, isNegative }));
}

// src/bn/consts.ts
var BN_ZERO = /* @__PURE__ */ new BN(0);
var BN_ONE = /* @__PURE__ */ new BN(1);
var BN_TWO = /* @__PURE__ */ new BN(2);
var BN_THREE = /* @__PURE__ */ new BN(3);
var BN_FOUR = /* @__PURE__ */ new BN(4);
var BN_FIVE = /* @__PURE__ */ new BN(5);
var BN_SIX = /* @__PURE__ */ new BN(6);
var BN_SEVEN = /* @__PURE__ */ new BN(7);
var BN_EIGHT = /* @__PURE__ */ new BN(8);
var BN_NINE = /* @__PURE__ */ new BN(9);
var BN_TEN = /* @__PURE__ */ new BN(10);
var BN_HUNDRED = /* @__PURE__ */ new BN(100);
var BN_THOUSAND = /* @__PURE__ */ new BN(1e3);
var BN_MILLION = /* @__PURE__ */ new BN(1e6);
var BN_BILLION = /* @__PURE__ */ new BN(1e9);
var BN_QUINTILL = BN_BILLION.mul(BN_BILLION);
var BN_MAX_INTEGER = /* @__PURE__ */ new BN(Number.MAX_SAFE_INTEGER);
var BN_SQRT_MAX_INTEGER = /* @__PURE__ */ new BN(94906265);

// src/buffer/index.ts
var buffer_exports = {};
__export(buffer_exports, {
  bufferToU8a: () => bufferToU8a
});

// src/buffer/toU8a.ts
function bufferToU8a(buffer) {
  return new Uint8Array(buffer ?? []);
}

// src/compact/index.ts
var compact_exports = {};
__export(compact_exports, {
  compactAddLength: () => compactAddLength,
  compactFromU8a: () => compactFromU8a,
  compactFromU8aLim: () => compactFromU8aLim,
  compactStripLength: () => compactStripLength,
  compactToU8a: () => compactToU8a
});

// src/compact/toU8a.ts
var MAX_U8 = BN_TWO.pow(new BN(8 - 2)).isub(BN_ONE);
var MAX_U16 = BN_TWO.pow(new BN(16 - 2)).isub(BN_ONE);
var MAX_U32 = BN_TWO.pow(new BN(32 - 2)).isub(BN_ONE);
var BL_16 = { bitLength: 16 };
var BL_32 = { bitLength: 32 };
function compactToU8a(value) {
  const bn = bnToBn(value);
  if (bn.lte(MAX_U8)) {
    return new Uint8Array([bn.toNumber() << 2]);
  } else if (bn.lte(MAX_U16)) {
    return bnToU8a(bn.shln(2).iadd(BN_ONE), BL_16);
  } else if (bn.lte(MAX_U32)) {
    return bnToU8a(bn.shln(2).iadd(BN_TWO), BL_32);
  }
  const u8a = bnToU8a(bn);
  let length = u8a.length;
  while (u8a[length - 1] === 0) {
    length--;
  }
  if (length < 4) {
    throw new Error("Invalid length, previous checks match anything less than 2^30");
  }
  return u8aConcatStrict([
    // subtract 4 as minimum (also catered for in decoding)
    new Uint8Array([(length - 4 << 2) + 3]),
    u8a.subarray(0, length)
  ]);
}

// src/compact/addLength.ts
function compactAddLength(input) {
  return u8aConcatStrict([
    compactToU8a(input.length),
    input
  ]);
}

// src/compact/fromU8a.ts
function compactFromU8a(input) {
  const u8a = u8aToU8a(input);
  switch (u8a[0] & 3) {
    case 0:
      return [1, new BN(u8a[0] >>> 2)];
    case 1:
      return [2, new BN(u8a[0] + (u8a[1] << 8) >>> 2)];
    case 2:
      return [4, new BN(u8a[0] + (u8a[1] << 8) + (u8a[2] << 16) + u8a[3] * 16777216 >>> 2)];
    // 0b11
    default: {
      const offset = (u8a[0] >>> 2) + 5;
      switch (offset) {
        // there still could be 4 bytes data, similar to 0b10 above (with offsets)
        case 5:
          return [5, new BN(u8a[1] + (u8a[2] << 8) + (u8a[3] << 16) + u8a[4] * 16777216)];
        case 6:
          return [6, new BN(u8a[1] + (u8a[2] << 8) + (u8a[3] << 16) + (u8a[4] + (u8a[5] << 8)) * 16777216)];
        // 6 bytes data is the maximum, 48 bits (56 would overflow)
        case 7:
          return [7, new BN(u8a[1] + (u8a[2] << 8) + (u8a[3] << 16) + (u8a[4] + (u8a[5] << 8) + (u8a[6] << 16)) * 16777216)];
        // for anything else, use the non-unrolled version
        default:
          return [offset, u8aToBn(u8a.subarray(1, offset))];
      }
    }
  }
}
function compactFromU8aLim(u8a) {
  switch (u8a[0] & 3) {
    case 0:
      return [1, u8a[0] >>> 2];
    case 1:
      return [2, u8a[0] + (u8a[1] << 8) >>> 2];
    case 2:
      return [4, u8a[0] + (u8a[1] << 8) + (u8a[2] << 16) + u8a[3] * 16777216 >>> 2];
    // 0b11
    default: {
      switch ((u8a[0] >>> 2) + 5) {
        // there still could be 4 bytes data, similar to 0b10 above (with offsets)
        case 5:
          return [5, u8a[1] + (u8a[2] << 8) + (u8a[3] << 16) + u8a[4] * 16777216];
        case 6:
          return [6, u8a[1] + (u8a[2] << 8) + (u8a[3] << 16) + (u8a[4] + (u8a[5] << 8)) * 16777216];
        // 6 bytes data is the maximum, 48 bits (56 would overflow)
        case 7:
          return [7, u8a[1] + (u8a[2] << 8) + (u8a[3] << 16) + (u8a[4] + (u8a[5] << 8) + (u8a[6] << 16)) * 16777216];
        // for anything else, we are above the actual MAX_SAFE_INTEGER - bail out
        default:
          throw new Error("Compact input is > Number.MAX_SAFE_INTEGER");
      }
    }
  }
}

// src/compact/stripLength.ts
function compactStripLength(input) {
  const [offset, length] = compactFromU8a(input);
  const total = offset + length.toNumber();
  return [
    total,
    input.subarray(offset, total)
  ];
}

// src/float/index.ts
var float_exports = {};
__export(float_exports, {
  floatToU8a: () => floatToU8a
});

// src/float/toU8a.ts
function floatToU8a(value = 0, { bitLength = 32, isLe = true } = {}) {
  if (bitLength !== 32 && bitLength !== 64) {
    throw new Error("Invalid bitLength provided, expected 32 or 64");
  }
  const result = new Uint8Array(bitLength / 8);
  const dv = new DataView(result.buffer, result.byteOffset);
  if (bitLength === 32) {
    dv.setFloat32(0, Number(value), isLe);
  } else {
    dv.setFloat64(0, Number(value), isLe);
  }
  return result;
}

// src/hex/index.ts
var hex_exports = {};
__export(hex_exports, {
  addHexPrefix: () => addHexPrefix,
  hexFixLength: () => hexFixLength,
  hexHasPrefix: () => hexHasPrefix,
  hexStripPrefix: () => hexStripPrefix,
  hexToBigInt: () => hexToBigInt,
  hexToBn: () => hexToBn,
  hexToNumber: () => hexToNumber,
  hexToString: () => hexToString,
  hexToU8a: () => hexToU8a
});

// src/hex/hasPrefix.ts
function hexHasPrefix(value) {
  if (typeof value !== "string") return false;
  return value.startsWith(HEX_PREFIX);
}

// src/hex/addPrefix.ts
function addHexPrefix(value) {
  if (hexHasPrefix(value)) return value;
  if (typeof value === "number") return `0x${value.toString(16)}`;
  if (typeof value === "string") return `0x${value && value.length % 2 === 1 ? "0" : ""}${value || ""}`;
  return "";
}

// src/hex/fixLength.ts
function hexFixLength(value, bitLength = -1, withPadding = false) {
  const strLength = Math.ceil(bitLength / 4);
  const hexLength = strLength + 2;
  return addHexPrefix(
    bitLength === -1 || value.length === hexLength || !withPadding && value.length < hexLength ? hexStripPrefix(value) : value.length > hexLength ? hexStripPrefix(value).slice(-1 * strLength) : `${"0".repeat(strLength)}${hexStripPrefix(value)}`.slice(-1 * strLength)
  );
}

// src/hex/toNumber.ts
function hexToNumber(value) {
  if (!value) {
    return NaN;
  }
  const stripped = hexStripPrefix(value);
  const isNegative = stripped.length > 0 && parseInt(stripped[0], 16) >= 8;
  return hexToBn(value, { isNegative }).toNumber();
}

// src/hex/toString.ts
function hexToString(_value) {
  return u8aToString(
    hexToU8a(_value)
  );
}

// src/is/index.ts
var is_exports = {};
__export(is_exports, {
  isArray: () => isArray,
  isAscii: () => isAscii,
  isBigInt: () => isBigInt,
  isBn: () => isBn,
  isBoolean: () => isBoolean,
  isBuffer: () => isBuffer,
  isError: () => isError,
  isFunction: () => isFunction,
  isHex: () => isHex,
  isJsonObject: () => isJsonObject,
  isNull: () => isNull,
  isNumber: () => isNumber,
  isNumberLike: () => isNumberLike,
  isObject: () => isObject,
  isString: () => isString,
  isToBigInt: () => isToBigInt,
  isToBn: () => isToBn,
  isU8a: () => isU8a,
  isUndefined: () => isUndefined,
  isUtf8: () => isUtf8
});

// src/is/array.ts
function isArray(value) {
  return Array.isArray(value);
}

// src/is/string.ts
function isString(value) {
  return typeof value === "string" || value instanceof String;
}

// src/is/ascii.ts
function isAsciiStr(str) {
  for (let i = 0, count = str.length; i < count; i++) {
    const b = str.charCodeAt(i);
    if (b < 32 || b > 126) {
      return false;
    }
  }
  return true;
}
function isAsciiBytes(u8a) {
  for (let i = 0, count = u8a.length; i < count; i++) {
    const b = u8a[i] | 0;
    if (b < 32 || b > 126) {
      return false;
    }
  }
  return true;
}
function isAscii(value) {
  return isString(value) ? isHex(value) ? isAsciiBytes(u8aToU8a(value)) : isAsciiStr(value) : value ? isAsciiBytes(value) : false;
}

// src/is/boolean.ts
function isBoolean(value) {
  return typeof value === "boolean";
}

// src/is/error.ts
function isError(value) {
  return (value && value.constructor) === Error || value instanceof Error;
}

// src/is/function.ts
function isFunction(value) {
  return typeof value === "function";
}

// src/stringify.ts
function stringify(value, space) {
  return JSON.stringify(value, (_, v) => isBigInt(v) ? v.toString() : v, space);
}

// src/is/jsonObject.ts
function isJsonObject(value) {
  const str = typeof value !== "string" ? stringify(value) : value;
  try {
    const obj = JSON.parse(str);
    return typeof obj === "object" && obj !== null;
  } catch {
    return false;
  }
}

// src/is/null.ts
function isNull(value) {
  return value === null;
}

// src/is/number.ts
function isNumber(value) {
  return typeof value === "number";
}
var isNumberLike = (value) => {
  if (typeof value === "number") return true;
  if (typeof value === "string") return !isNaN(Number(value));
  if (typeof value === "bigint") return !isNaN(Number(value));
  return false;
};

// src/is/object.ts
function isObject(value) {
  return !!value && typeof value === "object";
}

// src/is/undefined.ts
function isUndefined(value) {
  return value === void 0;
}

// src/is/utf8.ts
function isUtf8(value) {
  if (!value) {
    return isString(value);
  }
  const u8a = u8aToU8a(value);
  const len = u8a.length;
  let i = 0;
  while (i < len) {
    if (u8a[i] <= 127) {
      i += 1;
    } else if (u8a[i] >= 194 && u8a[i] <= 223) {
      if (i + 1 < len) {
        if (u8a[i + 1] < 128 || u8a[i + 1] > 191) {
          return false;
        }
      } else {
        return false;
      }
      i += 2;
    } else if (u8a[i] === 224) {
      if (i + 2 < len) {
        if (u8a[i + 1] < 160 || u8a[i + 1] > 191) {
          return false;
        }
        if (u8a[i + 2] < 128 || u8a[i + 2] > 191) {
          return false;
        }
      } else {
        return false;
      }
      i += 3;
    } else if (u8a[i] >= 225 && u8a[i] <= 236) {
      if (i + 2 < len) {
        if (u8a[i + 1] < 128 || u8a[i + 1] > 191) {
          return false;
        }
        if (u8a[i + 2] < 128 || u8a[i + 2] > 191) {
          return false;
        }
      } else {
        return false;
      }
      i += 3;
    } else if (u8a[i] === 237) {
      if (i + 2 < len) {
        if (u8a[i + 1] < 128 || u8a[i + 1] > 159) {
          return false;
        }
        if (u8a[i + 2] < 128 || u8a[i + 2] > 191) {
          return false;
        }
      } else {
        return false;
      }
      i += 3;
    } else if (u8a[i] >= 238 && u8a[i] <= 239) {
      if (i + 2 < len) {
        if (u8a[i + 1] < 128 || u8a[i + 1] > 191) {
          return false;
        }
        if (u8a[i + 2] < 128 || u8a[i + 2] > 191) {
          return false;
        }
      } else {
        return false;
      }
      i += 3;
    } else if (u8a[i] === 240) {
      if (i + 3 < len) {
        if (u8a[i + 1] < 144 || u8a[i + 1] > 191) {
          return false;
        }
        if (u8a[i + 2] < 128 || u8a[i + 2] > 191) {
          return false;
        }
        if (u8a[i + 3] < 128 || u8a[i + 3] > 191) {
          return false;
        }
      } else {
        return false;
      }
      i += 4;
    } else if (u8a[i] >= 241 && u8a[i] <= 243) {
      if (i + 3 < len) {
        if (u8a[i + 1] < 128 || u8a[i + 1] > 191) {
          return false;
        }
        if (u8a[i + 2] < 128 || u8a[i + 2] > 191) {
          return false;
        }
        if (u8a[i + 3] < 128 || u8a[i + 3] > 191) {
          return false;
        }
      } else {
        return false;
      }
      i += 4;
    } else if (u8a[i] === 244) {
      if (i + 3 < len) {
        if (u8a[i + 1] < 128 || u8a[i + 1] > 143) {
          return false;
        }
        if (u8a[i + 2] < 128 || u8a[i + 2] > 191) {
          return false;
        }
        if (u8a[i + 3] < 128 || u8a[i + 3] > 191) {
          return false;
        }
      } else {
        return false;
      }
      i += 4;
    } else {
      return false;
    }
  }
  return true;
}

// src/number/index.ts
var number_exports = {};
__export(number_exports, {
  numberToHex: () => numberToHex,
  numberToU8a: () => numberToU8a
});

// src/number/toHex.ts
function numberToHex(value, bitLength = -1) {
  if (!value || Number.isNaN(value)) {
    return hexFixLength("0", bitLength, true);
  }
  let hex2;
  if (value < 0) {
    const effectiveBitLength = bitLength === -1 ? Math.ceil(Math.log2(Math.abs(value) + 1) / 8) * 8 : bitLength;
    const twoPowN = 1 << effectiveBitLength;
    hex2 = (twoPowN + value).toString(16);
  } else {
    hex2 = value.toString(16);
  }
  return hexFixLength(hex2.length % 2 ? `0${hex2}` : hex2, bitLength, true);
}

// src/number/toU8a.ts
function numberToU8a(value, bitLength = -1) {
  return hexToU8a(
    numberToHex(value, bitLength),
    bitLength
  );
}

// src/base58/index.ts
var base58_exports = {};
__export(base58_exports, {
  base58ToU8a: () => base58ToU8a,
  toBase58: () => toBase58
});
function base58ToU8a(value) {
  return base58.decode(value);
}

// src/base64/index.ts
var base64_exports = {};
__export(base64_exports, {
  base64ToU8a: () => base64ToU8a,
  toBase64: () => toBase64
});
function toBase64(value) {
  return base64.encode(u8aToU8a(value));
}
function base64ToU8a(value) {
  return base64.decode(value);
}

// src/string/index.ts
var string_exports = {};
__export(string_exports, {
  stringToHex: () => stringToHex,
  stringToU8a: () => stringToU8a
});

// src/string/toHex.ts
function stringToHex(value) {
  return u8aToHex(
    stringToU8a(value)
  );
}

// src/types.ts
var types_exports = {};

// src/u8a/toBase64.ts
function u8aToBase64(value) {
  return toBase64(u8aToU8a(value));
}

export { array_exports as array, base58_exports as base58, base58ToU8a, base64_exports as base64, base64ToU8a, bigint_exports as bigint, bn_exports as bn, buffer_exports as buffer, compact_exports as compact, float_exports as float, has_exports as has, hex_exports as hex, is_exports as is, number_exports as number, string_exports as string, types_exports as types, u8a_exports as u8a, u8aToBase58, u8aToBase64 };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map