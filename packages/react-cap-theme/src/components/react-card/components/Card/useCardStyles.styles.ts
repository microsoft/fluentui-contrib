import { cardFooterClassNames } from "@fluentui/react-card";
import { createCustomFocusIndicatorStyle } from "@fluentui/react-tabster";
import type { SlotClassNames } from "@fluentui/react-utilities";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import {
	type GriffelStyle,
	makeStyles,
	mergeClasses,
	shorthands,
} from "@griffel/react";
import React from "react";

import {
	cardPreviewClassNames,
	cardPreviewCSSVars,
} from "../CardPreview/useCardPreviewStyles.styles";
import type { CardSlots, CardState } from "./Card.types";
import { cardCSSVars } from "./cssVariables";

/**
 * Class names for Card component slots
 * @alpha
 */
export const cardClassNames: SlotClassNames<CardSlots> = {
	root: "fui-Card",
	floatingAction: "fui-Card__floatingAction",
	checkbox: "fui-Card__checkbox",
};

const highContrastStyles: GriffelStyle = {
	forcedColorAdjust: "none",
	backgroundColor: "Highlight",
	color: "HighlightText",

	[`& .${cardPreviewClassNames.root}, & .${cardFooterClassNames.root}`]: {
		forcedColorAdjust: "auto",
	},
};

const focusOutlineStyle = {
	"::after": {
		...shorthands.borderColor(tokens.colorStrokeFocus2),
		boxShadow: `
      0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2} inset,
      0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus1} inset
    `,

		"@media (forced-colors: active)": {
			...shorthands.borderColor("Highlight"),
			...shorthands.borderWidth(tokens.strokeWidthThick),
		},
	},
};

const useStyles = makeStyles({
	root: {
		[cardCSSVars.cardPaddingVerticalVar]: tokens.spacingVerticalM,
		[cardCSSVars.cardPaddingHorizontalVar]: tokens.spacingHorizontalXL,

		display: "flex",
		position: "relative",
		overflow: "hidden",
		borderRadius: tokens.borderRadiusXLarge,
		boxShadow: tokens.shadow4,
		boxSizing: "border-box",
		padding: `var(${cardCSSVars.cardPaddingVerticalVar}) var(${cardCSSVars.cardPaddingHorizontalVar})`,
		backgroundColor: tokens.colorNeutralBackground1,
		color: tokens.colorNeutralForeground1,

		"::after": {
			position: "absolute",
			content: '""',
			inset: 0,
			pointerEvents: "none",
			border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
			borderRadius: "inherit",
		},
	},

	vertical: {
		flexDirection: "column",
		gap: tokens.spacingVerticalXL,

		[`> .${cardPreviewClassNames.root}:not(:last-child)`]: {
			marginBottom: "-4px",
		},
		[`> .${cardPreviewClassNames.root}:not(:first-child)`]: {
			marginTop: "0px",
		},
		[`> .${cardClassNames.floatingAction} + .${cardPreviewClassNames.root}`]:
			{
				marginTop: `var(${cardPreviewCSSVars.cardPreviewMarginVerticalVar})`,
			},
	},

	horizontal: {
		flexDirection: "row",
		gap: tokens.spacingHorizontalL,

		[`> .${cardPreviewClassNames.root}:not(:last-child)`]: {
			marginRight: "0px",
		},
		[`> .${cardPreviewClassNames.root}:not(:first-child)`]: {
			marginLeft: "0px",
		},
		[`> .${cardClassNames.floatingAction} + .${cardPreviewClassNames.root}`]:
			{
				marginLeft: `var(${cardPreviewCSSVars.cardPreviewMarginHorizontalVar})`,
			},
	},

	interactive: {
		cursor: "pointer",

		// TODO Update when SPDS updates the Text component
		[`& .fui-Text`]: { color: "currentColor" },

		":hover": {
			backgroundColor: tokens.colorNeutralBackground1Hover,
			boxShadow: tokens.shadow8,
		},

		":active": { backgroundColor: tokens.colorNeutralBackground1Pressed },

		"@media (forced-colors: active)": {
			":hover, :active": highContrastStyles,
			"::after": shorthands.borderColor("Highlight"),
		},
	},

	selected: {
		backgroundColor: tokens.colorNeutralBackground1Selected,

		"::after": shorthands.borderColor(tokens.colorNeutralStroke1),

		"@media (forced-colors: active)": highContrastStyles,
	},

	focused: createCustomFocusIndicatorStyle(focusOutlineStyle),
	selectableFocused: createCustomFocusIndicatorStyle(focusOutlineStyle, {
		selector: "focus-within",
	}),

	floatingAction: {
		position: "absolute",
		zIndex: 1,
		top: "-8px", // Size of hidden checkbox
		right: "-8px", // Size of hidden checkbox
		margin: `${tokens.spacingHorizontalM} ${tokens.spacingVerticalM}`,
	},

	hiddenCheckbox: {
		overflow: "hidden",
		width: "1px",
		height: "1px",
		position: "absolute",
		clip: "rect(0 0 0 0)",
		clipPath: "inset(50%)",
		whiteSpace: "nowrap",
	},
});

/**
 * Applies styling to the Card component based on its state.
 *
 * This includes styling that impacts the CardPreview.
 *
 * @param state - The state object for the Card component
 * @returns The updated state object with the applied styles
 * @alpha
 */
export const useCardStyles = (state: CardState): CardState => {
	const styles = useStyles();
	const { interactive, orientation, selected, selectable, selectFocused } =
		state;
	const isSelectableOrInteractive = interactive || selectable;

	const focusedStyles = React.useMemo(() => {
		if (selectable) {
			return selectFocused ? styles.selectableFocused : "";
		}
		return styles.focused;
	}, [selectFocused, selectable, styles.focused, styles.selectableFocused]);

	state.root.className = mergeClasses(
		cardClassNames.root,
		styles.root,
		styles[orientation],
		isSelectableOrInteractive && styles.interactive,
		selected && styles.selected,
		focusedStyles,
		state.root.className,
	);

	if (state.floatingAction) {
		state.floatingAction.className = mergeClasses(
			cardClassNames.floatingAction,
			styles.floatingAction,
			state.floatingAction.className,
		);
	}

	if (state.checkbox) {
		state.checkbox.className = mergeClasses(
			cardClassNames.checkbox,
			styles.hiddenCheckbox,
			state.checkbox.className,
		);
	}

	return state;
};
