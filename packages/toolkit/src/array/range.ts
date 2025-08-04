export function range(size: number, startAt = 0): number[] {
  if (size <= 0) {
    throw new Error('Expected non-zero, positive number as a range size');
  }

  const result = new Array<number>(size);

  for (let i = 0; i < size; i++) {
    result[i] = i + startAt;
  }

  return result;
}
