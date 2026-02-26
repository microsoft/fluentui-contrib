import type {
	ButtonState as BaseButtonState,
	ButtonProps as BaseButtonProps,
} from "@fluentui/react-button";
import type {
	ButtonAppearance,
	ButtonProps,
	ButtonState,
} from "./Button.types";

/**
 * Maps CAP button appearances to Fluent UI base appearances.
 * @internal
 */
export const baseAppearanceMap: Record<
	ButtonAppearance,
	BaseButtonProps["appearance"]
> = {
	secondary: "secondary",
	primary: "primary",
	outline: "outline",
	outlineColor: "outline",
	subtle: "subtle",
	transparent: "transparent",
	tint: "primary",
};

/**
 * Converts CAP Button props to Fluent UI base Button props.
 * @param props - CAP Button props
 * @returns Fluent UI base Button props
 * @internal
 */
export const toBaseProps = (props: ButtonProps): BaseButtonProps => ({
	...props,
	appearance: props.appearance && baseAppearanceMap[props.appearance],
});

/**
 * Converts CAP Button state to Fluent UI base Button state.
 * @param state - CAP Button state
 * @returns Fluent UI base Button state
 * @internal
 */
export const toBaseState = (state: ButtonState): BaseButtonState => ({
	...state,
	appearance: baseAppearanceMap[state.appearance] ?? "secondary",
});
