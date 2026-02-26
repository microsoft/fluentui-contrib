import {
	useListboxContext_unstable,
	useOption_unstable,
} from "@fluentui/react-combobox";
import type { OptionProps, OptionState } from "@fluentui/react-combobox";
import { slot } from "@fluentui/react-utilities";
import {
	bundleIcon,
	Checkmark12Filled,
	RadioButtonFilled,
	RadioButtonRegular,
} from "@fluentui-contrib/react-cap-theme/react-icons";
import * as React from "react";

const RadioButtonIcon = bundleIcon(RadioButtonFilled, RadioButtonRegular);

/**
 * Create the state required to render Option.
 * @param props - props from this instance of Option
 * @param ref - reference to root HTMLElement of Option
 * @returns The Option state object
 * @alpha
 */
export const useOption = (
	props: OptionProps,
	ref: React.Ref<HTMLElement>,
): OptionState => {
	const multiselect = useListboxContext_unstable((ctx) => ctx.multiselect);

	const baseState = useOption_unstable(props, ref);
	const { selected } = baseState;

	let CheckIcon: React.ReactNode = <RadioButtonIcon />;
	if (multiselect) {
		CheckIcon = selected ? <Checkmark12Filled /> : ""; // Same as Fluent
	}

	return {
		...baseState,
		checkIcon: slot.optional(props.checkIcon, {
			renderByDefault: true,
			defaultProps: {
				"aria-hidden": "true",
				children: CheckIcon,
			},
			elementType: "span",
		}),
	};
};
