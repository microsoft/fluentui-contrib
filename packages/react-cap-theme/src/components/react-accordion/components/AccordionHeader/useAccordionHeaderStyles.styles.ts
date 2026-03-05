import type { AccordionHeaderState } from "@fluentui/react-accordion";
import {
	iconFilledClassName,
	iconRegularClassName,
} from "@fluentui/react-icons";
import { createFocusOutlineStyle } from "@fluentui/react-tabster";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * Styles for the AccordionHeader
 */

const useStyles = makeStyles({
	root: {
		":hover": {
			[`& .${iconFilledClassName}`]: {
				display: "inline",
			},
			[`& .${iconRegularClassName}`]: {
				display: "none",
			},
		},
	},
	button: {
		padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalS}`,
		// Override focus outline border-radius to match root
		// (Fluent default is borderRadiusMedium, hardcoded in ::after)
		...createFocusOutlineStyle({
			style: { outlineRadius: tokens.borderRadius2XLarge },
		}),
		minHeight: "36px",
	},
	buttonSmall: {
		minHeight: "28px",
	},
	buttonLarge: {
		minHeight: "44px",
	},
	buttonExtraLarge: {
		minHeight: "52px",
	},
	expandIconSmall: {
		fontSize: tokens.fontSizeBase200,
	},
	expandIconMedium: {
		fontSize: tokens.fontSizeBase400,
	},
	expandIconStart: {
		paddingRight: tokens.spacingHorizontalSNudge,
	},
	expandIconEnd: {
		paddingLeft: tokens.spacingHorizontalSNudge,
	},
	icon: {
		paddingRight: tokens.spacingHorizontalSNudge,
	},
	iconSmall: {
		fontSize: tokens.fontSizeBase400,
	},
	iconLargeOrExtraLarge: {
		fontSize: tokens.fontSizeBase600,
	},
});

/**
 * @public
 * Apply styling to the AccordionHeader slots based on the state
 */
export const useAccordionHeaderStyles = (
	state: AccordionHeaderState,
): AccordionHeaderState => {
	const styles = useStyles();

	state.root.className = mergeClasses(state.root.className, styles.root);

	state.button.className = mergeClasses(
		state.button.className,
		styles.button,
		state.size === "small" && styles.buttonSmall,
		state.size === "large" && styles.buttonLarge,
		state.size === "extra-large" && styles.buttonExtraLarge,
	);
	if (state.expandIcon) {
		state.expandIcon.className = mergeClasses(
			state.expandIcon.className,
			state.size === "small" && styles.expandIconSmall,
			state.size === "medium" && styles.expandIconMedium,
			state.expandIconPosition === "start" && styles.expandIconStart,
			state.expandIconPosition === "end" && styles.expandIconEnd,
		);
	}
	if (state.icon) {
		state.icon.className = mergeClasses(
			state.icon.className,
			styles.icon,
			state.size === "small" && styles.iconSmall,
			(state.size === "large" || state.size === "extra-large") &&
				styles.iconLargeOrExtraLarge,
		);
	}
	return state;
};
