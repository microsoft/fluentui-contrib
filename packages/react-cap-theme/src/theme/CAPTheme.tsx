import { tokens } from '@fluentui/react-components';

type TokenType = 'color' | 'dimension';

export interface TokenSchema {
  type: TokenType;
}

type AllowedTokenName =
  // This token does not exist in semantic tokens and is new to CAP.
  | `cap/${string}`
  // This token exists in semantic tokens v1
  | `smtc/v1/${string}`
  // This token exists in semantic tokens v2
  | `smtc/v2/${string}`
  // This token doesn't follow any known structure and needs to be fixed.
  | `fixme/${string}`;

export function formatCAPTokenCssVar(varName: string): string {
  return varName.replace(/\//g, '\\/');
}

/**
 * Extensions to existing fluent tokens (we expect these to be pushed upstream to fluent core).
 */
const tokensExt = {
  borderRadius2XLarge: '12px',
} as const satisfies Record<string, string>;

const GlobalTokens = {
  'fixme/global/ctrl/corner/rest': { type: 'dimension' },
} as const satisfies Record<AllowedTokenName, TokenSchema>;

const BadgeTokens = {
  'fixme/ctrl/badge/color-brand-foreground-compound': { type: 'color' },
} as const satisfies Record<AllowedTokenName, TokenSchema>;

const ButtonTokens = {
  'fixme/ctrl/button/corner-radius': { type: 'dimension' },
  'fixme/ctrl/button/primary-background-color': { type: 'color' },
  'fixme/ctrl/button/primary-background-color-hover': { type: 'color' },
  'fixme/ctrl/button/secondary-background-color': { type: 'color' },
  'fixme/ctrl/button/secondary-background-color-hover': { type: 'color' },
  'fixme/ctrl/button/subtle-background-color': { type: 'color' },
  'fixme/ctrl/button/subtle-background-color-hover': { type: 'color' },
  'fixme/ctrl/button/outline-background-color': { type: 'color' },
  'fixme/ctrl/button/outline-background-color-hover': { type: 'color' },
  'fixme/ctrl/button/tint-background-color': { type: 'color' },
  'fixme/ctrl/button/tint-background-color-hover': { type: 'color' },
} as const satisfies Record<AllowedTokenName, TokenSchema>;

const CardTokens = {
  'fixme/ctrl/card/background-color': { type: 'color' },
  'fixme/ctrl/card/foreground-color': { type: 'color' },
  'fixme/ctrl/card/background-color-hover': { type: 'color' },
  'fixme/ctrl/card/foreground-color-hover': { type: 'color' },
  'fixme/ctrl/card/background-color-pressed': { type: 'color' },
  'fixme/ctrl/card/foreground-color-pressed': { type: 'color' },
  'fixme/ctrl/card/background-color-disabled': { type: 'color' },
  'fixme/ctrl/card/foreground-color-disabled': { type: 'color' },
  'fixme/ctrl/card/corner-radius': { type: 'dimension' },
  'fixme/ctrl/card/header-padding-outside': { type: 'dimension' },
  'fixme/ctrl/card/header-padding-inside': { type: 'dimension' },
  'fixme/ctrl/card/footer-horizontal-gap': { type: 'dimension' },
} as const satisfies Record<AllowedTokenName, TokenSchema>;

const DialogTokens = {} as const satisfies Record<
  AllowedTokenName,
  TokenSchema
>;

const InputTokens = {} as const satisfies Record<AllowedTokenName, TokenSchema>;

const MenuTokens = {} as const satisfies Record<AllowedTokenName, TokenSchema>;

const TooltipTokens = {} as const satisfies Record<
  AllowedTokenName,
  TokenSchema
>;

export const CAPTokensSchema = {
  ...GlobalTokens,
  ...BadgeTokens,
  ...ButtonTokens,
  ...CardTokens,
  ...DialogTokens,
  ...InputTokens,
  ...MenuTokens,
  ...TooltipTokens,
} as const satisfies { [key: AllowedTokenName]: TokenSchema };

export const CAP_TOKENS = Object.keys(CAPTokensSchema).reduce((acc, key) => {
  return { ...acc, [key]: `var(--${formatCAPTokenCssVar(key)})` };
}, {} as Record<keyof typeof CAPTokensSchema, string>);

export type CAPTheme = {
  [k in keyof typeof CAP_TOKENS]: string | null;
};

export const CAP_THEME_DEFAULTS = {
  ...tokensExt,

  // globals
  'fixme/global/ctrl/corner/rest': tokensExt.borderRadius2XLarge,

  // badge
  // TODO: switch to BrandForegroundCompound when available
  'fixme/ctrl/badge/color-brand-foreground-compound':
    tokens.colorBrandForeground1,

  // button
  'fixme/ctrl/button/corner-radius':
    CAP_TOKENS['fixme/global/ctrl/corner/rest'],
  'fixme/ctrl/button/primary-background-color': tokens.colorBrandBackground,
  'fixme/ctrl/button/primary-background-color-hover':
    tokens.colorBrandBackgroundHover,
  'fixme/ctrl/button/secondary-background-color': null,
  'fixme/ctrl/button/secondary-background-color-hover': null,
  'fixme/ctrl/button/subtle-background-color': tokens.colorBrandBackground,
  'fixme/ctrl/button/subtle-background-color-hover':
    tokens.colorBrandBackground,
  'fixme/ctrl/button/outline-background-color':
    tokens.colorTransparentBackground,
  'fixme/ctrl/button/outline-background-color-hover':
    tokens.colorTransparentBackground,
  'fixme/ctrl/button/tint-background-color': 'red',
  'fixme/ctrl/button/tint-background-color-hover': null,

  // card
  'fixme/ctrl/card/corner-radius': tokens.borderRadiusXLarge, // 8px
  'fixme/ctrl/card/background-color': tokens.colorNeutralBackground1,
  'fixme/ctrl/card/foreground-color': tokens.colorNeutralBackground1,
  'fixme/ctrl/card/background-color-hover': '',
  'fixme/ctrl/card/foreground-color-hover': '',
  'fixme/ctrl/card/background-color-pressed': '',
  'fixme/ctrl/card/foreground-color-pressed': '',
  'fixme/ctrl/card/background-color-disabled': '',
  'fixme/ctrl/card/foreground-color-disabled': '',
  'fixme/ctrl/card/header-padding-outside': tokens.spacingVerticalM,
  'fixme/ctrl/card/header-padding-inside': tokens.spacingVerticalS,
  'fixme/ctrl/card/footer-horizontal-gap': tokens.spacingHorizontalS,
} as const satisfies CAPTheme;

export const CAP_THEME_TEAMS = {
  ...CAP_THEME_DEFAULTS,
} as const satisfies CAPTheme;

export const CAP_THEME_ONE_DRIVE = {
  ...CAP_THEME_DEFAULTS,
} as const satisfies CAPTheme;

export const CAP_THEME_SHAREPOINT = {
  ...CAP_THEME_DEFAULTS,
} as const satisfies CAPTheme;
