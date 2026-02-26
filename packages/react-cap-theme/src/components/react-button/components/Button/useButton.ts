import { useButton_unstable as useBaseState } from "@fluentui/react-button";
import type { ButtonProps, ButtonState } from "./Button.types";
import { toBaseProps } from "./Button.utils";

/**
 * Creates the state required to render Button component.
 * @param props - User provided props to the Button component
 * @param ref - User provided ref to be passed to the Button component
 * @returns The Button state object
 * @alpha
 */
export const useButton = (
	props: ButtonProps,
	ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ButtonState => {
	const appearance = props.appearance ?? "secondary";

	return {
		...useBaseState(toBaseProps(props), ref),
		appearance,
	} as ButtonState;
};
