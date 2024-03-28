import type { BrandVariants } from '@fluentui/tokens';
import { createLightTheme, createDarkTheme } from '@fluentui/tokens';

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

export const azureLightTheme = createLightTheme(brandAzure);
export const azureDarkTheme = createDarkTheme(brandAzure);
