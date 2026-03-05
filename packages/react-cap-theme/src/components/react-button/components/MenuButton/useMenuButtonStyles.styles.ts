import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import { useButtonStyles } from "../Button/useButtonStyles.styles";
import type { MenuButtonSlots, MenuButtonState } from "./MenuButton.types";

/**
 * Class names for the MenuButton component.
 * @alpha
 */
export const menuButtonClassNames: SlotClassNames<MenuButtonSlots> = {
	root: "fui-MenuButton",
	icon: "fui-MenuButton__icon",
	menuIcon: "fui-MenuButton__menuIcon",
};

const useMenuIconStyles = makeStyles({
	base: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	// Size appearance
	small: {
		fontSize: tokens.fontSizeBase200,
		height: "16px",
		lineHeight: tokens.lineHeightBase200,
		width: "16px",
	},
	medium: {
		fontSize: tokens.fontSizeBase400,
		height: "20px",
		lineHeight: tokens.lineHeightBase400,
		width: "20px",
	},
	large: {
		fontSize: tokens.fontSizeBase400,
		height: "20px",
		lineHeight: tokens.lineHeightBase400,
		width: "20px",
	},

	// No-icon only
	noIconOnly: {
		marginLeft: tokens.spacingHorizontalSNudge,
	},
});

/**
 * Apply styles to the MenuButton component.
 * Handles CAP-specific styling including menu icon positioning and sizing.
 * @param state - The MenuButton state to apply styles to
 * @returns The updated MenuButton state with applied styles
 * @alpha
 */
export const useMenuButtonStyles = (
	state: MenuButtonState,
): MenuButtonState => {
	const menuIconStyles = useMenuIconStyles();

	if (state.menuIcon) {
		state.menuIcon.className = mergeClasses(
			state.menuIcon.className,
			menuButtonClassNames.menuIcon,
			menuIconStyles.base,
			menuIconStyles[state.size],
			!state.iconOnly && menuIconStyles.noIconOnly,
		);
	}

	useButtonStyles({ ...state, iconPosition: "before" });
	return state;
};
