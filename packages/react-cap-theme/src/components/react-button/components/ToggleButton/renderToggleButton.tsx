import { renderButton } from "../../Button";
import type { ToggleButtonState } from "./ToggleButton.types";

/**
 * Renders the CAP ToggleButton component.
 * @param state - The ToggleButton state object
 * @returns The rendered ToggleButton element
 * @alpha
 */
export const renderToggleButton = (state: ToggleButtonState): JSX.Element =>
	renderButton(state);
