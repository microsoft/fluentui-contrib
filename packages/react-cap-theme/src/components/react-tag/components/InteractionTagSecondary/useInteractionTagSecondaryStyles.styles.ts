import { createCustomFocusIndicatorStyle } from "@fluentui/react-tabster";
import { useInteractionTagSecondaryStyles_unstable } from "@fluentui/react-tags";
import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	iconFilledClassName,
	iconRegularClassName,
} from "@fluentui-contrib/react-cap-theme/react-icons";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import type {
	InteractionTagSecondarySlots,
	InteractionTagSecondaryState,
} from "./InteractionTagSecondary.types";

/**
 * CSS class names for the CAP InteractionTagSecondary component slots.
 * @alpha
 */
export const interactionTagSecondaryClassNames: SlotClassNames<InteractionTagSecondarySlots> =
	{
		root: "fui-InteractionTagSecondary",
	};

const useRootStyles = makeStyles({
	root: {
		position: "relative",
		borderLeft: "none",
		borderRadius: "inherit",
		borderTopLeftRadius: tokens.borderRadiusNone,
		borderBottomLeftRadius: tokens.borderRadiusNone,
		...createCustomFocusIndicatorStyle({
			boxShadow: `
        0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus1} inset,
        0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus2}
      `,
		}),

		"::before": {
			content: '""',
			position: "absolute",
			left: "0",
			top: "50%",
			transform: "translateY(-50%)",
			borderLeft: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
		},
	},
	medium: {
		paddingLeft: tokens.spacingHorizontalMNudge,
		paddingRight: tokens.spacingHorizontalMNudge,
		fontSize: "16px",
		"::before": { height: "16px" },
	},
	small: {
		paddingLeft: tokens.spacingHorizontalSNudge,
		paddingRight: tokens.spacingHorizontalSNudge,
		fontSize: "12px",
		"::before": { height: "12px" },
	},
	"extra-small": {
		paddingLeft: tokens.spacingHorizontalXS,
		paddingRight: tokens.spacingHorizontalXS,
		fontSize: "12px",
		"::before": { height: "12px" },
	},
});

const useRootAppearanceStyles = makeStyles({
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
		"::before": { borderLeftColor: tokens.colorBrandStroke2 },
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
		"::before": { borderLeftColor: tokens.colorNeutralStrokeOnBrand2 },

		"@media (forced-colors: active)": {
			...createCustomFocusIndicatorStyle({
				outline: "none",
				boxShadow: `
        0 0 0 ${tokens.strokeWidthThin} ButtonFace inset,
        0 0 0 ${tokens.strokeWidthThick} Highlight
        `,
			}),
			"::before": { borderLeftColor: "ButtonBorder" },
		},
	},
});

/**
 * Apply styling to the CAP InteractionTagSecondary component.
 *
 * @example
 * ```tsx
 * const styledState = useInteractionTagSecondaryStyles(state);
 * ```
 *
 * @param state - The InteractionTagSecondary state object
 * @returns The styled InteractionTagSecondary state
 * @alpha
 */
export const useInteractionTagSecondaryStyles = (
	state: InteractionTagSecondaryState,
): InteractionTagSecondaryState => {
	const rootStyles = useRootStyles();
	const rootAppearanceStyles = useRootAppearanceStyles();
	const rootSelectedStyles = useRootSelectedStyles();

	state.root.className = mergeClasses(
		interactionTagSecondaryClassNames.root,
		rootStyles.root,
		rootStyles[state.size],
		!state.disabled && rootAppearanceStyles[state.appearance],
		!state.disabled && rootAppearanceStyles.notDisabled,
		state.selected && !state.disabled && rootSelectedStyles.base,
		state.root.className,
	);

	useInteractionTagSecondaryStyles_unstable(state);
	return state;
};
