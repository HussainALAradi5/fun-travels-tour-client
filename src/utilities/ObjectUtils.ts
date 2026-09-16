export const typedEntries = <T extends object>(value: T) =>
  Object.entries(value) as Array<{
    [K in keyof T]-?: [K, T[K]];
  }[keyof T]>;
