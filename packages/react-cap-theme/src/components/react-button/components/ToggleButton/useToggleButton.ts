import { useToggleState } from "@fluentui/react-button";
import { useButton } from "../../Button";

import type {
	ToggleButtonProps,
	ToggleButtonState,
} from "./ToggleButton.types";

/**
 * Creates the state required to render ToggleButton component.
 * @param props - Props from this instance of ToggleButton
 * @param ref - Reference to root HTMLElement of ToggleButton
 * @returns The ToggleButton state object
 * @alpha
 */
export const useToggleButton = (
	props: ToggleButtonProps,
	ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToggleButtonState => {
	const buttonState = useButton(props, ref) as ToggleButtonState;
	return useToggleState(props, buttonState) as ToggleButtonState;
};
