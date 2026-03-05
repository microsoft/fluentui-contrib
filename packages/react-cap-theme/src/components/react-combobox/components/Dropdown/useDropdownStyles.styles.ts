import { createFocusOutlineStyle } from "@fluentui/react-tabster";
import type { SlotClassNames } from "@fluentui/react-utilities";
import {
	iconFilledClassName,
	iconRegularClassName,
} from "@fluentui-contrib/react-cap-theme/react-icons";
import {
	tokens,
	typographyStyles,
} from "@fluentui-contrib/react-cap-theme/tokens";
import {
	makeResetStyles,
	makeStyles,
	mergeClasses,
	shorthands,
} from "@griffel/react";

import type { DropdownSlots, DropdownState } from "./Dropdown.types";

/**
 * CSS class names for the Dropdown component slots.
 * @alpha
 */
export const dropdownClassNames: SlotClassNames<DropdownSlots> = {
	root: "fui-Dropdown",
	button: "fui-Dropdown__button",
	clearButton: "fui-Dropdown__clearButton",
	contentBefore: "fui-Dropdown__contentBefore",
	expandIcon: "fui-Dropdown__expandIcon",
	listbox: "fui-Dropdown__listbox",
};

/**
 * CSS variable names used internally for Dropdown.
 * @alpha
 */
export const dropdownCSSVars = {
	dropdownGridTemplateColumns: "--fui-Dropdown--grid-template-columns",
};

const paddingHorizontalSmall = tokens.spacingHorizontalS;
const paddingHorizontalMedium = tokens.spacingHorizontalM;
const paddingHorizontalLarge = tokens.spacingHorizontalM;

const useStyles = makeStyles({
	root: {
		minWidth: "250px",

		// -- Same as Input --
		boxSizing: "border-box",
		display: "inline-flex",
		alignItems: "center",
		verticalAlign: "middle",
		minHeight: "36px",

		color: tokens.colorNeutralForeground1,
		backgroundColor: tokens.colorNeutralBackground1,
		border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
		borderRadius: tokens.borderRadiusXLarge,

		...typographyStyles.body1,

		":focus-within": {
			outline: `${tokens.strokeWidthThick} solid ${tokens.colorTransparentStroke}`, // For high contrast
		},
		// End --
	},

	// Same as Input sizes
	small: {
		minHeight: "28px",
		...typographyStyles.caption1,
	},
	medium: {
		/* same as root */
	},
	large: { minHeight: "40px" },

	// Same as Input disabled
	disabled: {
		backgroundColor: tokens.colorNeutralBackgroundDisabled,
		...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
		color: tokens.colorNeutralForegroundDisabled,
		cursor: "not-allowed",

		"@media (forced-colors: active)": shorthands.borderColor("GrayText"),
	},

	// Same as Input invalid
	invalid: shorthands.borderColor(tokens.colorStatusDangerBorder2),

	placeholder: { color: tokens.colorNeutralForeground3 },
	listboxCollapsed: { display: "none" },
	// When rendering inline, the popupSurface will be rendered under relatively positioned elements such as Input.
	// This is due to the surface being positioned as absolute, therefore zIndex: 1 ensures that won't happen.
	inlineListbox: { zIndex: 1 },
	contentBefore: {
		gridColumnStart: "contentBefore",
		gridColumnEnd: "contentBefore",
	},
	hidden: { display: "none" },
});

