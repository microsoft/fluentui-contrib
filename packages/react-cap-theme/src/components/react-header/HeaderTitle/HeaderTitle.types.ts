import type {
	ComponentProps,
	ComponentState,
	Slot,
} from "@fluentui/react-utilities";
import type { HeaderProps } from "../Header/Header.types";

/**
 * Defines the structure of HeaderTitle component slots with flexible element types for semantic markup.
 * @alpha
 */
export type HeaderTitleSlots = {
	root: Slot<
		"span",
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "h6"
		| "p"
		| "pre"
		| "strong"
		| "b"
		| "em"
		| "i"
		| "div"
	>;
};

/**
 * Props for the HeaderTitle component.
 * @alpha
 */
export type HeaderTitleProps = ComponentProps<HeaderTitleSlots> &
	Pick<HeaderProps, "size">;

/**
 * State used in rendering HeaderTitle component, includes resolved props and slot configurations.
 * @alpha
 */
export type HeaderTitleState = ComponentState<HeaderTitleSlots> &
	Required<Pick<HeaderTitleProps, "size">>;
