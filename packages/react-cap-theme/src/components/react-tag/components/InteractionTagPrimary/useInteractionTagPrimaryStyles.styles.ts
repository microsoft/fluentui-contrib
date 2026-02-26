import { createCustomFocusIndicatorStyle } from "@fluentui/react-tabster";
import { useInteractionTagPrimaryStyles_unstable } from "@fluentui/react-tags";
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
import type {
	InteractionTagPrimarySlots,
	InteractionTagPrimaryState,
} from "./InteractionTagPrimary.types";

/**
 * CSS class names for the CAP InteractionTagPrimary component slots.
 * @alpha
 */
export const interactionTagPrimaryClassNames: SlotClassNames<InteractionTagPrimarySlots> =
	{
		root: "fui-InteractionTagPrimary",
		media: "fui-InteractionTagPrimary__media",
		icon: "fui-InteractionTagPrimary__icon",
		primaryText: "fui-InteractionTagPrimary__primaryText",
		secondaryText: "fui-InteractionTagPrimary__secondaryText",
	};

const useRootStyles = makeStyles({
	root: {
		borderRadius: "inherit",
		...createCustomFocusIndicatorStyle({
			boxShadow: `
        0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus1} inset,
        0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus2}
      `,
		}),

		"@media (forced-colors: active)": {
			...createCustomFocusIndicatorStyle({
				"::before": { borderTopColor: "Highlight" },
			}),
			"::before": {
				borderTopLeftRadius: "inherit",
				borderTopRightRadius: "inherit",
			},
		},
	},
	medium: {
		paddingRight: tokens.spacingHorizontalMNudge,
	},
	small: {
		paddingRight: tokens.spacingHorizontalS,
	},
	"extra-small": {
		paddingRight: tokens.spacingHorizontalS,
	},
});

const useRootAppearanceStyles = makeStyles({
	filled: {
		backgroundColor: tokens.colorNeutralBackground5,
		color: tokens.colorNeutralForeground3,
		":hover": {
			color: tokens.colorNeutralForeground3Hover,
			backgroundColor: tokens.colorNeutralBackground5Hover,
		},
		":active": {
			color: tokens.colorNeutralForeground3Pressed,
			backgroundColor: tokens.colorNeutralBackground5Pressed,
		},
	},
	outline: {
		color: tokens.colorNeutralForeground3,
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
});

const useRootWithSecondaryTextStyles = makeStyles({
	base: {
		paddingTop: tokens.spacingVerticalXXS,
		paddingBottom: tokens.spacingVerticalXXS,
	},
});

const useRootWithoutMediaStyles = makeStyles({
	medium: {
		paddingLeft: tokens.spacingHorizontalMNudge,
	},
	small: {
		paddingLeft: tokens.spacingHorizontalS,
	},
	"extra-small": {
		paddingLeft: tokens.spacingHorizontalS,
	},
});

const useRootWithSecondaryActionStyles = makeStyles({
	base: {
		borderTopRightRadius: tokens.borderRadiusNone,
		borderBottomRightRadius: tokens.borderRadiusNone,
		...createCustomFocusIndicatorStyle({
			borderTopRightRadius: tokens.borderRadiusNone,
			borderBottomRightRadius: tokens.borderRadiusNone,
		}),
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
		paddingRight: tokens.spacingHorizontalS,
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

const useRootSelectedStyles = makeStyles({
	base: {
		...shorthands.borderColor(tokens.colorTransparentStroke),
		backgroundColor: tokens.colorBrandBackground,
		color: tokens.colorNeutralForegroundOnBrand,
		":hover": {
			backgroundColor: tokens.colorBrandBackgroundHover,
			color: tokens.colorNeutralForegroundOnBrand,
		},
		":active": {
			backgroundColor: tokens.colorBrandBackgroundPressed,
			color: tokens.colorNeutralForegroundOnBrand,
		},
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
			"::before": { borderTopColor: "inherit" },
			":hover": {
				[`& .${iconFilledClassName}`]: { color: "inherit" },
			},
			":active": {
				[`& .${iconFilledClassName}`]: { color: "inherit" },
			},
		},
	},
});

/**
 * Apply styling to the CAP InteractionTagPrimary component.
 *
 * @example
 * ```tsx
 * const styledState = useInteractionTagPrimaryStyles(state);
 * ```
 *
 * @param state - The InteractionTagPrimary state object
 * @returns The styled InteractionTagPrimary state
 * @alpha
 */
export const useInteractionTagPrimaryStyles = (
	state: InteractionTagPrimaryState,
): InteractionTagPrimaryState => {
	const rootStyles = useRootStyles();
	const rootAppearanceStyles = useRootAppearanceStyles();
	const rootWithSecondaryTextStyles = useRootWithSecondaryTextStyles();
	const rootWithoutMediaStyles = useRootWithoutMediaStyles();
	const rootWithSecondaryActionStyles = useRootWithSecondaryActionStyles();
	const rootSelectedStyles = useRootSelectedStyles();
	const primaryTextStyles = usePrimaryTextStyles();
	const iconStyles = useIconStyles();
	const mediaStyles = useMediaStyles();

	state.root.className = mergeClasses(
		interactionTagPrimaryClassNames.root,
		rootStyles.root,
		rootStyles[state.size],
		!state.media && !state.icon && rootWithoutMediaStyles[state.size],
		!state.disabled && rootAppearanceStyles[state.appearance],
		state.selected && !state.disabled && rootSelectedStyles.base,
		state.hasSecondaryAction && rootWithSecondaryActionStyles.base,
		state.secondaryText && rootWithSecondaryTextStyles.base,
		state.root.className,
	);

	if (state.primaryText) {
		state.primaryText.className = mergeClasses(
			interactionTagPrimaryClassNames.primaryText,
			primaryTextStyles[state.size],
			state.secondaryText && primaryTextStyles.withSecondaryText,
			state.primaryText.className,
		);
	}

	if (state.secondaryText) {
		state.secondaryText.className = mergeClasses(
			interactionTagPrimaryClassNames.secondaryText,
			state.secondaryText.className,
		);
	}

	if (state.icon) {
		state.icon.className = mergeClasses(
			interactionTagPrimaryClassNames.icon,
			iconStyles[state.size],
			state.icon.className,
		);
	}

	if (state.media) {
		state.media.className = mergeClasses(
			interactionTagPrimaryClassNames.media,
			mediaStyles[state.size],
			state.media.className,
		);
	}

	useInteractionTagPrimaryStyles_unstable(state);
	return state;
};
