import { useCheckboxStyles_unstable } from "@fluentui/react-checkbox";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses } from "@griffel/react";
import type { CheckboxState } from "./Checkbox.types";

// CSS variables used internally in Checkbox's styles
const vars = {
	indicatorColor: "--fui-Checkbox__indicator--color",
	indicatorBorderColor: "--fui-Checkbox__indicator--borderColor",
	indicatorBackgroundColor: "--fui-Checkbox__indicator--backgroundColor",
} as const;

/**
 * Pending design specs (current tokens are placeholders)
 */
const useNeutralStyles = makeStyles({
	unchecked: {
		// Unchecked uses default Fluent UI styling
	},
	checked: {
		[vars.indicatorBackgroundColor]: tokens.colorNeutralBackground3,
		[vars.indicatorBorderColor]: tokens.colorNeutralBackground3,

		":hover": {
			[vars.indicatorBackgroundColor]:
				tokens.colorNeutralBackground3Hover,
			[vars.indicatorBorderColor]: tokens.colorNeutralBackground3Hover,
		},

		":active": {
			[vars.indicatorBackgroundColor]:
				tokens.colorNeutralBackground3Pressed,
			[vars.indicatorBorderColor]: tokens.colorNeutralBackground3Pressed,
		},
	},

	mixed: {
		color: tokens.colorNeutralForeground1,
		[vars.indicatorBorderColor]: tokens.colorNeutralStroke1,
		[vars.indicatorColor]: tokens.colorNeutralForeground3,

		":hover": {
			[vars.indicatorBorderColor]: tokens.colorNeutralStroke1Hover,
			[vars.indicatorColor]: tokens.colorNeutralForeground3Hover,
		},

		":active": {
			[vars.indicatorBorderColor]: tokens.colorNeutralStroke1Pressed,
			[vars.indicatorColor]: tokens.colorNeutralForeground3Pressed,
		},
	},
});

/**
 * Applies style classnames to the Checkbox component state.
 * @param state - The Checkbox state object
 * @alpha
 */
export const useCheckboxStyles = (state: CheckboxState): CheckboxState => {
	const styles = { neutral: useNeutralStyles(), brand: undefined } as const;

	state.root.className = mergeClasses(
		state.color === "neutral"
			? state.checked === "mixed"
				? styles.neutral.mixed
				: state.checked
					? styles.neutral.checked
					: styles.neutral.unchecked
			: styles.brand,
		state.root.className,
	);

	const { color, ...baseState } = state;
	return { ...useCheckboxStyles_unstable(baseState), color };
};
