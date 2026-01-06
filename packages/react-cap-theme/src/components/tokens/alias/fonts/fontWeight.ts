import type { Font, FontVariants, FontWeightCustomFontTokens } from '../../types';

/**
 * Generates alias tokens that stored the custom font weight
 * @param font - Font Variants
 * @returns ProjectTurtle design tokens for alias font weights
 */
export const generateTokens = (font: FontVariants): Partial<FontWeightCustomFontTokens> => {
  const tokens: Partial<FontWeightCustomFontTokens> = {};
  const fontKeys: string[] = Object.keys(font);

  fontKeys.forEach((key) => {
    const fontKey: Font = Number(key) as Font;
    const value: number | undefined = font[fontKey].fontWeight;
    if (value !== undefined) {
      tokens[`fontWeightCustomFont${fontKey}`] = value;
    }
  });

  return tokens;
};
