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

const BadgeTokens = {
  'cap/ctrl/badge/color-brand-foreground-compound': { type: 'color' },
} as const satisfies Record<AllowedTokenName, TokenSchema>;

const ButtonTokens = {
  'cap/ctrl/button/primary-background-color': { type: 'color' },
  'cap/ctrl/button/primary-background-color-hover': { type: 'color' },
  'cap/ctrl/button/secondary-background-color': { type: 'color' },
  'cap/ctrl/button/secondary-background-color-hover': { type: 'color' },
  'cap/ctrl/button/subtle-background-color': { type: 'color' },
  'cap/ctrl/button/subtle-background-color-hover': { type: 'color' },
  'cap/ctrl/button/outline-background-color': { type: 'color' },
  'cap/ctrl/button/outline-background-color-hover': { type: 'color' },
  'cap/ctrl/button/tint-background-color': { type: 'color' },
  'cap/ctrl/button/tint-background-color-hover': { type: 'color' },
} as const satisfies Record<AllowedTokenName, TokenSchema>;

const CardTokens = {
  'cap/ctrl/card/background-color': { type: 'color' },
  'cap/ctrl/card/foreground-color': { type: 'color' },
  'cap/ctrl/card/background-color-hover': { type: 'color' },
  'cap/ctrl/card/foreground-color-hover': { type: 'color' },
  'cap/ctrl/card/background-color-pressed': { type: 'color' },
  'cap/ctrl/card/foreground-color-pressed': { type: 'color' },
  'cap/ctrl/card/background-color-disabled': { type: 'color' },
  'cap/ctrl/card/foreground-color-disabled': { type: 'color' },
  'cap/ctrl/card/corner-radius': { type: 'dimension' },
  'cap/ctrl/card/header-padding-outside': { type: 'dimension' },
  'cap/ctrl/card/header-padding-inside': { type: 'dimension' },
  'cap/ctrl/card/footer-horizontal-gap': { type: 'dimension' },
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
  // badge
  // TODO: switch to BrandForegroundCompound when available
  'cap/ctrl/badge/color-brand-foreground-compound':
    tokens.colorBrandForeground1,

  // button
  'cap/ctrl/button/primary-background-color': tokens.colorBrandBackground,
  'cap/ctrl/button/primary-background-color-hover':
    tokens.colorBrandBackgroundHover,
  'cap/ctrl/button/secondary-background-color': null,
  'cap/ctrl/button/secondary-background-color-hover': null,
  'cap/ctrl/button/subtle-background-color': tokens.colorBrandBackground,
  'cap/ctrl/button/subtle-background-color-hover': tokens.colorBrandBackground,
  'cap/ctrl/button/outline-background-color': tokens.colorTransparentBackground,
  'cap/ctrl/button/outline-background-color-hover':
    tokens.colorTransparentBackground,
  'cap/ctrl/button/tint-background-color': 'red',
  'cap/ctrl/button/tint-background-color-hover': null,

  // card
  'cap/ctrl/card/corner-radius': tokens.borderRadiusXLarge, // 8px
  'cap/ctrl/card/background-color': tokens.colorNeutralBackground1,
  'cap/ctrl/card/foreground-color': tokens.colorNeutralBackground1,
  'cap/ctrl/card/background-color-hover': '',
  'cap/ctrl/card/foreground-color-hover': '',
  'cap/ctrl/card/background-color-pressed': '',
  'cap/ctrl/card/foreground-color-pressed': '',
  'cap/ctrl/card/background-color-disabled': '',
  'cap/ctrl/card/foreground-color-disabled': '',
  'cap/ctrl/card/header-padding-outside': tokens.spacingVerticalM,
  'cap/ctrl/card/header-padding-inside': tokens.spacingVerticalS,
  'cap/ctrl/card/footer-horizontal-gap': tokens.spacingHorizontalS,
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
