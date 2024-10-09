export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
) => {
  return Object.keys(obj).reduce((result, key) => {
    if (!keys.includes(key as K)) {
      (result as T)[key as K] = obj[key];
    }
    return result;
  }, {} as Omit<T, K>);
};
