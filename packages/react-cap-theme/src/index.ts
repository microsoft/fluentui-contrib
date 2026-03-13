import { FluentProviderProps } from "@fluentui/react-components";
import {
	useButtonStyles,
	useMenuButtonStyles,
	useSplitButtonStyles,
	useToggleButtonStyles,
	type ButtonState,
	type MenuButtonState,
	type SplitButtonState,
	type ToggleButtonState,
} from "./components/react-button";

export { getIntrinsicElementProps, slot } from "@fluentui/react-utilities";
export {
	motionTokens,
	makeStyles,
	mergeClasses,
} from "@fluentui/react-components";

export * from "./components/react-button";
export * from "./components/tokens";

export const CAP_STYLE_HOOKS: NonNullable<
	FluentProviderProps["customStyleHooks_unstable"]
> = {
	useButtonStyles_unstable: (state) => {
		return useButtonStyles(state as ButtonState);
	},
	useMenuButtonStyles_unstable: (state) => {
		return useMenuButtonStyles(state as MenuButtonState);
	},
	useSplitButtonStyles_unstable: (state) => {
		return useSplitButtonStyles(state as SplitButtonState);
	},
	useToggleButtonStyles_unstable: (state) => {
		return useToggleButtonStyles(state as ToggleButtonState);
	},
};
