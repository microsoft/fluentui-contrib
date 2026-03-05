import type { PopoverSize } from "@fluentui/react-popover";

export const POPOVER_SIZES = [
	"small",
	"medium",
	"large",
] as const satisfies PopoverSize[];

export * from "./components/PopoverSurface/usePopoverSurfaceStyles.styles";

// compatibility exports for other components
export {
	Popover,
	PopoverSurface,
	PopoverTrigger,
	usePopover_unstable,
	usePopover_unstable as usePopover,
	usePopoverSurfaceStyles_unstable,
	renderPopover_unstable,
	renderPopover_unstable as renderPopover,
	renderPopoverSurface_unstable,
	renderPopoverSurface_unstable as renderPopoverSurface,
	usePopoverSurface_unstable,
	usePopoverSurface_unstable as usePopoverSurface,
	PopoverProvider,
	usePopoverContext_unstable,
	usePopoverContext_unstable as usePopoverContext,
	arrowHeights,
	type OnOpenChangeData,
	type OpenPopoverEvents,
	type PopoverContextValue,
	type PopoverProps,
	type PopoverSize,
	type PopoverState,
	type PopoverSurfaceProps,
	type PopoverSurfaceSlots,
	type PopoverSurfaceState,
	type PopoverTriggerChildProps,
	type PopoverTriggerProps,
	type PopoverTriggerState,
} from "@fluentui/react-popover";
