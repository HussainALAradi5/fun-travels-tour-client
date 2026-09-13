const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const getValueAtPath = (
  source: Record<string, unknown>,
  path: string,
): unknown => path.split(".").reduce<unknown>((current, key) =>
  isRecord(current) ? current[key] : undefined, source);

export const setValueAtPath = <T extends Record<string, unknown>>(
  source: T,
  path: string,
  value: unknown,
): T => {
  const keys = path.split(".");
  const result: Record<string, unknown> = { ...source };
  let current = result;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
      return;
    }

    const child = isRecord(current[key]) ? { ...current[key] } : {};
    current[key] = child;
    current = child;
  });

  return result as T;
};
