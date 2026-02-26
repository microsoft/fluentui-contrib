import type { SlotClassNames } from "@fluentui/react-utilities";
import { useAvatarStyles_unstable } from "@fluentui-contrib/react-cap-theme";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type {
	AppBarAvatarSlots,
	AppBarAvatarState,
} from "./AppBarAvatar.types";

/**
 * CSS class names for AppBarAvatar component slots.
 * @alpha
 */
export const appBarAvatarClassNames: SlotClassNames<AppBarAvatarSlots> = {
	root: "fui-AppBarAvatar",
	image: "fui-AppBarAvatar__image",
	icon: "fui-AppBarAvatar__icon",
};

const useStyles = makeStyles({
	root: {
		backgroundColor: tokens.colorTransparentBackground,
		borderRadius: tokens.borderRadiusXLarge,
		color: tokens.colorNeutralForeground1,
	},
	icon: {
		fontSize: tokens.fontSizeBase600,
	},
});

/**
 * Apply styling to the AppBarAvatar component based on the state.
 * @param state - The current AppBarAvatar state
 * @returns The updated AppBarAvatar state with applied styles
 * @alpha
 */
export const useAppBarAvatarStyles = (
	state: AppBarAvatarState,
): AppBarAvatarState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		appBarAvatarClassNames.root,
		styles.root,
		state.root.className,
	);

	if (state.image) {
		state.image.className = mergeClasses(
			appBarAvatarClassNames.image,
			styles.root,
			state.image.className,
		);
	}

	if (state.icon) {
		state.icon.className = mergeClasses(
			appBarAvatarClassNames.icon,
			styles.root,
			styles.icon,
			state.icon.className,
		);
	}

	useAvatarStyles_unstable(state);
	return state;
};
