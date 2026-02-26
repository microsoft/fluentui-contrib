import {
	useSwatchPickerStyles_unstable,
	type SwatchPickerSlots,
	type SwatchPickerState,
} from "@fluentui/react-swatch-picker";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";

/**
 * CSS class names for MenuItemSwatchPicker component slots.
 * @alpha
 */
export const menuItemSwatchPickerClassNames: SlotClassNames<SwatchPickerSlots> =
	{
		root: "fui-MenuItemSwatchPicker",
	};

const useStyles = makeStyles({
	root: {
		...shorthands.padding(
			tokens.spacingVerticalMNudge,
			tokens.spacingHorizontalMNudge,
		),
	},
});

/**
 * Applies CAP-specific styling to MenuItemSwatchPicker component.
 * @param state - The MenuItemSwatchPicker state object
 * @returns The updated state with applied styles
 * @alpha
 */
export const useMenuItemSwatchPickerStyles = (
	state: SwatchPickerState,
): SwatchPickerState => {
	const styles = useStyles();
	state.root.className = mergeClasses(
		menuItemSwatchPickerClassNames.root,
		styles.root,
		state.root.className,
	);
	useSwatchPickerStyles_unstable(state);
	return state;
};
