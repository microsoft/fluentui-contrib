import type { ImageState } from "@fluentui/react-image";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";

/**
 * Styles for the Image
 */
const useStyles = makeStyles({
	root: {
		// Base styles for the image
	},
	bordered: {
		...shorthands.borderColor(tokens.colorNeutralStroke1),
		...shorthands.borderWidth(tokens.strokeWidthThin),
	},
	shadow: {
		boxShadow: tokens.shadow8,
	},
});

/**
 * @public
 * Apply styling to the Image slots based on the state
 */
export const useImageStyles = (state: ImageState): ImageState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		state.root.className,
		styles.root,
		state.bordered && styles.bordered,
		state.shadow && styles.shadow,
	);

	return state;
};
