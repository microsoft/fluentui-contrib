import { FluentProviderProps } from '@fluentui/react-components';

type StyleHooks = NonNullable<
  FluentProviderProps['customStyleHooks_unstable']
>;

type StyleHook = (state: unknown) => unknown;

/**
 * Composes several `customStyleHooks_unstable` registries into one, so you can
 * opt into individual facets of the CAP design language (e.g. rounded corners)
 * and layer them together — or layer them on top of your own custom hooks.
 *
 * Registries are applied in array order. When more than one registry defines a
 * hook for the same component, the hooks are *composed* (each runs in turn,
 * receiving the state returned by the previous) rather than the later one
 * replacing the earlier — which is what a plain `{ ...a, ...b }` (and Fluent's
 * own provider nesting) would do. Because each hook appends its classes via
 * `mergeClasses`, later registries win wherever two facets touch the same CSS
 * property.
 *
 * @example
 * ```tsx
 * const styleHooks = mergeStyleHooks([
 *   CAP_STYLE_HOOKS_ROUNDED_CORNERS,
 *   myCustomStyleHooks,
 * ]);
 *
 * <FluentProvider customStyleHooks_unstable={styleHooks}>
 *   {/* ... *\/}
 * </FluentProvider>
 * ```
 */
export function mergeStyleHooks(registries: StyleHooks[]): StyleHooks {
  const merged: Record<string, StyleHook> = {};

  for (const registry of registries) {
    for (const [key, hook] of Object.entries(registry)) {
      const previous = merged[key];
      const next = hook as StyleHook;
      merged[key] = previous
        ? (state) => next(previous(state))
        : next;
    }
  }

  return merged as StyleHooks;
}
