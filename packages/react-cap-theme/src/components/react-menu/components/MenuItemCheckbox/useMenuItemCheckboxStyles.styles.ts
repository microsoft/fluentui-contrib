import type {
	MenuItemCheckboxState,
	MenuItemSlots,
} from "@fluentui/react-menu";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { makeStyles, mergeClasses } from "@griffel/react";
import { useMenuItemStyles } from "../MenuItem/useMenuItemStyles.styles";

/**
 * CSS class names for MenuItemCheckbox component slots.
 * @alpha
 */
export const menuItemCheckboxClassNames: SlotClassNames<MenuItemSlots> = {
	root: "fui-MenuItemCheckbox",
	content: "fui-MenuItemCheckbox__content",
	icon: "fui-MenuItemCheckbox__icon",
	checkmark: "fui-MenuItemCheckbox__checkmark",
	submenuIndicator: "fui-MenuItemCheckbox__submenuIndicator",
	secondaryContent: "fui-MenuItemCheckbox__secondaryContent",
	subText: "fui-MenuItemCheckbox__subText",
};

const useStyles = makeStyles({
	checkmark: {
		fontSize: "20px",
		height: "20px",
		width: "20px",
	},
});

/**
 * Applies CAP-specific styling to MenuItemCheckbox component.
 * @param state - The MenuItemCheckbox state object
 * @returns The updated state with applied styles
 * @alpha
 */
export const useMenuItemCheckboxStyles = (
	state: MenuItemCheckboxState,
): MenuItemCheckboxState => {
	const styles = useStyles();

	if (state.checkmark) {
		state.checkmark.className = mergeClasses(
			menuItemCheckboxClassNames.checkmark,
			styles.checkmark,
			state.checkmark.className,
		);
	}

	useMenuItemStyles(state);

	return state;
};
