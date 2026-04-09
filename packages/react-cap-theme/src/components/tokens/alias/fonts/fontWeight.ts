import type {
  Font,
  FontVariants,
  FontWeightCustomFontTokens,
} from '../../types';

export const generateTokens = (
  font: FontVariants
): Partial<FontWeightCustomFontTokens> => {
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
