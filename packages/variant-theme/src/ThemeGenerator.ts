import {
  getColorFromString,
  IColor,
  updateA
} from '@fluentui/react';
import type { BrandVariants, ColorTokens, Theme } from '@fluentui/react-components';
import { VariantThemeType } from '@fluentui/scheme-utilities';
import {
  black,
  white,
  grey,
  whiteAlpha,
  blackAlpha,
  AlphaColors,
  type Greys,
} from '@fluentui/react-migration-v8-v9';
import { contrast, hex_to_sRGB } from './ThemeDesigner/generated-api';

const standardContrastRatio = 4.5;

const greyReverse = Object.entries(grey).reduce<Record<string, Greys>>(
  (acc, [key, value]) => {
    acc[value] = key as unknown as Greys;
    return acc;
  },
  {}
);

export function getVariantTheme(
  brandVariants: BrandVariants,
  theme: Theme,
  type: VariantThemeType,
  isInverted: boolean
) {
  // Need a way to detect custom neutrals in the theme
  // Need a way to detect if the theme is light or dark

  const newTheme: Theme = {
    ...theme,
  };
  switch (type) {
    case VariantThemeType.None:
      getNoneVariant(newTheme, isInverted);
      return newTheme;
    case VariantThemeType.Neutral:
      // Set the background to be a light grey
      // Shift all the other neutrals to account for the darker background
      getNeutralVariant(newTheme, isInverted);
      return newTheme;
    case VariantThemeType.Soft:
      // Set the background to be a light tint of the brand color
      // Shift all the other neutrals to account for the darker background
      getSoftVariant(newTheme, brandVariants, isInverted);
      return newTheme;
    case VariantThemeType.Strong:
      getStrongVariant(newTheme, brandVariants, isInverted);
      return newTheme;
    default:
      return newTheme;
  }
}

const getNoneVariant = (theme: Theme, isInverted: boolean) => {
  if (!isInverted) {
    return theme;
  }

  theme.colorBrandForegroundLink = white;
  theme.colorBrandForeground1 = white;
  return theme;
};

function getNeutralVariant(theme: Theme, isInverted: boolean) {
  for (const token in theme) {
    if (theme.hasOwnProperty(token)) {
      // Shift most neutral colors by 4 steps
      if (
        (token.startsWith('colorNeutralBackground') && !isTokenNameContains(token, ['Alpha', 'Inverted', 'Static', 'Disabled'])) ||
        (token.startsWith('colorNeutralStroke') &&
          !isTokenNameContains(token, [
            'Alpha',
            'OnBrand',
            'AccessibleSelected',
            'InvertedDisabled',
          ])) ||
        isTokenNameContains(token, ['NeutralForeground']) ||
        isTokenNameContains(token, ['Subtle'])
      ) {
        theme[token as keyof ColorTokens] = shift(theme[token as keyof ColorTokens] as string, !isInverted, 4);
        // Shift extra steps for special cases
        shiftNeutralSpecialCases(theme, token as keyof ColorTokens, isInverted);
      }
    }
  }
  if (isInverted) {
    theme.colorBrandForegroundLink = white;
    theme.colorBrandForeground1 = white;
  }
}

function shiftNeutralSpecialCases(theme: Theme, token: keyof ColorTokens, isInverted: boolean) {
  if (token.startsWith('colorNeutralBackground')) {
    const num: number | undefined = getNumberFromToken(token);
    if (num === 4 || num === 5) {
      if (token.endsWith('hover')) {
        theme[token] = shift(theme[token], !isInverted, 8);
      } else if (token.endsWith('pressed') || token.endsWith('selected')) {
        theme[token] = shift(theme[token], !isInverted, 14);
      }
    }
  }
}

function getBrandColor (brandVariants: BrandVariants, isDark: boolean, index: keyof BrandVariants): string {
  if (isDark) {
    return brandVariants[160 - index + 10 as keyof BrandVariants];
  }
  return brandVariants[index];
};

