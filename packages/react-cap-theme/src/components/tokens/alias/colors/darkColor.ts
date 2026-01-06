import type { BrandVariants } from '@fluentui/tokens';
import type { ColorTokens } from '../../types';

/**
 * Reassign brand color palette to alias tokens representing brand colors
 * @param brand - Color ramp
 * @returns modified alias tokens
 */
export const generateBrandColorTokens = (brand: BrandVariants): Partial<ColorTokens> => ({
  colorNeutralForeground2BrandHover: brand[110],
  colorNeutralForeground2BrandPressed: brand[90],
  colorNeutralForeground2BrandSelected: brand[110],
  colorNeutralForeground3BrandHover: brand[110],
  colorNeutralForeground3BrandPressed: brand[90],
  colorNeutralForeground3BrandSelected: brand[110],
  colorBrandForegroundLink: brand[110],
  colorBrandForegroundLinkHover: brand[130],
  colorBrandForegroundLinkPressed: brand[100],
  colorBrandForegroundLinkSelected: brand[110],
  colorCompoundBrandForeground1: brand[110],
  colorCompoundBrandForeground1Hover: brand[130],
  colorCompoundBrandForeground1Pressed: brand[100],
  colorBrandForeground1: brand[110],
  colorBrandForeground2: brand[120],
  colorBrandForeground2Hover: brand[140],
  colorBrandForeground2Pressed: brand[160],
  colorBrandForegroundOnLight: brand[80],
  colorBrandForegroundOnLightHover: brand[70],
  colorBrandForegroundOnLightPressed: brand[40],
  colorBrandForegroundOnLightSelected: brand[60],
  colorBrandBackground: brand[70],
  colorBrandBackgroundHover: brand[80],
  colorBrandBackgroundPressed: brand[40],
  colorBrandBackgroundSelected: brand[60],
  colorCompoundBrandBackground: brand[110],
  colorCompoundBrandBackgroundHover: brand[130],
  colorCompoundBrandBackgroundPressed: brand[90],
  colorBrandBackgroundStatic: brand[80],
  colorBrandBackground2: brand[20],
  colorBrandBackground2Hover: brand[40],
  colorBrandBackground2Pressed: brand[10],
  colorBrandBackgroundInvertedHover: brand[160],
  colorBrandBackgroundInvertedPressed: brand[140],
  colorBrandBackgroundInvertedSelected: brand[160],
  colorBrandStroke1: brand[110],
  colorBrandStroke2: brand[50],
  colorBrandStroke2Hover: brand[70],
  colorBrandStroke2Pressed: brand[40],
  colorCompoundBrandStroke: brand[110],
  colorCompoundBrandStrokeHover: brand[130],
  colorCompoundBrandStrokePressed: brand[100]
});
