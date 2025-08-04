import { describe, expect, it } from 'vitest';
import { u8aEmpty } from './index.js';

describe('u8aEmpty', (): void => {
  it('returns true on zero length', (): void => {
    expect(
      u8aEmpty(new Uint8Array())
    ).toEqual(true);
  });

  it('returns true on all zero values', (): void => {
    expect(
      u8aEmpty(new Uint8Array([0, 0, 0, 0, 0, 0]))
    ).toEqual(true);
  });

  it('returns false when value is found', (): void => {
    expect(
      u8aEmpty(new Uint8Array([0, 0, 0, 0, 0, 1]))
    ).toEqual(false);
  });

  it('returns false when value is found (256)', (): void => {
    const test = new Uint8Array(256);

    expect(
      u8aEmpty(test)
    ).toEqual(true);

    test[128] = 1;

    expect(
      u8aEmpty(test)
    ).toEqual(false);
  });

});
