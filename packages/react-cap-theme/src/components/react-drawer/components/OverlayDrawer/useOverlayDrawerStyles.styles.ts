import { useOverlayDrawerStyles_unstable } from "@fluentui/react-drawer";
import type {
	OverlayDrawerState,
	OverlayDrawerSlots,
} from "@fluentui/react-drawer";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { mergeClasses } from "@griffel/react";

import { useDrawerBaseClassNames } from "../../shared/useDrawerBaseStyles.styles";

/**
 * CSS class names for OverlayDrawer component slots.
 * @alpha
 */
export const overlayDrawerClassNames: SlotClassNames<
	Omit<OverlayDrawerSlots, "backdropMotion" | "surfaceMotion">
> & {
	backdrop: string; // Fluent doesn't export OverlayDrawerSurfaceSlots to access this slot
} = {
	root: "fui-OverlayDrawer",
	backdrop: "fui-OverlayDrawer__backdrop",
};

/**
 * Apply styling to the OverlayDrawer based on the state.
 * @param state - The current OverlayDrawer state
 * @returns The updated OverlayDrawer state with applied styles
 * @alpha
 */
export const useOverlayDrawerStyles = (
	state: OverlayDrawerState,
): OverlayDrawerState => {
	const baseClassNames = useDrawerBaseClassNames(state);

	const backdrop = state.root.backdrop as
		| React.HTMLAttributes<HTMLDivElement>
		| undefined;

	state.root.className = mergeClasses(
		overlayDrawerClassNames.root,
		baseClassNames,
		state.root.className,
	);

	if (backdrop) {
		backdrop.className = mergeClasses(
			overlayDrawerClassNames.backdrop,
			backdrop.className,
		);
	}

	useOverlayDrawerStyles_unstable(state);

	return state;
};
