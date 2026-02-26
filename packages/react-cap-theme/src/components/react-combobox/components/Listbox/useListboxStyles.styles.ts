import { useListboxStyles_unstable } from "@fluentui/react-combobox";
import type { ListboxSlots, ListboxState } from "@fluentui/react-combobox";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

/**
 * CSS class names for the Listbox component slots.
 * @alpha
 */
export const listboxClassNames: SlotClassNames<ListboxSlots> = {
	root: "fui-Listbox",
};

const useStyles = makeStyles({
	root: {
		border: `1px solid ${tokens.colorNeutralStrokeAlpha}`,
		borderRadius: tokens.borderRadiusXLarge,
		boxShadow: tokens.shadow4,
		maxHeight: "80vh",
		padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,
	},
});

/**
 * Apply styling to the Listbox slots based on the state
 * @param state - The current Listbox state
 * @returns The updated Listbox state with applied styles
 * @alpha
 */
export const useListboxStyles = (state: ListboxState): ListboxState => {
	const styles = useStyles();
	state.root.className = mergeClasses(
		listboxClassNames.root,
		styles.root,
		state.root.className,
	);

	useListboxStyles_unstable(state);

	return state;
};
