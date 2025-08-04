export function isObject<T = unknown>(value?: unknown): value is T {
  return !!value && typeof value === 'object';
}
