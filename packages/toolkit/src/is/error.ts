export function isError(value: unknown): value is Error {
  return (
    (value && (value as Error).constructor) === Error || value instanceof Error
  );
}
