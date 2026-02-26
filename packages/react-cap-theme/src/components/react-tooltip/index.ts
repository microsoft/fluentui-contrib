// Export custom style hook and extended types
export { useTooltipStyles } from "./components/Tooltip/useTooltipStyles.styles";
export { type TooltipState } from "./components/Tooltip/Tooltip.types";

// Re-export everything from Fluent UI
export {
	Tooltip,
	renderTooltip_unstable,
	renderTooltip_unstable as renderTooltip,
	useTooltip_unstable,
	useTooltip_unstable as useTooltip,
	useTooltipStyles_unstable,
	tooltipClassNames,
	type OnVisibleChangeData,
	type TooltipProps,
	type TooltipSlots,
	type TooltipTriggerProps,
} from "@fluentui/react-tooltip";
