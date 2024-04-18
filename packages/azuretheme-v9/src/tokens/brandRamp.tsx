import * as React from 'react';
import { Theme, Button, ColorTokens } from '@fluentui/react-components';
import type { BrandVariants } from '@fluentui/tokens';
import {
  createLightTheme,
  createDarkTheme,
  createHighContrastTheme,
} from '@fluentui/tokens';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { Colors } from './colorPalette';
export const V9PrimaryButton = () => {
  return (
    <Button appearance="primary" icon={<CalendarMonthRegular />}>
      {' '}
      Primary{' '}
    </Button>
  );
};

export const brandAzure: BrandVariants = {
  10: Colors.Brand10,
  20: Colors.Brand20,
  30: Colors.Brand30,
  40: Colors.Brand40,
  50: Colors.Brand50,
  60: Colors.Brand60,
  70: Colors.Brand70,
  80: Colors.Brand80,
  90: Colors.Brand90,
  100: Colors.Brand100,
  110: Colors.Brand110,
  120: Colors.Brand120,
  130: Colors.Brand130,
  140: Colors.Brand140,
  150: Colors.Brand150,
  160: Colors.Brand160,
};

const azureLightColors = createLightTheme(brandAzure);
export const azureDarkColors = createDarkTheme(brandAzure);
export const azureHighContrastColors = createHighContrastTheme();

export const customHighContrastTheme: Theme = {
  ...azureLightColors,
  colorBrandBackground: '#Ff0000', // overriden token
  colorBrandBackgroundHover: '#Ff0000', // overriden token
  colorNeutralBackground1: '#Ff0000',
};

