import type { CardProps as BaseCardProps } from "@fluentui/react-card";

export type {
	CardContextValue,
	CardOnSelectionChangeEvent,
	CardSlots,
	CardState,
} from "@fluentui/react-card";

/**
 * Props for the Card component.
 * @alpha
 */
export type CardProps = Omit<BaseCardProps, "appearance" | "size">;
