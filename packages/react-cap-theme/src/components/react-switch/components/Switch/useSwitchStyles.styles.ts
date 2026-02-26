import type { SwitchState } from "@fluentui/react-switch";
import { switchClassNames } from "@fluentui/react-switch";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";

const trackWidthMedium = 52;
const trackHeightMedium = 28;
const borderWidth = 1;
const thumbSizeMedium = 20; // SVG container
const thumbPaddingMedium = 4;
const thumbPaddingVerticalMedium =
	(trackHeightMedium - 2 * borderWidth - thumbSizeMedium) / 2; // 3px
const checkedTranslateXMedium =
	trackWidthMedium -
	2 * borderWidth -
	thumbSizeMedium -
	2 * thumbPaddingMedium; // 22px — checked position

// ─── Selectors ───────────────────────────────────────────────────────
// Switch uses a hidden <input> as a sibling of the indicator and label.
// Fluent drives visual states via CSS sibling selectors on :checked / :enabled.
// We must use the same pattern to override Fluent's makeResetStyles.
const indicatorSibling = `& ~ .${switchClassNames.indicator}`;
const labelSibling = `& ~ .${switchClassNames.label}`;

const useRootStyles = makeStyles({
	base: {
		gap: tokens.spacingHorizontalMNudge,
	},
	labelAbove: {
		gap: tokens.spacingVerticalNone,
	},
});

// ─── Indicator (track + thumb container) ─────────────────────────────
const useIndicatorStyles = makeStyles({
	medium: {
		margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalNone}`,
		width: `${trackWidthMedium}px`,
		height: `${trackHeightMedium}px`,
		fontSize: `${thumbSizeMedium}px`,
		paddingTop: `${thumbPaddingVerticalMedium}px`,
		paddingBottom: `${thumbPaddingVerticalMedium}px`,
		paddingLeft: `${thumbPaddingMedium}px`,
		paddingRight: `${thumbPaddingMedium}px`,
	},
	labelAbove: {
		marginTop: tokens.spacingVerticalNone,
		marginBottom: tokens.spacingVerticalNone,
	},
});

// Input (hidden checkbox — drives state via sibling selectors)
const useInputStyles = makeStyles({
	// Hit-area width and checked thumb position for the wider track.
	medium: {
		width: `${trackWidthMedium}px`,
		":checked": {
			[indicatorSibling]: {
				"> *": {
					transform: `translateX(${checkedTranslateXMedium}px)`,
				},
			},
		},
	},

	// Unchecked state: indicator colors, border, label color, and hover/pressed feedback.
	unchecked: {
		":enabled:not(:checked)": {
			[indicatorSibling]: {
				color: tokens.colorNeutralForeground3,
				...shorthands.borderColor(tokens.colorNeutralStroke4),
			},
			[labelSibling]: {
				color: tokens.colorNeutralForeground3,
			},
			":hover": {
				[indicatorSibling]: {
					...shorthands.borderColor(tokens.colorNeutralStroke4Hover),
					backgroundColor: tokens.colorNeutralBackground3Hover,
					color: tokens.colorNeutralForeground3Hover,
				},
			},
			":hover:active": {
				[indicatorSibling]: {
					...shorthands.borderColor(
						tokens.colorNeutralStroke4Pressed,
					),
					backgroundColor: tokens.colorNeutralBackground3Pressed,
				},
			},
		},
	},

	// Checked state: keep label color consistent with unchecked.
	checked: {
		":enabled:checked": {
			[labelSibling]: {
				color: tokens.colorNeutralForeground3,
			},
		},
	},
});

const useLabelStyles = makeStyles({
	base: {
		padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalXXS}`,
	},
});
/**
 * CAP theme overrides for the Switch component.
 *
 * - **Medium size**: applies custom track dimensions, thumb positioning, colors, and hover/pressed states.
 * - **Small size**: only color overrides are applied; dimensions remain Fluent defaults.
 *   (TODO: clarify intended small-size measurements with designers)
 * - **Disabled + checked**: uses Fluent default tokens.
 *   (TODO: confirm disabled-checked color tokens with designers)
 */
export const useSwitchStyles = (state: SwitchState): SwitchState => {
	const rootStyles = useRootStyles();
	const indicatorStyles = useIndicatorStyles();
	const inputStyles = useInputStyles();
	const labelStyles = useLabelStyles();

	const { size, labelPosition } = state;
	const isMedium = size === "medium";

	// Root — gap between indicator and label
	state.root.className = mergeClasses(
		state.root.className,
		isMedium && rootStyles.base,
		isMedium && labelPosition === "above" && rootStyles.labelAbove,
	);

	// Indicator — track dimensions and thumb padding (medium only)
	state.indicator.className = mergeClasses(
		state.indicator.className,
		isMedium && indicatorStyles.medium,
		isMedium && labelPosition === "above" && indicatorStyles.labelAbove,
	);

	// Input — hit area, checked thumb position (medium), color overrides (all sizes)
	state.input.className = mergeClasses(
		state.input.className,
		isMedium && inputStyles.medium,
		inputStyles.unchecked,
		inputStyles.checked,
	);

	// Label — padding (medium only)
	if (state.label) {
		state.label.className = mergeClasses(
			state.label.className,
			isMedium && labelStyles.base,
		);
	}

	return state;
};
