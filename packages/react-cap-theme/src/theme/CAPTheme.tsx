import { tokens } from '@fluentui/react-components';

type TokenType = 'color' | 'dimension' | 'shadow' | 'alignment';

export interface TokenSchema {
  type: TokenType;
}

type AllowedTokenName =
  // This token does not exist in semantic tokens and is new to CAP.
  | `cap/${string}`
  // This token should exist in Fluent v9 (we expect it to be pushed upstream to fluent core).
  | `fluent-ext/${string}`
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
 * FluentExtendedTokens are tokens that should exist in Fluent v9 but don't yet.
 * We expect them to be pushed upstream to Fluent core, at which point you can swap them:
 *
 * ```ts
 * // before
 * borderRadius: CAP_TOKENS['fluent-ext/borderRadius2XLarge']
 *
 * // after
 * import { tokens } from '@fluentui/react-components';
 * borderRadius: tokens.borderRadius2XLarge
 * ```
 */
const FluentExtendedTokens = {
  'fluent-ext/borderRadius2XLarge': { type: 'dimension' },
  'fluent-ext/borderRadius3XLarge': { type: 'dimension' },
  'fluent-ext/borderRadius2XXLarge': { type: 'dimension' },
  // reason we need this token is the fluent version has value of "0" instead of "0px", which causes issues in CSS var usage
  'fluent-ext/spacingHorizontalNone': { type: 'dimension' },
  'fluent-ext/brandForegroundCompound': { type: 'color' },
} as const satisfies Record<AllowedTokenName, TokenSchema>;

/**
 * ControlTokens are used across multiple components to control a particular aspect
 * of the design system (e.g. border radii).
 */
const ControlTokens = {
  'smtc/v1/ctrl/corner/rest': { type: 'dimension' },
} as const satisfies Record<AllowedTokenName, TokenSchema>;