const neutralColors: ColorTokens = {
  colorNeutralForeground1: Colors.Grey14,
  colorNeutralForeground1Hover: Colors.Grey14,
  colorNeutralForeground1Pressed: Colors.Grey14,
  colorNeutralForeground1Selected: Colors.Grey14,
  colorNeutralForeground2: Colors.Grey26,
  colorNeutralForeground2Hover: Colors.Grey14,
  colorNeutralForeground2Pressed: Colors.Grey14,
  colorNeutralForeground2Selected: Colors.Grey14,
  colorNeutralForeground2BrandHover: Colors.Brand80,
  colorNeutralForeground2BrandPressed: Colors.Brand70,
  colorNeutralForeground2BrandSelected: Colors.Brand80,
  colorNeutralForeground3: Colors.Grey38,
  colorNeutralForeground3Hover: Colors.Grey26,
  colorNeutralForeground3Pressed: Colors.Grey26,
  colorNeutralForeground3Selected: Colors.Grey26,
  colorNeutralForeground3BrandHover: Colors.Brand80,
  colorNeutralForeground3BrandPressed: Colors.Brand70,
  colorNeutralForeground3BrandSelected: Colors.Brand80,
  colorNeutralForeground4: Colors.Grey44,
  colorNeutralForegroundDisabled: Colors.Grey74,
  colorNeutralForegroundInvertedDisabled: Colors.White40T,
  // unassigned prop start
  colorBrandForegroundLink: Colors.White,
  colorBrandForegroundLinkHover: Colors.White,
  colorBrandForegroundLinkPressed: Colors.White,
  colorBrandForegroundLinkSelected: Colors.White,
  // unassigned prop end

  colorNeutralForeground2Link: Colors.Grey26,
  colorNeutralForeground2LinkHover: Colors.Grey14,
  colorNeutralForeground2LinkPressed: Colors.Grey14,
  colorNeutralForeground2LinkSelected: Colors.Grey14,

  // unassigned prop start
  colorCompoundBrandForeground1: Colors.White,
  colorCompoundBrandForeground1Hover: Colors.White,
  colorCompoundBrandForeground1Pressed: Colors.White,
  colorBrandForeground1: Colors.White,
  colorBrandForeground2: Colors.White,
  colorBrandForeground2Hover: Colors.White,
  colorBrandForeground2Pressed: Colors.White,
  // unassigned prop end

  colorNeutralForeground1Static: Colors.Grey14,
  colorNeutralForegroundInverted: Colors.White,
  colorNeutralForegroundInvertedHover: Colors.White,
  colorNeutralForegroundInvertedPressed: Colors.White,
  colorNeutralForegroundInvertedSelected: Colors.White,
  colorNeutralForegroundInverted2: Colors.White,
  colorNeutralForegroundOnBrand: Colors.White,
  // unassigned prop
  colorNeutralForegroundStaticInverted: Colors.White,

  colorNeutralForegroundInvertedLink: Colors.White,
  colorNeutralForegroundInvertedLinkHover: Colors.White,
  colorNeutralForegroundInvertedLinkPressed: Colors.White,
  colorNeutralForegroundInvertedLinkSelected: Colors.White,

  // unassigned prop start
  colorBrandForegroundInverted: Colors.White,
  colorBrandForegroundInvertedHover: Colors.White,
  colorBrandForegroundInvertedPressed: Colors.White,
  colorBrandForegroundOnLight: Colors.White,
  colorBrandForegroundOnLightHover: Colors.White,
  colorBrandForegroundOnLightPressed: Colors.White,
  colorBrandForegroundOnLightSelected: Colors.White,
  // unassigned prop end

  colorNeutralBackground1: Colors.White,
  colorNeutralBackground1Hover: Colors.Grey96,
  colorNeutralBackground1Pressed: Colors.Grey88,
  colorNeutralBackground1Selected: Colors.Grey92,
  colorNeutralBackground2: Colors.Grey98,
  colorNeutralBackground2Hover: Colors.Grey94,
  colorNeutralBackground2Pressed: Colors.Grey86,
  colorNeutralBackground2Selected: Colors.Grey90,
  colorNeutralBackground3: Colors.Grey96,
  colorNeutralBackground3Hover: Colors.Grey92,
  colorNeutralBackground3Pressed: Colors.Grey84,
  colorNeutralBackground3Selected: Colors.Grey88,
  colorNeutralBackground4: Colors.Grey94,
  colorNeutralBackground4Hover: Colors.Grey98,
  colorNeutralBackground4Pressed: Colors.Grey96,
  colorNeutralBackground4Selected: Colors.White,
  colorNeutralBackground5: Colors.Grey92,
  colorNeutralBackground5Hover: Colors.Grey96,
  colorNeutralBackground5Pressed: Colors.Grey94,
  colorNeutralBackground5Selected: Colors.Grey98,
  colorNeutralBackground6: Colors.Grey90,
  colorNeutralBackgroundInverted: Colors.Grey16,
  colorNeutralBackgroundStatic: Colors.Grey20,
  colorNeutralBackgroundAlpha: Colors.White50T,
  colorNeutralBackgroundAlpha2: Colors.White80T,
  colorSubtleBackground: Colors.Transparent,
  colorSubtleBackgroundHover: Colors.Grey96,
  colorSubtleBackgroundPressed: Colors.Grey88,
  colorSubtleBackgroundSelected: Colors.Grey92,
  colorSubtleBackgroundLightAlphaHover: Colors.White70T,
  colorSubtleBackgroundLightAlphaPressed: Colors.White50T,
  colorSubtleBackgroundLightAlphaSelected: Colors.Transparent,
  colorSubtleBackgroundInverted: Colors.Transparent,
  colorSubtleBackgroundInvertedHover: Colors.Black10T,
  colorSubtleBackgroundInvertedPressed: Colors.Black30T,
  colorSubtleBackgroundInvertedSelected: Colors.Grey20T,
  colorTransparentBackground: Colors.Transparent,
  colorTransparentBackgroundHover: Colors.Transparent,
  colorTransparentBackgroundPressed: Colors.Transparent,
  colorTransparentBackgroundSelected: Colors.Transparent,
  colorNeutralBackgroundDisabled: Colors.Grey94,
  colorNeutralBackgroundInvertedDisabled: Colors.White10T,
  colorNeutralStencil1: Colors.Grey90,
  colorNeutralStencil2: Colors.Grey98,
  // unassigned prop start
  colorNeutralStencil1Alpha: Colors.White,
  colorNeutralStencil2Alpha: Colors.White,
  // unassigned prop end

  colorBackgroundOverlay: Colors.Black40T,
  colorScrollbarOverlay: Colors.Black50T,

  // unassigned prop start
  colorBrandBackground: Colors.White,
  colorBrandBackgroundHover: Colors.White,
  colorBrandBackgroundPressed: Colors.White,
  colorBrandBackgroundSelected: Colors.White,
  colorCompoundBrandBackground: Colors.White,
  colorCompoundBrandBackgroundHover: Colors.White,
  colorCompoundBrandBackgroundPressed: Colors.White,
  colorBrandBackgroundStatic: Colors.White,
  colorBrandBackground2: Colors.White,
  colorBrandBackground2Hover: Colors.White,
  colorBrandBackground2Pressed: Colors.White,
  colorBrandBackgroundInverted: Colors.White,
  colorBrandBackgroundInvertedHover: Colors.White,
  colorBrandBackgroundInvertedPressed: Colors.White,
  colorBrandBackgroundInvertedSelected: Colors.White,
  // unassigned prop end

  colorNeutralStrokeAccessible: Colors.Grey38,
  colorNeutralStrokeAccessibleHover: Colors.Grey34,
  colorNeutralStrokeAccessiblePressed: Colors.Grey30,
  colorNeutralStrokeAccessibleSelected: Colors.Brand80,
  colorNeutralStroke1: Colors.Grey82,
  colorNeutralStroke1Hover: Colors.Grey78,
  colorNeutralStroke1Pressed: Colors.Grey70,
  colorNeutralStroke1Selected: Colors.Grey74,
  colorNeutralStroke2: Colors.Grey88,
  colorNeutralStroke3: Colors.Grey94,
  colorNeutralStrokeSubtle: Colors.Grey88,
  colorNeutralStrokeOnBrand: Colors.White,
  colorNeutralStrokeOnBrand2: Colors.White,
  colorNeutralStrokeOnBrand2Hover: Colors.White,
  colorNeutralStrokeOnBrand2Pressed: Colors.White,
  colorNeutralStrokeOnBrand2Selected: Colors.White,

  // unassigned prop start
  colorBrandStroke1: Colors.White,
  colorBrandStroke2: Colors.White,
  colorBrandStroke2Hover: Colors.White,
  colorBrandStroke2Pressed: Colors.White,
  colorBrandStroke2Contrast: Colors.White,
  colorCompoundBrandStroke: Colors.White,
  colorCompoundBrandStrokeHover: Colors.White,
  colorCompoundBrandStrokePressed: Colors.White,
  // unassigned prop end

  colorNeutralStrokeDisabled: Colors.Grey88,
  colorNeutralStrokeInvertedDisabled: Colors.White40T,

  // unassigned prop start
  colorTransparentStroke: Colors.White,
  // unassigned prop end

  colorTransparentStrokeInteractive: Colors.Transparent,
  colorTransparentStrokeDisabled: Colors.Transparent,
  colorNeutralStrokeAlpha: Colors.Black5T, //colorNeutralStrokeAlpha1 on figma
  colorNeutralStrokeAlpha2: Colors.White20T,
  colorStrokeFocus1: Colors.White,
  colorStrokeFocus2: Colors.Black,

  // unassigned prop start
  colorNeutralShadowAmbient: Colors.White,
  colorNeutralShadowKey: Colors.White,
  colorNeutralShadowAmbientLighter: Colors.White,
  colorNeutralShadowKeyLighter: Colors.White,
  colorNeutralShadowAmbientDarker: Colors.White,
  colorNeutralShadowKeyDarker: Colors.White,
  colorBrandShadowAmbient: Colors.White,
  colorBrandShadowKey: Colors.White,
  // unassigned prop end
};

export const azureLightTheme: Theme = {
  ...neutralColors,
  ...azureLightColors,
};

export const azureDarkTheme: Theme = {
  ...neutralColors,
  ...azureDarkColors,
};

export const azureHighContrastTheme: Theme = {
  ...neutralColors,
  ...azureHighContrastColors,
};
