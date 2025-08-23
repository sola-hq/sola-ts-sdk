export const HEX_PREFIX = '0x';

export const REGEX_HEX_WITH_PREFIX = /^0x[0-9a-fA-F]*$/;

export const REGEX_HEX_WITHOUT_PREFIX = /^[0-9a-fA-F]+$/;

export const REGEX_HEX_WITH_MIXED_PREFIX = /^(0x)?[0-9a-fA-F]+$/;

export function isHex(
  value: unknown,
  bitLength?: number,
  ignoreLength?: boolean,
): value is string {
  if (typeof value !== 'string') return false;

  if (value === '') return false;

  const isValidHex = REGEX_HEX_WITH_PREFIX.test(value);

  if (!isValidHex) return false;

  // If ignoreLength is true, don't check bitLength
  if (ignoreLength) return true;

  // If bitLength is provided, check the length
  if (bitLength !== undefined && bitLength > 0) {
    const hexValue = value.startsWith('0x') ? value.slice(2) : value;
    const expectedLength = Math.ceil(bitLength / 4);

    return hexValue.length === expectedLength;
  }

  // If no bitLength specified, check if hex string length is even
  const hexValue = value.startsWith('0x') ? value.slice(2) : value;

  return hexValue.length % 2 === 0;
}
