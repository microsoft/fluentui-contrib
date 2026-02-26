import type {
	PopoverSurfaceSlots,
	PopoverSurfaceState,
} from "@fluentui/react-popover";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * Arrow height constants for popover positioning calculations.
 *
 * @example
 * ```tsx
 * import { arrowHeights } from '@fluentui-contrib/react-cap-theme/react-popover';
 *
 * const offset = arrowHeights.medium;
 * ```
 *
 * @alpha
 */
export { arrowHeights } from "@fluentui/react-popover";

/**
 * Class names for PopoverSurface component slots.
 *
 * @example
 * ```tsx
 * import { popoverSurfaceClassNames } from '@fluentui-contrib/react-cap-theme/react-popover';
 *
 * <div className={popoverSurfaceClassNames.root}>
 *   Custom popover surface
 * </div>
 * ```
 *
 * @alpha
 */
export const popoverSurfaceClassNames: SlotClassNames<PopoverSurfaceSlots> = {
	root: "fui-PopoverSurface",
};

const useStyles = makeStyles({
	root: {
		borderRadius: tokens.borderRadius4XLarge,
	},
	inverted: {
		backgroundColor: tokens.colorNeutralBackgroundInverted,
		color: tokens.colorNeutralForegroundInverted,
	},
});

/**
 * Applies styling to the PopoverSurface component based on its state.
 *
 * This hook merges the CAP design system styles with the base Fluent UI styles,
 * applying the appropriate visual treatment including border radius and inverted appearance
 * when specified.
 *
 * @example
 * ```tsx
 * const state = usePopoverSurface(props, ref);
 * usePopoverSurfaceStyles(state);
 * ```
 *
 * @param state - The state object for the PopoverSurface component, containing slot and appearance information
 * @returns The updated state object with applied class names for styling
 * @alpha
 */
export const usePopoverSurfaceStyles = (
	state: PopoverSurfaceState,
): PopoverSurfaceState => {
	const styles = useStyles();

	state.root.className = mergeClasses(
		popoverSurfaceClassNames.root,
		state.root.className,
		styles.root,
		state.appearance === "inverted" && styles.inverted,
	);

	return state;
};
