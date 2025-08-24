import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { stringify } from '../stringify.js';
import { shuffle } from './shuffle.js';

describe('arrayShuffle', (): void => {
  it('returns an empty array as-is', (): void => {
    expect(shuffle([])).toEqual([]);
  });

  it('returns a single array as-is', (): void => {
    const value = faker.number.int();

    expect(shuffle([value])).toEqual([value]);
  });

  it('shuffles an array', (): void => {
    const size = faker.number.int({ max: 100, min: 2 });
    const inp = Array.from({ length: size }, (_, i) => i);
    const out = shuffle(inp.slice());

    expect(inp).toHaveLength(out.length);
    expect(inp.filter(v => !out.includes(v))).toEqual([]);
    expect(stringify(inp)).not.toEqual(stringify(out));
  });

  it('should return a shuffled array of faker generated numbers', () => {
    const size = faker.number.int({ max: 100, min: 2 });
    const originalArray = Array.from({ length: size }, () =>
      faker.string.uuid(),
    );
    const shuffledArray = shuffle(originalArray);

    expect(shuffledArray).toHaveLength(originalArray.length);
    expect(shuffledArray.sort()).toEqual(originalArray.sort());
  });
});