const useIsEditableStyles = makeStyles({
	base: {
		":hover": {
			[`& .${dropdownClassNames.expandIcon}`]: {
				color: tokens.colorNeutralForeground3Hover,
			},

			// -- Same as Input --
			// Don't update sub component icons (e.g Button)
			[`& .${dropdownClassNames.contentBefore} > .${iconRegularClassName}`]:
				{ display: "none" },
			[`& .${dropdownClassNames.contentBefore} > .${iconFilledClassName}`]:
				{
					display: "inline",
					color: tokens.colorNeutralForeground3Hover,
				},
			// End --
		},
		":active,:focus-within": {
			[`& .${dropdownClassNames.expandIcon} .${iconRegularClassName}`]: {
				display: "none",
			},
			[`& .${dropdownClassNames.expandIcon} .${iconFilledClassName}`]: {
				display: "inline",
			},

			// -- Same as Input --
			border: `${tokens.strokeWidthThick} solid`,
			// Don't update sub component icons (e.g Button)
			[`& .${dropdownClassNames.contentBefore} > .${iconRegularClassName}`]:
				{ display: "none" },
			[`& .${dropdownClassNames.contentBefore} > .${iconFilledClassName}`]:
				{ display: "inline" },
			// End --
		},
	},

	// Color variants
	colorBase: {
		// Same as Input
		backgroundColor: tokens.colorNeutralBackground1,
		...shorthands.borderColor(tokens.colorNeutralStroke1),

		// Same as Input
		":hover": {
			...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
			[`& .${dropdownClassNames.contentBefore} > svg`]: {
				color: tokens.colorNeutralForeground3Hover,
			},
		},

		":active,:focus-within": {
			[`& .${dropdownClassNames.expandIcon}`]: {
				color: tokens.colorNeutralForeground3Pressed,
			},

			// Same as Input
			[`& .${dropdownClassNames.contentBefore} > svg`]: {
				color: tokens.colorNeutralForeground3Pressed,
			},
		},
	},
	// Same as Input
	brand: {
		":active,:focus-within": {
			backgroundColor: tokens.colorBrandBackground2,
			...shorthands.borderColor(tokens.colorBrandStroke1),
		},
	},
	// Same as Input
	neutral: {
		":active,:focus-within": {
			backgroundColor: tokens.colorNeutralBackground4Pressed,
			...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
		},
	},
});

// Same as Input
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
	mediumContentBefore: { paddingRight: tokens.spacingHorizontalMNudge },
	largeContentBefore: { paddingRight: tokens.spacingHorizontalMNudge },
	disabled: { color: "inherit" },
});

const useButtonStyles = makeStyles({
	base: {
		display: "grid",
		gridTemplateColumns: `var(${dropdownCSSVars.dropdownGridTemplateColumns})`,
		justifyContent: "space-between",
		padding: `${tokens.spacingVerticalS} ${paddingHorizontalMedium}`,
		textAlign: "left",
		width: "100%",

		"&:focus": { outlineStyle: "none" },

		// -- Same as Input inputElement base --
		boxSizing: "border-box",
		backgroundColor: tokens.colorTransparentBackground, // remove browser styling
		border: "none", // remove browser styling
		outline: "none", // remove browser styling
		color: "inherit",
		fontFamily: "inherit",
		fontSize: "inherit",
		fontWeight: "inherit",
		lineHeight: "inherit",
		// End --
	},

	small: {
		padding: `${tokens.spacingVerticalSNudge} ${paddingHorizontalSmall}`,
	},
	medium: {
		/* same as base */
	},
	large: {
		padding: `${tokens.spacingVerticalMNudge} ${paddingHorizontalLarge}`,
	},

	// Same as Input inputElement disabled
	disabled: { cursor: "inherit" },

	isEditable: { cursor: "pointer" },
});

// Expand and Clear icon styles
const useIconStyles = makeStyles({
	base: {
		color: tokens.colorNeutralForeground3,
		fontSize: tokens.fontSizeBase500,
		gridColumnStart: "icon",
		gridColumnEnd: "end",

		// the SVG must have display: block for accurate positioning
		// otherwise an extra inline space is inserted after the svg element
		"& svg": { display: "block" },
	},
	small: { fontSize: tokens.fontSizeBase400 },
	medium: {
		/* same as base */
	},
	large: {
		/* same as base */
	},
	disabled: { color: "inherit" },
});

