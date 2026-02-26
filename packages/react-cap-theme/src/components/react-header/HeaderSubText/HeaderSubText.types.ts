import type { PresenceMotionSlotProps } from "@fluentui/react-motion";
import type {
	ComponentProps,
	ComponentState,
	Slot,
} from "@fluentui/react-utilities";
import type { HeaderState } from "../Header/Header.types";

/**
 * Defines the structure of HeaderSubText component slots, extending HeaderTitle slots with collapse motion.
 * @alpha
 */
export type HeaderSubTextSlots = {
	root: Slot<"span", "p" | "pre" | "strong" | "b" | "em" | "i" | "div">;
	collapseMotion?: Slot<PresenceMotionSlotProps>;
};

/**
 * Props for the HeaderSubText component.
 * @alpha
 */
export type HeaderSubTextProps = ComponentProps<HeaderSubTextSlots>;

/**
 * State used in rendering HeaderSubText component, includes resolved props and slot configurations.
 * @alpha
 */
export type HeaderSubTextState = ComponentState<HeaderSubTextSlots> &
	Pick<HeaderState, "collapsible">;
