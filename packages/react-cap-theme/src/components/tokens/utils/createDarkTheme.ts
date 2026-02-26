import type { BrandVariants, Theme as FluentTheme } from "@fluentui/tokens";
import { createDarkTheme as createFluentDarkTheme } from "@fluentui/tokens";
import { generateBrandColorTokens } from "../alias/colors/darkColor";
import {
	generateFontFamilyTokens,
	generateFontWeightTokens,
} from "../alias/fonts";
import { brandCAP } from "../global/brandColors";
import { fontSizes, fontStyles, lineHeights } from "../global/fonts";
import type {
	FontFamilyCustomFontTokens,
	FontVariants,
	FontWeightCustomFontTokens,
	Theme,
} from "../types";

/**
 * @public
 * Creates CAP Design System dark theme
 * @param brand - Brand Variants
 * @param font - Font Variants
 * @returns Theme
 * @deprecated The dark theme is deprecated and will be removed in a future version. Use createLightTheme instead.
 */
export const createDarkTheme: (
	brand?: BrandVariants,
	font?: FontVariants,
) => Theme = (brand = brandCAP, font) => {
	const fluentTheme: FluentTheme = createFluentDarkTheme(brand);
	const fontFamilies: FontFamilyCustomFontTokens | undefined =
		font && generateFontFamilyTokens(font);
	const fontWeights: Partial<FontWeightCustomFontTokens> | undefined =
		font && generateFontWeightTokens(font);

	return {
		...fluentTheme,
		...fontFamilies,
		...fontSizes,
		...fontStyles,
		...fontWeights,
		...lineHeights,
		...generateBrandColorTokens(brand),
		borderRadius2XLarge: fluentTheme.borderRadiusXLarge,
		borderRadius4XLarge: fluentTheme.borderRadiusXLarge,
		colorNeutralStroke4: fluentTheme.colorNeutralStroke1,
		colorNeutralStroke4Hover: fluentTheme.colorNeutralStroke1Hover,
		colorNeutralStroke4Pressed: fluentTheme.colorNeutralStroke1Pressed,
	};
};
