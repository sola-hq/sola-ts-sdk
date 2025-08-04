import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import { range } from './range.js';

describe('arrayRange', (): void => {
  it('does not allow 0 values', (): void => {
    expect(() => range(0)).toThrow(/Expected non-zero, positive number as a range size/);
  });

  it('creates a range of the specified length', (): void => {
    expect(range(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('creates a range of the specified length, with offset', (): void => {
    expect(range(4, 3)).toEqual([3, 4, 5, 6]);
  });

  it('should handle faker generated sizes', (): void => {
    const size = faker.number.int({ min: 1, max: 10 });
    const result = range(size);
    expect(result.length).toBe(size);
    expect(result[0]).toBe(0);
    expect(result[result.length - 1]).toBe(size - 1);
  });

  it('should handle faker generated offsets', (): void => {
    const size = faker.number.int({ min: 1, max: 5 });
    const offset = faker.number.int({ min: 1, max: 10 });
    const result = range(size, offset);
    expect(result.length).toBe(size);
    expect(result[0]).toBe(offset);
    expect(result[result.length - 1]).toBe(offset + size - 1);
  });
});
