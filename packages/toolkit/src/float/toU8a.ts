interface Options {
  bitLength?: 32 | 64;
  isLe?: boolean;
}

export function floatToU8a(value: String | string | number | Number = 0.0, { bitLength = 32, isLe = true }: Options = {}): Uint8Array {
  if (bitLength !== 32 && bitLength !== 64) {
    throw new Error('Invalid bitLength provided, expected 32 or 64');
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
