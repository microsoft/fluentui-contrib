import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	tokens,
	typographyStyles,
} from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";

import type { InputState, InputSlots } from "./Input.types";

/**
 * CSS class names for Input component slots.
 * @alpha
 */
export const inputClassNames: SlotClassNames<InputSlots> = {
	root: "fui-Input",
	input: "fui-Input__input",
	contentBefore: "fui-Input__contentBefore",
	contentAfter: "fui-Input__contentAfter",
};

const iconFilledClassName = "fui-Icon-filled";
const iconRegularClassName = "fui-Icon-regular";

const useStyles = makeStyles({
	root: {
		boxSizing: "border-box",
		display: "inline-flex",
		flexWrap: "nowrap",
		alignItems: "center",
		verticalAlign: "middle",
		minHeight: "36px",
		padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalM}`,

		color: tokens.colorNeutralForeground1,
		border: `${tokens.strokeWidthThin} solid`,
		borderRadius: tokens.borderRadiusXLarge,

		...typographyStyles.body1,

		":focus-within": {
			outline: `${tokens.strokeWidthThick} solid ${tokens.colorTransparentStroke}`, // For high contrast
		},
	},
	small: {
		minHeight: "28px",
		paddingLeft: tokens.spacingHorizontalS,
		paddingRight: tokens.spacingHorizontalS,
		...typographyStyles.caption1,
	},
	medium: {
		/* same as root */
	},
	large: { minHeight: "40px" },
	disabled: {
		backgroundColor: tokens.colorNeutralBackgroundDisabled,
		...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
		color: tokens.colorNeutralForegroundDisabled,
		cursor: "not-allowed",

		"@media (forced-colors: active)": {
			...shorthands.borderColor("GrayText"),
		},
	},
	readOnly: {
		backgroundColor: tokens.colorTransparentBackground,
		...shorthands.borderColor(tokens.colorTransparentStroke),

		"@media (forced-colors: active)": {
			":focus-within": { outlineColor: "GrayText" },
		},
	},
	invalid: { ...shorthands.borderColor(tokens.colorStatusDangerBorder2) },
});

const useIsEditableStyles = makeStyles({
	base: {
		":hover": {
			// Don't update sub component icons (e.g Button)
			[`& .${inputClassNames.contentBefore} > .${iconRegularClassName}`]:
				{ display: "none" },
			[`& .${inputClassNames.contentBefore} > .${iconFilledClassName}`]: {
				display: "inline",
			},
		},
		":active,:focus-within": {
			border: `${tokens.strokeWidthThick} solid`,
			// Don't update sub component icons (e.g Button)
			[`& .${inputClassNames.contentBefore} > .${iconRegularClassName}`]:
				{ display: "none" },
			[`& .${inputClassNames.contentBefore} > .${iconFilledClassName}`]: {
				display: "inline",
			},
		},
	},

	// Color variants
	colorBase: {
		backgroundColor: tokens.colorNeutralBackground1,
		...shorthands.borderColor(tokens.colorNeutralStroke1),
		":hover": {
			...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
			[`& .${inputClassNames.contentBefore} > svg`]: {
				color: tokens.colorNeutralForeground3Hover,
			},
		},
		":active,:focus-within": {
			[`& .${inputClassNames.contentBefore} > svg`]: {
				color: tokens.colorNeutralForeground3Pressed,
			},
		},
	},
	brand: {
		":active,:focus-within": {
			backgroundColor: tokens.colorBrandBackground2,
			...shorthands.borderColor(tokens.colorBrandStroke1),
		},
	},
	neutral: {
		":active,:focus-within": {
			backgroundColor: tokens.colorNeutralBackground4Pressed,
			...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
		},
	},
});

const useContentStyles = makeStyles({
	base: {
		display: "flex",
		color: tokens.colorNeutralForeground3,

		"> svg": { fontSize: tokens.fontSizeBase500 },
	},
	small: { "> svg": { fontSize: tokens.fontSizeBase400 } },
	medium: {
		/* same as base */
	},
	large: {
		/* same as base */
	},

	smallContentBefore: { paddingRight: tokens.spacingHorizontalXS },
	smallContentAfter: { paddingLeft: tokens.spacingHorizontalS },

	mediumContentBefore: { paddingRight: tokens.spacingHorizontalMNudge },
	mediumContentAfter: { paddingLeft: tokens.spacingHorizontalM },

	largeContentBefore: { paddingRight: tokens.spacingHorizontalMNudge },
	largeContentAfter: { paddingLeft: tokens.spacingHorizontalM },

	disabled: { color: "inherit" },
});

const useInputElementStyles = makeStyles({
	base: {
		alignSelf: "stretch",
		boxSizing: "border-box",
		flexGrow: 1,
		minWidth: 0, // required to make the input shrink to fit the wrapper
		backgroundColor: tokens.colorTransparentBackground, // remove browser styling
		border: "none", // remove browser styling
		outline: "none", // remove browser styling
		paddingTop: tokens.spacingVerticalS,
		paddingBottom: tokens.spacingVerticalS,
		color: "inherit",
		fontFamily: "inherit",
		fontSize: "inherit",
		fontWeight: "inherit",
		lineHeight: "inherit",

		"::placeholder": {
			color: tokens.colorNeutralForeground3,
			opacity: 1, // override browser styling
		},
	},
	small: {
		paddingTop: tokens.spacingVerticalSNudge,
		paddingBottom: tokens.spacingVerticalSNudge,
	},
	medium: {
		/* same as base */
	},
	large: {
		paddingTop: tokens.spacingVerticalMNudge,
		paddingBottom: tokens.spacingVerticalMNudge,
	},
	disabled: {
		cursor: "inherit",
		"::placeholder": { color: "inherit" },
	},
});

/**
 * Apply styling to the Input based on the state.
 * @param state - The current Input state
 * @returns The updated Input state with applied styles
 * @alpha
 */
export const useInputStyles = (state: InputState): InputState => {
	const styles = useStyles();
	const isEditableStyles = useIsEditableStyles();
	const contentStyles = useContentStyles();
	const inputStyles = useInputElementStyles();

	const { color, size } = state;
	const { disabled, readOnly } = state.input;
	const isEditable = !disabled && !readOnly;
	const invalid = state.input["aria-invalid"] === "true";

	state.root.className = mergeClasses(
		inputClassNames.root,
		styles.root,
		styles[size],
		isEditable &&
			mergeClasses(
				isEditableStyles.base,
				isEditableStyles.colorBase,
				isEditableStyles[color],
			),
		invalid && styles.invalid,
		disabled && styles.disabled,
		readOnly && styles.readOnly,
		state.root.className,
	);

	state.input.className = mergeClasses(
		inputClassNames.input,
		inputStyles.base,
		inputStyles[size],
		disabled && inputStyles.disabled,
		state.input.className,
	);

	if (state.contentBefore) {
		state.contentBefore.className = mergeClasses(
			inputClassNames.contentBefore,
			contentStyles.base,
			contentStyles[size],
			contentStyles[`${size}ContentBefore`],
			disabled && contentStyles.disabled,
			state.contentBefore.className,
		);
	}

	if (state.contentAfter) {
		state.contentAfter.className = mergeClasses(
			inputClassNames.contentAfter,
			contentStyles.base,
			contentStyles[size],
			contentStyles[`${size}ContentAfter`],
			disabled && contentStyles.disabled,
			state.contentAfter.className,
		);
	}

	return state;
};
