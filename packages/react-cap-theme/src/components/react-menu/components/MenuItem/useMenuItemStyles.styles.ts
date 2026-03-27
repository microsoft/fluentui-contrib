import {
	menuItemClassNames as fluentMenuItemClassNames,
	type MenuItemSlots,
	type MenuItemState,
	useMenuItemStyles_unstable,
} from "@fluentui/react-menu";
import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	tokens,
	typographyStyles,
} from "../../../tokens";
import { makeStyles, mergeClasses } from "@griffel/react";

export const menuItemClassNames: SlotClassNames<MenuItemSlots> = {
	root: "fui-MenuItem",
	content: "fui-MenuItem__content",
	icon: "fui-MenuItem__icon",
	checkmark: "fui-MenuItem__checkmark",
	submenuIndicator: "fui-MenuItem__submenuIndicator",
	secondaryContent: "fui-MenuItem__secondaryContent",
	subText: "fui-MenuItem__subText",
};

const useStyles = makeStyles({
	root: {
		borderRadius: tokens.borderRadiusXLarge,
		color: tokens.colorNeutralForeground3,
		gap: 0,
		minWidth: 0, // allow truncation
		padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,

		":hover": {
			color: tokens.colorNeutralForeground1Hover,
			[`& .${fluentMenuItemClassNames.icon}`]: { color: "currentColor" },
			[`& .${fluentMenuItemClassNames.subText}`]: {
				color: "currentColor",
			},
		},
		":hover:active": {
			[`& .${fluentMenuItemClassNames.subText}`]: {
				color: "currentColor",
			},
		},
	},
	disabled: {
		color: tokens.colorNeutralForegroundDisabled,
		":hover": { color: tokens.colorNeutralForegroundDisabled },
		":hover:active": { color: tokens.colorNeutralForegroundDisabled },
		":focus": { color: tokens.colorNeutralForegroundDisabled },
	},
	content: {
		color: "currentColor",
		flex: 1,
		minWidth: "50px",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	icon: {
		color: "currentColor",
		marginRight: tokens.spacingHorizontalSNudge,
	},
	secondaryContent: {
		...typographyStyles.caption1,
		color: "currentColor",
		alignSelf: "center",
		wordBreak: "break-word",
		":hover": { color: "currentColor" },
		":focus": { color: "currentColor" },
	},
	submenuIndicator: {
		alignSelf: "center",
		color: "currentColor",
		fontSize: "16px",
		height: "16px",
		paddingLeft: tokens.spacingHorizontalXS,
		width: "16px",
	},
	subText: {
		color: "currentColor",
		display: "block", // move below
		...typographyStyles.caption1,
	},
});

const useMultilineStyles = makeStyles({
	content: {
		display: "block", // allow truncation
	},
});

export const useMenuItemStyles = (state: MenuItemState): MenuItemState => {
	const styles = useStyles();
	const multilineStyles = useMultilineStyles();

	const multiline = !!state.subText;
	const { disabled } = state;

	state.root.className = mergeClasses(
		menuItemClassNames.root,
		styles.root,
		disabled && styles.disabled,
		state.root.className,
	);

	if (state.content) {
		state.content.className = mergeClasses(
			menuItemClassNames.content,
			styles.content,
			state.content.className,
		);
	}
	if (state.icon) {
		state.icon.className = mergeClasses(
			menuItemClassNames.icon,
			styles.icon,
			state.icon.className,
		);
	}
	if (state.secondaryContent) {
		state.secondaryContent.className = mergeClasses(
			menuItemClassNames.secondaryContent,
			styles.secondaryContent,
			state.secondaryContent.className,
		);
	}
	if (state.submenuIndicator) {
		state.submenuIndicator.className = mergeClasses(
			menuItemClassNames.submenuIndicator,
			styles.submenuIndicator,
			state.submenuIndicator.className,
		);
	}
	if (state.subText) {
		state.subText.className = mergeClasses(
			menuItemClassNames.subText,
			styles.subText,
			state.subText.className,
		);
	}

	useMenuItemStyles_unstable(state);

	if (state.content) {
		state.content.className = mergeClasses(
			state.content.className,
			multiline && multilineStyles.content,
		);
	}

	return state;
};