const BadgeTokens = {
  'cap/badge-xl/corner-rounded': { type: 'dimension' },
  'cap/badge-l/corner-rounded': { type: 'dimension' },
  'cap/badge-xl/padding': { type: 'dimension' },
  'cap/badge-l/padding': { type: 'dimension' },
  'cap/badge-m/padding': { type: 'dimension' },
  'cap/badge-s/padding': { type: 'dimension' },
  'cap/badge-s/gap': { type: 'dimension' },
  'cap/badge-s/gap-toSecondaryIcon': { type: 'dimension' },
  'cap/badge/brand/outlined/stroke': { type: 'color' },
  'cap/badge/brand/tint/foreground': { type: 'color' },
  'cap/badge/brand/tint/iconColor': { type: 'color' },
  'cap/badge/brand/ghost/foreground': { type: 'color' },
  'cap/badge/brand/ghost/iconColor': { type: 'color' },
  'cap/badge/danger/outlined/stroke': { type: 'color' },
  'cap/badge/warning/filled/background': { type: 'color' },
  'cap/badge/warning/filled/iconColor': { type: 'color' },
  'cap/badge/warning/filled/foreground': { type: 'color' },
  'cap/badge/warning/outlined/stroke': { type: 'color' },
  'cap/badge/success/outlined/stroke': { type: 'color' },
  'cap/badge/informative/outlined/stroke': { type: 'color' },
  'cap/badge/informative/tint/background': { type: 'color' },
  'cap/badge/informative/tint/stroke': { type: 'color' },
  'cap/badge/important/filled/background': { type: 'color' },
  'cap/badge/important/filled/foreground': { type: 'color' },
  'cap/badge/important/filled/iconColor': { type: 'color' },
  'cap/badge/important/outlined/stroke': { type: 'color' },
  'cap/badge/important/tint/background': { type: 'color' },
  'cap/badge/important/tint/foreground': { type: 'color' },
  'cap/badge/important/tint/iconColor': { type: 'color' },
  'cap/badge/important/tint/stroke': { type: 'color' },
  'cap/badge/subtle/filled/background': { type: 'color' },
  'cap/badge/subtle/filled/foreground': { type: 'color' },
  'cap/badge/subtle/filled/iconColor': { type: 'color' },
  'cap/badge/subtle/outlined/foreground': { type: 'color' },
  'cap/badge/subtle/outlined/iconColor': { type: 'color' },
  'cap/badge/subtle/tint/stroke': { type: 'color' },
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

const DialogTokens = {
  'cap/Dialog/Corner': { type: 'dimension' },
  'cap/Dialog/Header/Gap': { type: 'dimension' },
  'cap/Dialog/strokeColor': { type: 'color' },
  'cap/Dialog/strokeWidth': { type: 'dimension' },
} as const satisfies Record<AllowedTokenName, TokenSchema>;

const InputTokens = {} as const satisfies Record<AllowedTokenName, TokenSchema>;

const MenuTokens = {} as const satisfies Record<AllowedTokenName, TokenSchema>;

const TooltipTokens = {} as const satisfies Record<
  AllowedTokenName,
  TokenSchema
>;

const DrawerTokens = {
  'cap/ctrl/flyout/base-corner': { type: 'dimension' },
  'cap/ctrl/flyout/Elevation': { type: 'shadow' },
  'smtc/v1/ctrl/flyout/header/paddingTop': { type: 'dimension' },
  'smtc/v1/ctrl/flyout/header/Padding-Left': { type: 'dimension' },
  'fixme/ctrl/drawer/header/padding-bottom': { type: 'dimension' },
  'smtc/v1/ctrl/flyout/header/Padding-Right': { type: 'dimension' },
  'cap/ctrl/flyout/body-Padding-Left': { type: 'dimension' },
  'cap/ctrl/flyout/body-Padding-Right': { type: 'dimension' },
  'cap/ctrl/flyout/Footer-Padding-top': { type: 'dimension' },
  'cap/ctrl/flyout/Footer-Padding-bottom': { type: 'dimension' },
  'cap/ctrl/flyout/footer-Padding-Left': { type: 'dimension' },
  'cap/ctrl/flyout/footer-Padding-Right': { type: 'dimension' },
  'fixme/ctrl/drawer/footer/content-alignment': { type: 'alignment' },
} as const satisfies Record<AllowedTokenName, TokenSchema>;

export const CAPTokensSchema = {
  ...FluentExtendedTokens,
  ...ControlTokens,
  ...BadgeTokens,
  ...ButtonTokens,
  ...CardTokens,
  ...DialogTokens,
  ...InputTokens,
  ...MenuTokens,
  ...TooltipTokens,
  ...DrawerTokens,
} as const satisfies { [key: AllowedTokenName]: TokenSchema };

export const CAP_TOKENS = Object.keys(CAPTokensSchema).reduce((acc, key) => {
  return { ...acc, [key]: `var(--${formatCAPTokenCssVar(key)})` };
}, {} as Record<keyof typeof CAPTokensSchema, string>);

export type CAPTheme = {
  [k in keyof typeof CAP_TOKENS]: string | null;
};

export const CAP_THEME_DEFAULTS = {
  // fluent-ext
  'fluent-ext/brandForegroundCompound': '#03787C',
  'fluent-ext/spacingHorizontalNone': '0px',
  'fluent-ext/borderRadius2XLarge': '12px',
  'fluent-ext/borderRadius3XLarge': '16px',
  'fluent-ext/borderRadius2XXLarge': '24px',

  // smtc/v1
  'smtc/v1/ctrl/corner/rest': CAP_TOKENS['fluent-ext/borderRadius2XLarge'],

  // badge
  'cap/badge-xl/corner-rounded': tokens.borderRadiusXLarge,
  'cap/badge-l/corner-rounded': tokens.borderRadiusLarge,
  'cap/badge-xl/padding': tokens.spacingHorizontalS,
  'cap/badge-l/padding': tokens.spacingHorizontalSNudge,
  'cap/badge-m/padding': tokens.spacingHorizontalSNudge,
  'cap/badge-s/padding': tokens.spacingHorizontalXS,
  'cap/badge-s/gap': CAP_TOKENS['fluent-ext/spacingHorizontalNone'],
  'cap/badge-s/gap-toSecondaryIcon':
    CAP_TOKENS['fluent-ext/spacingHorizontalNone'],
  'cap/badge/brand/outlined/stroke': tokens.colorBrandStroke2,
  'cap/badge/brand/tint/foreground':
    CAP_TOKENS['fluent-ext/brandForegroundCompound'],
  'cap/badge/brand/tint/iconColor':
    CAP_TOKENS['fluent-ext/brandForegroundCompound'],
  'cap/badge/brand/ghost/foreground':
    CAP_TOKENS['fluent-ext/brandForegroundCompound'],
  'cap/badge/brand/ghost/iconColor':
    CAP_TOKENS['fluent-ext/brandForegroundCompound'],
  'cap/badge/danger/outlined/stroke': tokens.colorStatusDangerBorder1,
  'cap/badge/warning/filled/background': tokens.colorStatusWarningBackground3,
  'cap/badge/warning/filled/iconColor': tokens.colorNeutralForegroundOnBrand,
  'cap/badge/warning/filled/foreground': tokens.colorNeutralForegroundOnBrand,
  'cap/badge/warning/outlined/stroke': tokens.colorStatusWarningBorder1,
  'cap/badge/success/outlined/stroke': tokens.colorStatusSuccessBorder1,
  'cap/badge/informative/outlined/stroke': tokens.colorNeutralStroke1,
  'cap/badge/informative/tint/background': tokens.colorNeutralBackground5,
  'cap/badge/informative/tint/stroke': tokens.colorNeutralStroke1,
  'cap/badge/important/filled/background':
    tokens.colorNeutralBackgroundInverted,
  'cap/badge/important/filled/foreground': tokens.colorNeutralForegroundOnBrand,
  'cap/badge/important/filled/iconColor': tokens.colorNeutralForegroundOnBrand,
  'cap/badge/important/outlined/stroke': tokens.colorNeutralStroke1,
  'cap/badge/important/tint/background': tokens.colorNeutralBackground5,
  'cap/badge/important/tint/foreground': tokens.colorNeutralForeground3,
  'cap/badge/important/tint/iconColor': tokens.colorNeutralForeground3,
  'cap/badge/important/tint/stroke': tokens.colorNeutralStroke1,
  'cap/badge/subtle/filled/background': tokens.colorNeutralBackground5,
  'cap/badge/subtle/filled/foreground': tokens.colorNeutralForeground3,
  'cap/badge/subtle/filled/iconColor': tokens.colorNeutralForeground3,
  'cap/badge/subtle/outlined/foreground': tokens.colorNeutralForeground3,
  'cap/badge/subtle/outlined/iconColor': tokens.colorNeutralForeground3,
  'cap/badge/subtle/tint/stroke': tokens.colorNeutralStroke1,

  // dialog
  'cap/Dialog/Corner': CAP_TOKENS['fluent-ext/borderRadius2XXLarge'],
  'cap/Dialog/Header/Gap': tokens.spacingVerticalL,
  'cap/Dialog/strokeColor': tokens.colorNeutralStroke3,
  // Note: the strokeWidthThin token was 1px and now it is also 1px, but defined here for clarity as it is in Diff section in figma
  'cap/Dialog/strokeWidth': tokens.strokeWidthThin,

  // button
  'fixme/ctrl/button/corner-radius': CAP_TOKENS['smtc/v1/ctrl/corner/rest'],
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

  // drawer
  // Notes: Component Drawer at design specs and in code, tokens are using 'flyout'
  'cap/ctrl/flyout/base-corner': CAP_TOKENS['fluent-ext/borderRadius3XLarge'],
  'cap/ctrl/flyout/Elevation': tokens.shadow2,
  'smtc/v1/ctrl/flyout/header/paddingTop': tokens.spacingVerticalL,
  'smtc/v1/ctrl/flyout/header/Padding-Left': tokens.spacingHorizontalXL,
  'fixme/ctrl/drawer/header/padding-bottom': '12px', // Not exist in design specs and in tokens
  'smtc/v1/ctrl/flyout/header/Padding-Right': tokens.spacingHorizontalXL, // layout is different, required different value from design spec tokens.spacingHorizontalMNudge
  'cap/ctrl/flyout/body-Padding-Left': tokens.spacingHorizontalXL,
  'cap/ctrl/flyout/body-Padding-Right': tokens.spacingHorizontalXL,
  'cap/ctrl/flyout/Footer-Padding-top': tokens.spacingVerticalXXL,
  'cap/ctrl/flyout/Footer-Padding-bottom': tokens.spacingVerticalXL,
  'cap/ctrl/flyout/footer-Padding-Left': tokens.spacingHorizontalXL,
  'cap/ctrl/flyout/footer-Padding-Right': tokens.spacingHorizontalXL,
  'fixme/ctrl/drawer/footer/content-alignment': 'flex-end',
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
