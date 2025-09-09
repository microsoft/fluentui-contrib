// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  return Object.keys(obj).reduce((result, key) => {
    if (!keys.includes(key as K)) {
      (result as T)[key as K] = obj[key];
    }
    return result;
  }, {} as Omit<T, K>);
};
