import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { hasBuffer } from './has.js';

describe('hasBuffer', (): void => {
  it('has Buffer (Vitest + Node.js)', (): void => {
    expect(hasBuffer).toEqual(true);
  });

  it('should detect Buffer availability correctly', (): void => {
    expect(typeof Buffer).toBe('function');
    expect(hasBuffer).toBe(true);
  });

  it('should work with Buffer instances', (): void => {
    if (hasBuffer) {
      const testData = faker.string.alphanumeric(10);
      const buffer = Buffer.from(testData);

      expect(buffer).toBeInstanceOf(Buffer);
    }
  });
});