function getSoftVariant(
  theme: Theme,
  brand: BrandVariants,
  isInverted: boolean
) {
  for (const token in theme) {
    if (theme.hasOwnProperty(token)) {
      // convert some neutral colors to brand colors
      const colorToken = token as keyof ColorTokens
      if (
        token.startsWith('colorNeutralBackground') &&
        !isTokenNameContains(token, ['Alpha', 'Static', 'Inverted', 'Disabled'])
      ) {
        if (token.endsWith('Hover')) {
          theme[colorToken] = getBrandColor(brand, isInverted, 150);
        } else if (token.endsWith('Pressed')) {
          theme[colorToken] = getBrandColor(brand, isInverted, 130);
        } else if (token.endsWith('Selected')) {
          theme[colorToken] = getBrandColor(brand, isInverted, 150);
        } else {
          theme[colorToken] = getBrandColor(brand, isInverted, 160);
        }
      } else if (
        token.startsWith('colorSubtleBackground') &&
        !isTokenNameContains(token, ['LightAlpha', 'Inverted'])
      ) {
        if (token.endsWith('Hover')) {
          theme[colorToken] = getBrandColor(brand, isInverted, 150);
        } else if (token.endsWith('Pressed')) {
          theme[colorToken] = getBrandColor(brand, isInverted, 130);
        } else if (token.endsWith('Selected')) {
          theme[colorToken] = getBrandColor(brand, isInverted, 140);
        }
      } else if (
        token.startsWith('colorNeutralStencil') &&
        !isTokenNameContains(token, ['Alpha'])
      ) {
        const num: number | undefined = getNumberFromToken(token);
        if (num === 1) {
          theme[colorToken] = getBrandColor(brand, isInverted, 140);
        } else if (num === 2) {
          theme[colorToken] = getBrandColor(brand, isInverted, 150);
        }
      } else if (
        // Shift some neutral stoke and foreground colors by 4 steps
        (token.startsWith('colorNeutralStroke') &&
          !isTokenNameContains(token, [
            'Alpha',
            'OnBrand',
            'AccessibleSelected',
            'InvertedDisabled',
          ])) ||
        (isTokenNameContains(token, ['Foreground']) &&
          !isTokenNameContains(token, ['Brand', 'Status', 'Palette']))
      ) {
        theme[colorToken] = shift(theme[colorToken], !isInverted, 4);
      }
    }
  }

  if (isInverted) {
    theme.colorBrandForegroundLink = white;
    theme.colorBrandForeground1 = white;
  }

  theme['colorNeutralBackground1'] = calculateSoftBackground(brand, isInverted);
}

function getStrongVariant(
  theme: Theme,
  brand: BrandVariants,
  isInverted?: boolean
) {
  // Todo: dark mode support
  setNeutralWithBrand(theme, brand);
  const colorOnBrand: string = determineColorOnBrand(
    theme.colorNeutralBackground1
  );
  const alphas: Record<AlphaColors, string> =
    colorOnBrand === black ? blackAlpha : whiteAlpha;

  setColorsOnBrand(theme, brand, colorOnBrand, alphas, isInverted);
}

function setNeutralWithBrand(theme: Theme, brand: BrandVariants) {
  for (const token in theme) {
    if (theme.hasOwnProperty(token)) {
      if (
        token.startsWith('colorNeutralBackground') &&
        !isTokenNameContains(token, ['Alpha', 'InvertedDisabled', 'Static'])
      ) {
        const colorToken = token as keyof ColorTokens;
        if (colorToken.endsWith('Hover')) {
          theme[colorToken] = brand[70];
        } else if (colorToken.endsWith('Pressed')) {
          theme[colorToken] = brand[40];
        } else if (colorToken.endsWith('Selected')) {
          theme[colorToken] = brand[60];
        } else if (colorToken.endsWith('Disabled')) {
          theme[colorToken] = brand[100];
        } else {
          theme[colorToken] = brand[80];
        }
      } else if (
        token.startsWith('colorSubtleBackground') &&
        !isTokenNameContains(token, ['LightAlpha', 'Inverted'])
      ) {
        const colorToken = token as keyof ColorTokens;
        if (colorToken.endsWith('Hover')) {
          theme[colorToken] = brand[60];
        } else if (colorToken.endsWith('Pressed')) {
          theme[colorToken] = brand[40];
        } else if (colorToken.endsWith('Selected')) {
          theme[colorToken] = brand[50];
        }
      }
    }
  }
}

