import {
	renderButton_unstable,
	type ButtonState as BaseButtonState,
} from "@fluentui/react-button";
import type { ButtonState } from "./Button.types";
import { toBaseState } from "./Button.utils";

/**
 * Renders the CAP Button component.
 * @param state - The Button state object
 * @returns The rendered Button element
 * @alpha
 */
export const renderButton = (state: ButtonState): JSX.Element => {
	const baseState: BaseButtonState = toBaseState(state);
	return renderButton_unstable(baseState);
};
