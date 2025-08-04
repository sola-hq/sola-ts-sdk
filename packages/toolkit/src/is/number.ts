export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export const isNumberLike = (value: unknown): value is number => {
  if (typeof value === 'number') return true;
  if (typeof value === 'string') return !isNaN(Number(value));
  if (typeof value === 'bigint') return !isNaN(Number(value));
  return false;
}