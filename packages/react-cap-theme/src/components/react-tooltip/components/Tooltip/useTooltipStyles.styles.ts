import {
	tokens,
	typographyStyles,
} from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { TooltipState } from "./Tooltip.types";

/**
 * Styles for the tooltip
 */
const useStyles = makeStyles({
	root: {
		...typographyStyles.caption1Strong,
		borderRadius: tokens.borderRadiusXLarge,
		padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalMNudge}`,
	},
	brand: {
		backgroundColor: tokens.colorBrandBackground,
		color: tokens.colorNeutralForegroundOnBrand,
	},
});

/**
 * @public
 * Apply styling to the Tooltip slots based on the state
 */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
	const styles = useStyles();

	state.content.className = mergeClasses(
		state.content.className,
		styles.root,
		state.appearance === "brand" && styles.brand,
	);

	return state;
};
