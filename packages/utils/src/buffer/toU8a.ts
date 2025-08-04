export function bufferToU8a(buffer?: Uint8Array | number[] | null): Uint8Array {
  return new Uint8Array(buffer ?? []);
}
