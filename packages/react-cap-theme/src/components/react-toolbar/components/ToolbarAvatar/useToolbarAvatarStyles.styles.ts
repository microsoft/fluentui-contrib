import type { SlotClassNames } from "@fluentui/react-utilities";
import type {
	AvatarSlots,
	AvatarState,
} from "@fluentui-contrib/react-cap-theme/react-avatar";
import { useAvatarStyles } from "@fluentui-contrib/react-cap-theme/react-avatar";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * Class names for the ToolbarAvatar component.
 * @alpha
 */
export const toolbarAvatarClassNames: Partial<SlotClassNames<AvatarSlots>> = {
	root: "fui-ToolbarAvatar",
};

const useStyles = makeStyles({
	root: {
		margin: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXXS}`,
	},
});

/**
 * Update the given state with styles for the toolbar Avatar component.
 * @param state - The avatar state to apply styles to
 * @returns AvatarState
 * @alpha
 */
export const useToolbarAvatarStyles = (state: AvatarState): AvatarState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		toolbarAvatarClassNames.root,
		styles.root,
		state.root.className,
	);

	return useAvatarStyles(state);
};
