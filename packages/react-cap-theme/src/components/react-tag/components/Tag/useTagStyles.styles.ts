import { createCustomFocusIndicatorStyle } from "@fluentui/react-tabster";
import { useTagStyles_unstable } from "@fluentui/react-tags";
import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	iconFilledClassName,
	iconRegularClassName,
} from "@fluentui-contrib/react-cap-theme/react-icons";
import {
	tokens,
	typographyStyles,
} from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import type { TagSlots, TagState } from "./Tag.types";

/**
 * CSS class names for the CAP Tag component slots.
 * @alpha
 */
export const tagClassNames: SlotClassNames<TagSlots> = {
	root: "fui-Tag",
	media: "fui-Tag__media",
	icon: "fui-Tag__icon",
	primaryText: "fui-Tag__primaryText",
	secondaryText: "fui-Tag__secondaryText",
	dismissIcon: "fui-Tag__dismissIcon",
};

const useRootStyles = makeStyles({
	root: {
		...createCustomFocusIndicatorStyle({
			boxShadow: `
        0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus1} inset,
        0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus2}
      `,
		}),
		"@media (forced-colors: active)": {
			"::before": {
				borderTopLeftRadius: "inherit",
				borderTopRightRadius: "inherit",
			},
			...createCustomFocusIndicatorStyle({
				"::before": { borderTopColor: "Highlight" },
			}),
		},
	},
	medium: {
		height: "36px",
		borderRadius: tokens.borderRadiusXLarge,
		...createCustomFocusIndicatorStyle({
			borderRadius: tokens.borderRadiusXLarge,
		}),
	},
	small: {
		borderRadius: tokens.borderRadiusXLarge,
		...createCustomFocusIndicatorStyle({
			borderRadius: tokens.borderRadiusXLarge,
		}),
	},
	"extra-small": {
		borderRadius: tokens.borderRadiusLarge,
		...createCustomFocusIndicatorStyle({
			borderRadius: tokens.borderRadiusLarge,
		}),
	},
});

const useRootAppearanceStyles = makeStyles({
	filled: {
		backgroundColor: tokens.colorNeutralBackground5,
		color: tokens.colorNeutralForeground3,
	},
	outline: {
		color: tokens.colorNeutralForeground3,
	},
	brand: {
		/* Same as base */
	},
});

const useRootSelectedStyles = makeStyles({
	base: {
		...shorthands.borderColor(tokens.colorTransparentStroke),
		color: tokens.colorNeutralForegroundOnBrand,
		[`& .${iconFilledClassName}`]: {
			display: "inline",
		},
		[`& .${iconRegularClassName}`]: {
			display: "none",
		},

		"@media (forced-colors: active)": {
			...createCustomFocusIndicatorStyle({
				outline: "none",
				boxShadow: `
          0 0 0 ${tokens.strokeWidthThin} ButtonFace inset,
          0 0 0 ${tokens.strokeWidthThick} Highlight
        `,
			}),
		},
	},
	filled: {
		backgroundColor: tokens.colorNeutralBackgroundInverted,
	},
	outline: {
		backgroundColor: tokens.colorNeutralBackgroundInverted,
	},
	brand: {
		/* Same as base */
	},
});

const useRootWithoutMediaStyles = makeStyles({
	base: {
		paddingLeft: tokens.spacingHorizontalS,
	},
});

const useRootWithSecondaryTextStyles = makeStyles({
	base: {
		paddingTop: tokens.spacingVerticalXXS,
		paddingBottom: tokens.spacingVerticalXXS,
	},
});

const useRootWithoutDismissStyles = makeStyles({
	base: {
		paddingRight: tokens.spacingHorizontalS,
	},
	mediumWithMedia: {
		paddingRight: tokens.spacingHorizontalMNudge,
	},
});

const usePrimaryTextStyles = makeStyles({
	medium: {
		...typographyStyles.body1Strong,
	},
	small: {
		...typographyStyles.caption1Strong,
	},
	"extra-small": {
		...typographyStyles.caption1Strong,
	},
	withSecondaryText: {
		...typographyStyles.caption1Strong,
	},
});

const useIconStyles = makeStyles({
	medium: {
		paddingLeft: tokens.spacingHorizontalS,
		paddingRight: tokens.spacingHorizontalSNudge,
	},
	small: {
		paddingLeft: tokens.spacingHorizontalSNudge,
		paddingRight: tokens.spacingHorizontalXS,
	},
	"extra-small": {
		paddingLeft: tokens.spacingHorizontalSNudge,
		paddingRight: tokens.spacingHorizontalXS,
	},
});

