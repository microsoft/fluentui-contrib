import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	iconFilledClassName,
	iconRegularClassName,
} from "@fluentui-contrib/react-cap-theme/react-icons";
import { useInputStyles } from "@fluentui-contrib/react-cap-theme/react-input";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

import type { SearchBoxSlots, SearchBoxState } from "./SearchBox.types";

/**
 * CSS class names for the SearchBox component slots.
 * @alpha
 */
export const searchBoxClassNames: SlotClassNames<SearchBoxSlots> = {
	root: "fui-SearchBox",
	contentBefore: "fui-SearchBox__contentBefore",
	contentAfter: "fui-SearchBox__contentAfter",
	dismiss: "fui-SearchBox__dismiss",
	input: "fui-SearchBox__input",
	separator: "fui-SearchBox__separator",
};

const useStyles = makeStyles({
	root: { maxWidth: "468px", display: "flex" },
	input: {
		flex: "1 1 0%",
		// removes the WebKit pseudoelement styling
		"::-webkit-search-decoration": { display: "none" },
		"::-webkit-search-cancel-button": { display: "none" },
	},
	isEditableHasInputValue: {
		":active,:focus-within": {
			[`& .${searchBoxClassNames.dismiss}`]: { display: "flex" },
		},
	},
	isEditablHasInputValueHasContentAfter: {
		":active,:focus-within": {
			[`& .${searchBoxClassNames.separator}`]: { display: "flex" },
		},
	},
});

const useSeparatorStyles = makeStyles({
	root: {
		display: "none",
		alignSelf: "stretch",
		borderLeft: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1Pressed}`,
		margin: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
	},
});

const useDismissStyles = makeStyles({
	root: {
		display: "none",
		alignSelf: "center",
		boxSizing: "border-box",
		color: tokens.colorNeutralForeground3,
		cursor: "pointer",

		"> svg": { fontSize: tokens.fontSizeBase500 },

		":hover": {
			[`& .${iconRegularClassName}`]: { display: "none" },
			[`& .${iconFilledClassName}`]: { display: "inline" },
		},
	},
	small: { "> svg": { fontSize: tokens.fontSizeBase400 } },
	medium: {
		/* same as root */
	},
	large: {
		/* same as root */
	},
	contentAfter: { marginRight: tokens.spacingHorizontalXS },
});

const useFilledInsetStyles = makeStyles({
	root: {
		"border-color": tokens.colorTransparentStroke, // High contrast support
		backgroundColor: tokens.colorNeutralBackground2,
		borderRadius: tokens.borderRadiusCircular,
		boxShadow: `0 1px 3px 0 ${tokens.colorNeutralShadowAmbient} inset`,
	},
	isEditable: {
		":hover": { backgroundColor: tokens.colorNeutralBackground2Hover },
		":active,:focus-within": { boxShadow: "none" },
	},
	disabled: {
		backgroundColor: tokens.colorNeutralBackgroundDisabled,
		"border-color": tokens.colorNeutralStrokeDisabled,
	},
	readOnly: {
		backgroundColor: tokens.colorTransparentBackground,
		boxShadow: "none",
	},
});

/**
 * Apply styling to the SearchBox based on the state.
 * @param state - The state of the SearchBox component
 * @returns The updated state with styles applied
 * @alpha
 */
export const useSearchBoxStyles = (state: SearchBoxState): SearchBoxState => {
	const styles = useStyles();
	const filledInsetStyles = useFilledInsetStyles();
	const separatorStyles = useSeparatorStyles();
	const dismissStyles = useDismissStyles();

	const { appearance, size } = state;
	const { disabled, readOnly } = state.input;
	const isEditable = !disabled && !readOnly;
	const hasInputValue = !!state.input.value;
	const contentAfter = !!state.contentAfter?.children;

	const filledInsetStyling = mergeClasses(
		filledInsetStyles.root,
		isEditable && filledInsetStyles.isEditable,
		disabled && filledInsetStyles.disabled,
		readOnly && filledInsetStyles.readOnly,
	);

	state.root.className = mergeClasses(
		searchBoxClassNames.root,
		styles.root,
		appearance === "filled-inset" && filledInsetStyling,
		isEditable && hasInputValue && styles.isEditableHasInputValue,
		isEditable &&
			hasInputValue &&
			contentAfter &&
			styles.isEditablHasInputValueHasContentAfter,
		state.root.className,
	);

	if (state.separator) {
		state.separator.className = mergeClasses(
			searchBoxClassNames.separator,
			separatorStyles.root,
			state.separator.className,
		);
	}

	if (state.dismiss) {
		state.dismiss.className = mergeClasses(
			searchBoxClassNames.dismiss,
			dismissStyles.root,
			dismissStyles[size],
			contentAfter && dismissStyles.contentAfter,
			state.dismiss.className,
		);
	}

	if (state.contentBefore) {
		state.contentBefore.className = mergeClasses(
			searchBoxClassNames.contentBefore,
			state.contentBefore.className,
		);
	}

	if (state.contentAfter) {
		state.contentAfter.className = mergeClasses(
			searchBoxClassNames.contentAfter,
			state.contentAfter.className,
		);
	}

	if (state.input) {
		state.input.className = mergeClasses(
			searchBoxClassNames.input,
			styles.input,
			state.input.className,
		);
	}

	useInputStyles({ ...state, appearance: "outline", color: "brand" });

	return state;
};
