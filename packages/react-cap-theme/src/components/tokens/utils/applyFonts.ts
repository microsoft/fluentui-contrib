import type { Theme as FluentTheme } from "@fluentui/tokens";
import {
	generateFontFamilyTokens,
	generateFontWeightTokens,
} from "../alias/fonts/index";
import { fontSizes, fontStyles, lineHeights } from "../global/fonts";
import type {
	FontFamilyCustomFontTokens,
	FontVariants,
	FontWeightCustomFontTokens,
	Theme,
} from "../types";

/**
 * @beta
 * TODO: Remove this. It was added by the feature team to support product-specific logic, but it should have been handled outside the library—or by extending the theme creation capability.
 * CAP Design System apply font to theme
 */
export const applyFonts = (theme: FluentTheme, font?: FontVariants): Theme => {
	const fontFamilies: FontFamilyCustomFontTokens | undefined =
		font && generateFontFamilyTokens(font);
	const fontWeights: Partial<FontWeightCustomFontTokens> | undefined =
		font && generateFontWeightTokens(font);

	return {
		...theme,
		...fontFamilies,
		...fontSizes,
		...fontStyles,
		...fontWeights,
		...lineHeights,
		borderRadius2XLarge: theme.borderRadiusXLarge,
		borderRadius4XLarge: theme.borderRadiusXLarge,
		colorNeutralStroke4: theme.colorNeutralStroke1,
		colorNeutralStroke4Hover: theme.colorNeutralStroke1Hover,
		colorNeutralStroke4Pressed: theme.colorNeutralStroke1Pressed,
	};
};