const useMediaStyles = makeStyles({
	medium: {
		paddingLeft: tokens.spacingHorizontalS,
		paddingRight: tokens.spacingHorizontalMNudge,
	},
	small: {
		paddingLeft: tokens.spacingHorizontalXXS,
		paddingRight: tokens.spacingHorizontalS,
	},
	"extra-small": {
		paddingLeft: tokens.spacingHorizontalXXS,
		paddingRight: tokens.spacingHorizontalS,
	},
});

const useDismissIconStyles = makeStyles({
	notDisabled: {
		":hover": {
			[`& .${iconFilledClassName}`]: {
				display: "inline",
			},
			[`& .${iconRegularClassName}`]: {
				display: "none",
			},
		},
		":active": {
			[`& .${iconFilledClassName}`]: {
				display: "inline",
			},
			[`& .${iconRegularClassName}`]: {
				display: "none",
			},
		},
	},
	filled: {
		":hover": {
			color: tokens.colorNeutralForeground3Hover,
		},
		":active": {
			color: tokens.colorNeutralForeground3Pressed,
		},
	},
	outline: {
		":hover": {
			color: tokens.colorNeutralForeground3Hover,
		},
		":active": {
			color: tokens.colorNeutralForeground3Pressed,
		},
	},
	brand: {
		":hover": {
			color: tokens.colorBrandForeground2Hover,
		},
		":active": {
			color: tokens.colorBrandForeground2Pressed,
		},
	},
	medium: {
		paddingLeft: tokens.spacingHorizontalSNudge,
		paddingRight: tokens.spacingHorizontalS,
		fontSize: "16px",
	},
	small: {
		paddingLeft: tokens.spacingHorizontalXS,
		paddingRight: tokens.spacingHorizontalSNudge,
		fontSize: "12px",
	},
	"extra-small": {
		paddingLeft: tokens.spacingHorizontalXS,
		paddingRight: tokens.spacingHorizontalSNudge,
		fontSize: "12px",
	},
	selected: {
		":hover": {
			color: tokens.colorNeutralForegroundOnBrand,
		},
		":active": {
			color: tokens.colorNeutralForegroundOnBrand,
		},
	},
});

/**
 * Apply styling to the CAP Tag component.
 *
 * @param state - The Tag state object
 * @returns The styled Tag state
 * @alpha
 */
export const useTagStyles = (state: TagState): TagState => {
	const rootStyles = useRootStyles();
	const rootAppearanceStyles = useRootAppearanceStyles();
	const rootSelectedStyles = useRootSelectedStyles();
	const rootWithoutMediaStyles = useRootWithoutMediaStyles();
	const rootWithoutDismissStyles = useRootWithoutDismissStyles();
	const rootWithSecondaryTextStyles = useRootWithSecondaryTextStyles();
	const primaryTextStyles = usePrimaryTextStyles();
	const iconStyles = useIconStyles();
	const mediaStyles = useMediaStyles();
	const dismissIconStyles = useDismissIconStyles();

	state.root.className = mergeClasses(
		tagClassNames.root,
		rootStyles.root,
		rootStyles[state.size],
		!state.disabled && rootAppearanceStyles[state.appearance],
		!state.media && !state.icon && rootWithoutMediaStyles.base,
		!state.dismissible &&
			((state.media || state.icon) && state.size === "medium"
				? rootWithoutDismissStyles.mediumWithMedia
				: rootWithoutDismissStyles.base),
		state.secondaryText && rootWithSecondaryTextStyles.base,
		state.selected && rootSelectedStyles.base,
		state.selected && rootSelectedStyles[state.appearance],
		state.root.className,
	);

	if (state.primaryText) {
		state.primaryText.className = mergeClasses(
			tagClassNames.primaryText,
			primaryTextStyles[state.size],
			state.secondaryText && primaryTextStyles.withSecondaryText,
			state.primaryText.className,
		);
	}

	if (state.secondaryText) {
		state.secondaryText.className = mergeClasses(
			tagClassNames.secondaryText,
			state.secondaryText.className,
		);
	}

	if (state.icon) {
		state.icon.className = mergeClasses(
			tagClassNames.icon,
			iconStyles[state.size],
			state.icon.className,
		);
	}

	if (state.media) {
		state.media.className = mergeClasses(
			tagClassNames.media,
			mediaStyles[state.size],
			state.media.className,
		);
	}

	if (state.dismissIcon) {
		state.dismissIcon.className = mergeClasses(
			tagClassNames.dismissIcon,
			dismissIconStyles[state.size],
			!state.disabled && dismissIconStyles.notDisabled,
			!state.disabled && dismissIconStyles[state.appearance],
			state.selected && !state.disabled && dismissIconStyles.selected,
			state.dismissIcon.className,
		);
	}

	useTagStyles_unstable(state);

	return state;
};
