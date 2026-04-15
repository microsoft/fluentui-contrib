import { FluentProviderProps } from '@fluentui/react-components';

type StyleHooks = NonNullable<FluentProviderProps['customStyleHooks_unstable']>;

export function mergeStyleHooks(
  baseHooks: StyleHooks,
  overrideHooks: StyleHooks
): StyleHooks {
  const mergedHooks: StyleHooks = {};
  for (const [_key, baseHookFn] of Object.entries(baseHooks)) {
    const key = _key as keyof StyleHooks;
    const overrideHookFn = overrideHooks[key];
    if (overrideHookFn) {
      mergedHooks[key] = (state: unknown) => {
        baseHookFn(state);
        overrideHookFn(state);
      };
    } else {
      mergedHooks[key] = baseHookFn;
    }
  }
  return mergedHooks;
}
