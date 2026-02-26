import { useOptionGroupStyles_unstable } from "@fluentui/react-combobox";
import type {
	OptionGroupSlots,
	OptionGroupState,
} from "@fluentui/react-combobox";
import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	tokens,
	typographyStyles,
} from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CSS class names for the OptionGroup component slots.
 * @alpha
 */
export const optionGroupClassNames: SlotClassNames<OptionGroupSlots> = {
	root: "fui-OptionGroup",
	label: "fui-OptionGroup__label",
};

const useStyles = makeStyles({
	root: {
		rowGap: 0,

		"&:not(:last-child)::after": {
			borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke3}`,
			paddingBottom: 0,
			margin: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalXS}`,
		},
	},

	label: {
		borderRadius: tokens.borderRadiusLarge,
		color: tokens.colorNeutralForeground2,
		padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalS} ${tokens.spacingVerticalS}`,
		...typographyStyles.caption1Strong,
	},
});

/**
 * Apply styling to the OptionGroup slots based on the state
 * @param state - The current OptionGroup state
 * @returns The updated OptionGroup state with applied styles
 * @alpha
 */
export const useOptionGroupStyles = (
	state: OptionGroupState,
): OptionGroupState => {
	const styles = useStyles();
	state.root.className = mergeClasses(
		optionGroupClassNames.root,
		styles.root,
		state.root.className,
	);

	if (state.label) {
		state.label.className = mergeClasses(
			optionGroupClassNames.label,
			styles.label,
			state.label.className,
		);
	}

	useOptionGroupStyles_unstable(state);

	return state;
};