// Determine the brand color is light or dark according to the lightness
function determineColorOnBrand(brandColor: string): string {
  const color: string =
    brandColor.charAt(0) === '#' ? brandColor.substring(1, 7) : brandColor;
  const r: number = parseInt(color.substring(0, 2), 16); // hexToR
  const g: number = parseInt(color.substring(2, 4), 16); // hexToG
  const b: number = parseInt(color.substring(4, 6), 16); // hexToB
  const uicolors: number[] = [r / 255, g / 255, b / 255];
  const c: number[] = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L: number = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? black : white;
}

function setColorsOnBrand(
  theme: Theme,
  brand: BrandVariants,
  colorOnBrand: string,
  alphas: Record<AlphaColors, string>,
  isInverted?: boolean
) {
  for (const token in theme) {
    if (theme.hasOwnProperty(token)) {
      if (
        (token.startsWith('colorNeutralForeground') ||
          token.startsWith('colorNeutralStroke')) &&
        !isTokenNameContains(token, [
          'Alpha',
          'Static',
          'InvertedDisabled',
          'Subtle',
        ])
      ) {
        theme[token as keyof ColorTokens] = colorOnBrand;
      }
    }
  }
  const newThemeProps: Partial<Theme> = {
    colorNeutralForeground3Hover: alphas[80],
    colorNeutralForeground3Pressed: alphas[80],
    colorNeutralForeground3Selected: alphas[80],
    colorNeutralForegroundDisabled: alphas[60],

    colorNeutralForeground2: alphas[90],
    colorNeutralForeground3: alphas[90],
    colorNeutralForeground4: grey[92],
    colorNeutralBackground3: brand[70],

    colorNeutralForegroundInverted: brand[80],
    colorNeutralForegroundInvertedHover: brand[70],
    colorNeutralForegroundInvertedPressed: brand[40],
    colorNeutralForegroundInvertedSelected: brand[60],
    colorNeutralForegroundInverted2: brand[80],
    colorNeutralForegroundInvertedLink: brand[70],
    colorNeutralForegroundInvertedLinkHover: brand[60],
    colorNeutralForegroundInvertedLinkPressed: brand[30],
    colorNeutralForegroundInvertedLinkSelected: brand[50],
    colorNeutralForegroundOnBrand: brand[80],
    colorNeutralForegroundStaticInverted: brand[80],

    colorNeutralStrokeDisabled: alphas[40],
    colorNeutralStrokeInvertedDisabled: alphas[40],
    colorNeutralStrokeOnBrand2: brand[80],

    colorNeutralBackground5: brand[70],
    colorNeutralBackground6: brand[60],
    colorNeutralBackgroundStatic: colorOnBrand,
    colorNeutralBackgroundInverted: colorOnBrand,

    colorNeutralStencil1Alpha: alphas[10],
    colorNeutralStencil2Alpha: alphas[5],

    colorBrandBackground: colorOnBrand,
    colorBrandBackgroundHover: alphas[90],
    colorBrandBackgroundPressed: alphas[80],
    colorBrandBackgroundSelected: alphas[90],
    colorBrandBackground2: alphas[10],
    colorBrandBackground2Hover: alphas[20],
    colorBrandBackground2Pressed: alphas[10],
    colorBrandBackgroundStatic: colorOnBrand,
    colorCompoundBrandBackground: colorOnBrand,
    colorCompoundBrandBackgroundHover: alphas[90],
    colorCompoundBrandBackgroundPressed: alphas[80],

    colorBrandForeground1: colorOnBrand,
    colorBrandForeground2: colorOnBrand,
    colorBrandForeground2Hover: colorOnBrand,
    colorBrandForeground2Pressed: colorOnBrand,
    colorBrandForegroundLink: colorOnBrand,
    colorBrandForegroundLinkHover: colorOnBrand,
    colorBrandForegroundLinkPressed: colorOnBrand,
    colorBrandForegroundLinkSelected: alphas[80],
    colorCompoundBrandForeground1: colorOnBrand,
    colorCompoundBrandForeground1Hover: alphas[90],
    colorCompoundBrandForeground1Pressed: alphas[70],

    // Branded stroke colors are now colorOnBrand or an alpha of colorOnBrand
    colorBrandStroke1: colorOnBrand,
    colorBrandStroke2: colorOnBrand,
    colorBrandStroke2Hover: colorOnBrand,
    colorBrandStroke2Pressed: colorOnBrand,
    colorBrandStroke2Contrast: alphas[30],
    colorCompoundBrandStroke: colorOnBrand,
    colorCompoundBrandStrokeHover: colorOnBrand,
    colorCompoundBrandStrokePressed: colorOnBrand,

    colorSubtleBackgroundLightAlphaHover: theme.colorSubtleBackgroundHover,
    colorSubtleBackgroundLightAlphaPressed: theme.colorSubtleBackgroundPressed
  };

  if (!isInverted) {
    //Status colors need to change
    newThemeProps.colorStatusWarningBackground1 = theme.colorStatusWarningForeground3;
    newThemeProps.colorStatusWarningForeground3 = theme.colorStatusWarningBackground1;
    newThemeProps.colorStatusDangerForeground1 = theme.colorStatusDangerBackground1;
    newThemeProps.colorStatusDangerBackground1 = theme.colorStatusDangerForeground1;
    newThemeProps.colorStatusSuccessForeground1 = theme.colorStatusSuccessBackground1;
    newThemeProps.colorStatusSuccessBackground1 = theme.colorStatusSuccessForeground1;
  }

  newThemeProps.colorPaletteRedForeground1 = resetByContrast(
    theme.colorPaletteRedForeground1,
    brand[80]
  );
  newThemeProps.colorPaletteDarkOrangeForeground1 = resetByContrast(
    theme.colorPaletteDarkOrangeForeground1,
    brand[80]
  );
  newThemeProps.colorPaletteRedForeground3 = resetByContrast(
    theme.colorPaletteRedForeground3,
    brand[80]
  );
  newThemeProps.colorPaletteGreenForeground1 = resetByContrast(
    theme.colorPaletteGreenForeground1,
    brand[80]
  );
  newThemeProps.colorPaletteRedBorder2 = resetByContrast(
    theme.colorPaletteRedBorder2,
    brand[80]
  );

  Object.assign(theme, newThemeProps);
}

