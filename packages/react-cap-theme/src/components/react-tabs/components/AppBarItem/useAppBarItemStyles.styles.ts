import { useTabStyles_unstable } from "@fluentui/react-tabs";
import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	tokens,
	typographyStyles,
} from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { AppBarItemSlots, AppBarItemState } from "./AppBarItem.types";

/**
 * CSS class names for AppBarItem component slots.
 * @alpha
 */
export const appBarItemClassNames: SlotClassNames<AppBarItemSlots> = {
	root: "fui-AppBarItem",
	avatar: "fui-AppBarItem__avatar",
	content: "fui-AppBarItem__content",
};

// These should match the constants defined in @fluentui/react-icons
// This avoids taking a dependency on the icons package for only the constants.
const iconClassNames = {
	filled: "fui-Icon-filled",
	regular: "fui-Icon-regular",
};

const verticalPadding = tokens.spacingVerticalXS;

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
	base: {
		gridTemplateColumns: "1fr",
		padding: `${verticalPadding} ${tokens.spacingHorizontalM}`,
		maxWidth: "80px",
		[`:enabled:hover .${iconClassNames.filled}`]: {
			display: "inline",
		},
		[`:enabled:hover .${iconClassNames.regular}`]: {
			display: "none",
		},
	},
	selected: {
		[`:enabled .${appBarItemClassNames.content}`]: {
			color: tokens.colorCompoundBrandForeground1,
		},
		[`:enabled:hover .${appBarItemClassNames.content}`]: {
			color: tokens.colorCompoundBrandForeground1,
		},
		[`:enabled:active .${appBarItemClassNames.content}`]: {
			color: tokens.colorCompoundBrandForeground1,
		},
	},
});

/**
 * Indicator styles for when pending selection
 */
const usePendingIndicatorStyles = makeStyles({
	base: {
		"::before": {
			height: "20px",
			width: tokens.strokeWidthThickest,
			left: tokens.spacingHorizontalXS,
			top: `calc(${verticalPadding} + ${tokens.spacingVerticalXXS})`,
		},
	},
	horizontal: {
		":hover::before": {
			content: "none",
		},
		":active::before": {
			content: "none",
		},
	},
});
const useActiveIndicatorStyles = makeStyles({
	base: {
		"::after": {
			height: "20px",
			width: tokens.strokeWidthThickest,
			left: tokens.spacingHorizontalXS,
			top: `calc(${verticalPadding} + ${tokens.spacingVerticalXXS})`,
		},
	},
	horizontal: {
		"::after": {
			content: "none",
		},
	},
});

/**
 * Styles for the avatar slot
 */
const useAvatarStyles = makeStyles({
	base: {
		margin: "auto",
		[`& .${iconClassNames.filled}`]: {
			display: "none",
		},
		[`& .${iconClassNames.regular}`]: {
			display: "inline",
		},
	},
	disabled: {
		[`& .${iconClassNames.filled}`]: {
			color: tokens.colorNeutralForegroundDisabled,
		},
		[`& .${iconClassNames.regular}`]: {
			color: tokens.colorNeutralForegroundDisabled,
		},
	},
	selected: {
		[`& .${iconClassNames.filled}`]: {
			color: tokens.colorCompoundBrandForeground1,
			display: "inline",
		},
		[`& .${iconClassNames.regular}`]: {
			display: "none",
		},
	},
});

/**
 * Styles for the content slot
 */
const useContentStyles = makeStyles({
	base: {
		...typographyStyles.caption2Strong,
		padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalXS}`,
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
	avatarBefore: {
		gridColumnStart: 1,
		gridRowStart: 2,
	},
});

/**
 * Applies styles for the AppBarItem indicator based on its current state.
 * @param state - The current AppBarItem state
 * @returns The updated AppBarItem state with applied indicator styles
 * @alpha
 */
export const useAppBarItemIndicatorStyles = (
	state: AppBarItemState,
): AppBarItemState => {
	const rootStyles = useRootStyles();
	const pendingIndicatorStyles = usePendingIndicatorStyles();
	const activeIndicatorStyles = useActiveIndicatorStyles();

	state.root.className = mergeClasses(
		appBarItemClassNames.root,
		rootStyles.base,
		pendingIndicatorStyles.base,
		activeIndicatorStyles.base,
		state.selected && rootStyles.selected,
		state.horizontal && pendingIndicatorStyles.horizontal,
		state.horizontal && activeIndicatorStyles.horizontal,
		state.root.className,
	);

	return state;
};

/**
 * Applies styles to the AppBarItem button slot based on its current state.
 * @param state - The current AppBarItem state
 * @param slot - The button slot to style
 * @returns The updated AppBarItem state with applied button styles
 * @alpha
 */
export const useAppBarItemButtonStyles = (
	state: AppBarItemState,
	slot: AppBarItemState["root"],
): AppBarItemState => {
	// AppBarItem-specific button styling can be added here
	// For now, we rely on the root styles applied in useAppBarItemIndicatorStyles

	return state;
};

/**
 * Applies styles to the AppBarItem content and avatar slots based on current state.
 * @param state - The current AppBarItem state
 * @returns The updated AppBarItem state with applied content and avatar styles
 * @alpha
 */
export const useAppBarItemContentStyles = (
	state: AppBarItemState,
): AppBarItemState => {
	const avatarStyles = useAvatarStyles();
	const contentStyles = useContentStyles();

	state.content.className = mergeClasses(
		appBarItemClassNames.content,
		contentStyles.base,
		state.avatar && contentStyles.avatarBefore,
		state.content.className,
	);

	if (state.avatar) {
		state.avatar.className = mergeClasses(
			appBarItemClassNames.avatar,
			avatarStyles.base,
			state.selected && avatarStyles.selected,
			state.disabled && avatarStyles.disabled,
			state.avatar.className,
		);
	}

	return state;
};

/**
 * Apply styling to the AppBarItem slots based on the state.
 * @param state - The current AppBarItem state
 * @returns The updated AppBarItem state with all styles applied
 * @alpha
 */
export const useAppBarItemStyles = (
	state: AppBarItemState,
): AppBarItemState => {
	// Apply AppBarItem-specific indicator styles first
	useAppBarItemIndicatorStyles(state);

	// Apply AppBarItem-specific button styles
	useAppBarItemButtonStyles(state, state.root);

	// Apply AppBarItem-specific content styles
	useAppBarItemContentStyles(state);

	// Apply base Tab styles to inherit from Tab component
	// Create a temporary state with vertical property for FluentUI Tab styles
	useTabStyles_unstable({
		...state,
		components: { ...state.components, icon: "span" },
		vertical: !state.horizontal,
		iconOnly: state.avatarOnly,
	});

	return state;
};
