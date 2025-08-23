import type { ToBn } from '../types.js';

export const isToBn = (value: unknown): value is ToBn => {
  return typeof value === 'object' && value !== null && 'toBn' in value;
};