function isTokenNameContains(token: string, names: string[]): boolean {
  return names.some((name) => token.indexOf(name) !== -1);
}

function shift(color: string, darken: boolean, degree: number) {
  if (!greyReverse[color]) {
    return color;
  }
  const index: number = Number(greyReverse[color]);
  return darken
    ? grey[Math.max(index - degree, 0) as Greys]
    : grey[Math.min(index + degree, 100) as Greys];
}

function getNumberFromToken(token: string): number | undefined {
  const nums = token.match(/\d+/);
  return nums ? parseInt(nums[0]) : undefined;
}

function rgbaToHex(color: IColor, isInverted: boolean): string {
  if (!color.a) {
    return `#${color.r.toString(16)}${color.g.toString(16)}${color.b.toString(16)}`;
  }
  const r: number = Math.round(color.r * color.a * 0.01 + (!isInverted ? 255 * (1 - color.a * 0.01) : 0));
  const g: number = Math.round(color.g * color.a * 0.01 + (!isInverted ? 255 * (1 - color.a * 0.01) : 0));
  const b: number = Math.round(color.b * color.a * 0.01 + (!isInverted ? 255 * (1 - color.a * 0.01) : 0));
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

function resetByContrast(
  color: string | undefined,
  pageBackground: string
): string | undefined {
  if (!color || !pageBackground) {
    return color;
  }
  const colorContrastWithRed: number = contrast(
    hex_to_sRGB(pageBackground),
    hex_to_sRGB(color)
  );
  if (colorContrastWithRed < standardContrastRatio) {
    return white;
  }
  return color;
}

const calculateSoftBackground = (brandVariants: BrandVariants, isInverted: boolean) => {
  let color: IColor = getColorFromString(isInverted ? brandVariants[30] : brandVariants[80])!;
  color = updateA(color, 5);
  return rgbaToHex(color, isInverted);
};
