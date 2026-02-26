import { useBreadcrumbButtonStyles_unstable } from "@fluentui/react-breadcrumb";
import type {
	BreadcrumbButtonSlots,
	BreadcrumbButtonState,
} from "@fluentui/react-breadcrumb";
import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	buttonClassNames,
	useButtonStyles,
} from "@fluentui-contrib/react-cap-theme/react-button";
import {
	tokens,
	typographyStyles,
} from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CSS class names for the BreadcrumbButton component slots.
 * @alpha
 */
export const breadcrumbButtonClassNames: SlotClassNames<BreadcrumbButtonSlots> =
	{
		root: "fui-BreadcrumbButton",
		icon: "fui-BreadcrumbButton__icon",
	};

const fluentButtonIcon = "fui-Button__icon";
const iconFilledClassName = "fui-Icon-filled";
const iconRegularClassName = "fui-Icon-regular";

const currentStateStyles = {
	color: tokens.colorNeutralForeground3,
	backgroundColor: tokens.colorTransparentBackground,
	[`& .${iconFilledClassName}`]: { display: "none" },
	[`& .${iconRegularClassName}`]: { display: "inline" },
	[`& .${fluentButtonIcon}`]: { color: "unset" },
};

const useStyles = makeStyles({
	root: { height: "unset" },
	small: {},
	medium: {},
	large: {
		...typographyStyles.subtitle1,
		fontWeight: tokens.fontSizeBase400,
		paddingTop: tokens.spacingVerticalSNudge,
		paddingBottom: tokens.spacingVerticalSNudge,
	},
	current: {
		fontWeight: tokens.fontWeightSemibold,
		":hover": currentStateStyles,
		":active:hover": {
			...currentStateStyles,
			[`& .${buttonClassNames.icon}`]: { color: "unset" },
		},
	},
});

const useIconOnlyStyles = makeStyles({
	small: {},
	medium: {},
	large: {
		paddingTop: tokens.spacingVerticalMNudge,
		paddingBottom: tokens.spacingVerticalMNudge,
	},
	icon: { marginRight: tokens.spacingHorizontalNone },
});

/**
 * Apply styling to the BreadcrumbButton based on the state.
 * @param state - The BreadcrumbButton state object
 * @returns The styled BreadcrumbButton state
 * @alpha
 */
export const useBreadcrumbButtonStyles = (
	state: BreadcrumbButtonState,
): BreadcrumbButtonState => {
	const styles = useStyles();
	const iconOnlyStyles = useIconOnlyStyles();
	const { current, iconOnly, size } = state;

	state.root.className = mergeClasses(
		breadcrumbButtonClassNames.root,
		styles.root,
		styles[size],
		iconOnly && iconOnlyStyles[size],
		current && styles.current,
		state.root.className,
	);

	if (state.icon) {
		state.icon.className = mergeClasses(
			breadcrumbButtonClassNames.icon,
			iconOnly && iconOnlyStyles.icon,
			state.icon.className,
		);
	}

	useButtonStyles(state);
	useBreadcrumbButtonStyles_unstable(state);

	return state;
};
