import {
	radioClassNames,
	useRadioStyles_unstable,
} from "@fluentui/react-radio";
import { tokens } from "@fluentui-contrib/react-cap-theme/tokens";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import type { RadioState } from "./Radio.types";

export { radioClassNames } from "@fluentui/react-radio";

const useInputStyles = makeStyles({
	brand: {
		// same as base
	},
	neutral: {
		// Pending design specs (current tokens are placeholders)
		":enabled:checked": {
			[`& ~ .${radioClassNames.indicator}`]: {
				...shorthands.borderColor(tokens.colorNeutralStroke1),
				color: tokens.colorNeutralForeground1,
			},

			":hover": {
				[`& ~ .${radioClassNames.indicator}`]: {
					...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
					color: tokens.colorNeutralForeground1Hover,
				},
			},

			":hover:active": {
				[`& ~ .${radioClassNames.indicator}`]: {
					...shorthands.borderColor(
						tokens.colorNeutralStroke1Pressed,
					),
					color: tokens.colorNeutralForeground1Pressed,
				},
			},
		},
	},
});

/**
 * Apply styling to the Radio based on the state.
 * @param state - The current Radio state
 * @returns The updated Radio state with applied styles
 * @alpha
 */
export const useRadioStyles = (state: RadioState): RadioState => {
	const inputStyles = useInputStyles();

	state.input.className = mergeClasses(
		inputStyles[state.color],
		state.input.className,
	);

	const { color, ...baseState } = state;
	useRadioStyles_unstable(baseState);
	return state;
};
