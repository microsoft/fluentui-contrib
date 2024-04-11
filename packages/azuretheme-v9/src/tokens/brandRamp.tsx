import * as React from 'react';
import { Theme, Button } from '@fluentui/react-components';
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
  10: `#101b2f`,
  20: `#16243c`,
  30: `#1d2d4b`,
  40: `#24395d`,
  50: `#2a446f`,
  60: `#2a5087`,
  70: `#125ca9`,
  80: `#006ac6`,
  90: `#0d7bd7`,
  100: `#388ee2`,
  110: `#5da2ea`,
  120: `#79b2f0`,
  130: `#96c3f4`,
  140: `#afd2f8`,
  150: `#cce2fb`,
  160: `#e8f2fd`,
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

export const azureLightTheme: Theme = {
  ...azureLightColors,
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
  colorNeutralBackgroundAlpha: Colors.White50T,
  colorNeutralBackgroundAlpha2: Colors.White80T,
  colorNeutralBackgroundStatic: Colors.Grey20,
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
  colorBackgroundOverlay: Colors.Black40T,
  colorScrollbarOverlay: Colors.Black50T,
  colorNeutralForeground1: Colors.Grey14,
  colorNeutralForeground1Hover: Colors.Grey14,
  colorNeutralForeground1Pressed: Colors.Grey14,
  colorNeutralForeground1Selected: Colors.Grey14,
  colorNeutralForeground2: Colors.Grey26,
  colorNeutralForeground2Hover: Colors.Grey14,
  colorNeutralForeground2Pressed: Colors.Grey14,
  colorNeutralForeground2Selected: Colors.Grey14,
};

export const azureDarkTheme: Theme = {
  ...azureDarkColors,
};

export const azureHighContrastTheme: Theme = {
  ...azureHighContrastColors,
};
