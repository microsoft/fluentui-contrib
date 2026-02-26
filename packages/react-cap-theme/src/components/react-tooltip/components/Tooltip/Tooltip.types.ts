import type { TooltipState as FluentTooltipState } from "@fluentui/react-tooltip";

export type TooltipState = Omit<FluentTooltipState, "appearance"> & {
	appearance: FluentTooltipState["appearance"] | "brand";
};
