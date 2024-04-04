import * as React from 'react';
import { FontWeightTokens, Theme, Button } from '@fluentui/react-components';
import type { BrandVariants } from '@fluentui/tokens';
import { createLightTheme, createDarkTheme } from '@fluentui/tokens';
import { CalendarMonthRegular } from '@fluentui/react-icons';

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

export const azureFontWeight: FontWeightTokens = {
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700,
};

const azureLightColors = createLightTheme(brandAzure);
export const azureDarkColors = createDarkTheme(brandAzure);

export const azureLightTheme: Theme = {
  ...azureLightColors,
  ...azureFontWeight,
};

export const azureDarkTheme: Theme = {
  ...azureDarkColors,
  ...azureFontWeight,
};
