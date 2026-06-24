import { CAPTokens } from './types';

/**
 * Default values for the CAP-specific design tokens (the ones Fluent v9 doesn't
 * ship yet). These defaults are baked into the CAP style hooks (see `capTokens`)
 * as CSS-variable fallbacks, so consumers don't have to set them by default.
 *
 * Override a value by defining the matching theme token on your `FluentProvider`
 * theme — that emits the CSS variable, which takes precedence over the fallback.
 * To override several at once, spread these onto your base theme:
 *
 * ```tsx
 * const capTheme = { ...webLightTheme, ...CAP_THEME_TOKENS };
 * ```
 */
export const CAP_THEME_TOKENS: Record<keyof CAPTokens, string> = {
  borderRadius2XLarge: '12px',
  borderRadius3XLarge: '16px',
  borderRadius4XLarge: '24px',
  colorNeutralStroke4: '#ebebeb',
  colorNeutralStroke4Hover: '#e0e0e0',
  colorNeutralStroke4Pressed: '#d6d6d6',
  colorNeutralStroke4Selected: '#ebebeb',
  colorNeutralForeground5: '#616161',
  colorNeutralForeground5Hover: '#242424',
  colorNeutralForeground5Pressed: '#242424',
};

/**
 * The CAP tokens as CSS-variable references for use inside style hooks. Each one
 * carries its {@link CAP_THEME_TOKENS} default as a fallback, so the hooks work
 * even when the consumer hasn't defined the token on their theme; defining it
 * (e.g. via `CAP_THEME_TOKENS`) overrides the fallback.
 */
export const capTokens: Record<keyof CAPTokens, string> = Object.fromEntries(
  (Object.keys(CAP_THEME_TOKENS) as (keyof CAPTokens)[]).map((key) => [
    key,
    `var(--${key}, ${CAP_THEME_TOKENS[key]})`,
  ])
) as Record<keyof CAPTokens, string>;
