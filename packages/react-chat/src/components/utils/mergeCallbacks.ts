/**
 * TODO - replace this with Fluent UI utility
 * https://github.com/microsoft/fluentui/pull/28428
 */
export function mergeCallbacks<Args extends unknown[]>(
  callback1: ((...args: Args) => void) | undefined,
  callback2: ((...args: Args) => void) | undefined
): (...args: Args) => void {
  return (...args: Args) => {
    callback1?.(...args);
    callback2?.(...args);
  };
}