const useClearButtonClassName = makeResetStyles({
	alignSelf: "center",
	backgroundColor: tokens.colorTransparentBackground,
	border: "none",
	cursor: "pointer",
	height: "fit-content",
	padding: 0, // remove browser styling
	position: "relative",

	...createFocusOutlineStyle(),
});

const useClearButtonStyles = makeStyles({
	small: { margin: `0 ${paddingHorizontalSmall} 0 0` }, // remove browser styling
	medium: { margin: `0 ${paddingHorizontalMedium} 0 0` }, // remove browser styling
	large: { margin: `0 ${paddingHorizontalLarge} 0 0` }, // remove browser styling
});

const useExpandIconStyles = makeStyles({
	small: { paddingLeft: paddingHorizontalSmall },
	medium: { paddingLeft: paddingHorizontalMedium },
	large: { paddingLeft: paddingHorizontalLarge },
});

/**
 * Apply styling to the Dropdown slots based on the state
 * @param state - The current Dropdown state
 * @returns The updated Dropdown state with applied styles
 * @alpha
 */
export const useDropdownStyles = (state: DropdownState): DropdownState => {
	const clearButtonClassName = useClearButtonClassName();

	const styles = useStyles();
	const isEditableStyles = useIsEditableStyles();
	const contentStyles = useContentStyles();
	const buttonStyles = useButtonStyles();
	const iconStyles = useIconStyles();
	const clearButtonStyles = useClearButtonStyles();
	const expandIconStyles = useExpandIconStyles();

	const { color, disabled, open, placeholderVisible, size, showClearButton } =
		state;
	const isEditable = !disabled;
	const invalid = state.button["aria-invalid"] === "true";

	// Grid layout: [contentBefore] [content] [icon] [end]
	const gridLayout = `
    ${state.contentBefore ? "[contentBefore] auto" : ""}
    [content] 1fr
    ${!showClearButton ? "[icon] auto" : ""}
    [end]
  `;

	state.root.style = {
		...state.root.style,
		[dropdownCSSVars.dropdownGridTemplateColumns]: gridLayout,
	};

	state.root.className = mergeClasses(
		dropdownClassNames.root,
		styles.root,
		styles[size],
		isEditable &&
			mergeClasses(
				isEditableStyles.base,
				isEditableStyles.colorBase,
				isEditableStyles[color],
			),
		placeholderVisible && styles.placeholder,
		invalid && styles.invalid,
		disabled && styles.disabled,
		state.root.className,
	);

	state.button.className = mergeClasses(
		dropdownClassNames.button,
		buttonStyles.base,
		buttonStyles[size],
		isEditable && buttonStyles.isEditable,
		disabled && buttonStyles.disabled,
		state.button.className,
	);

	if (state.contentBefore) {
		state.contentBefore.className = mergeClasses(
			dropdownClassNames.contentBefore,
			contentStyles.base,
			contentStyles[size],
			contentStyles[`${size}ContentBefore`],
			disabled && contentStyles.disabled,
			state.contentBefore.className,
		);
	}

	if (state.expandIcon) {
		state.expandIcon.className = mergeClasses(
			dropdownClassNames.expandIcon,
			iconStyles.base,
			iconStyles[size],
			expandIconStyles[size],
			disabled && iconStyles.disabled,
			showClearButton && styles.hidden,
			state.expandIcon.className,
		);
	}

	if (state.clearButton) {
		state.clearButton.className = mergeClasses(
			dropdownClassNames.clearButton,
			clearButtonClassName,
			iconStyles.base,
			iconStyles[size],
			clearButtonStyles[size],
			disabled && iconStyles.disabled,
			!showClearButton && styles.hidden,
			state.clearButton.className,
		);
	}

	if (state.listbox) {
		state.listbox.className = mergeClasses(
			dropdownClassNames.listbox,
			state.inlinePopup && styles.inlineListbox,
			!open && styles.listboxCollapsed,
			state.listbox.className,
		);
	}

	return state;
};
