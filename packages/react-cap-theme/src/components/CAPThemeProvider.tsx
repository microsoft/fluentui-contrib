import type { AccordionHeaderState } from "@fluentui/react-accordion";
import {
	FluentProvider,
	FluentProviderProps,
	AvatarState,
	AvatarGroupItemState,
	DialogActionsState,
	DialogBodyState,
	DialogSurfaceState,
	DialogTitleState,
	teamsLightV21Theme,
} from "@fluentui/react-components";
import type { ImageState } from "@fluentui/react-image";
import type { InfoLabelState } from "@fluentui/react-infolabel";
import type { LabelState } from "@fluentui/react-label";
import type { PopoverSurfaceState } from "@fluentui/react-popover";
import type { SwitchState } from "@fluentui/react-switch";
import * as React from "react";
import { useAccordionHeaderStyles } from "./react-accordion";
import { useAvatarStyles, useAvatarGroupItemStyles } from "./react-avatar";
import type {
	ButtonState,
	MenuButtonState,
	SplitButtonState,
	ToggleButtonState,
} from "./react-button";
import {
	useButtonStyles,
	useMenuButtonStyles,
	useSplitButtonStyles,
	useToggleButtonStyles,
} from "./react-button";
import {
	useDialogActionsStyles,
	useDialogBodyStyles,
	useDialogSurfaceStyles,
	useDialogTitleStyles,
} from "./react-dialog";
import { useImageStyles } from "./react-image";
import { useInfoLabelStyles } from "./react-infolabel";
import { useLabelStyles } from "./react-label";
import { usePopoverSurfaceStyles } from "./react-popover";
import { useSwitchStyles } from "./react-switch";
import { useTooltipStyles } from "./react-tooltip";
import type { TooltipState } from "./react-tooltip/components/Tooltip/Tooltip.types";

export const CAP_STYLE_HOOKS: NonNullable<
	FluentProviderProps["customStyleHooks_unstable"]
> = {
	useAccordionHeaderStyles_unstable: (state) => {
		return useAccordionHeaderStyles(state as AccordionHeaderState);
	},
	useAvatarStyles_unstable: (state) => {
		return useAvatarStyles(state as AvatarState);
	},
	useAvatarGroupItemStyles_unstable: (state) => {
		return useAvatarGroupItemStyles(state as AvatarGroupItemState);
	},
	useInfoLabelStyles_unstable: (state) => {
		return useInfoLabelStyles(state as InfoLabelState);
	},
	useButtonStyles_unstable: (state) => {
		return useButtonStyles(state as ButtonState);
	},
	useDialogActionsStyles_unstable: (state) => {
		return useDialogActionsStyles(state as DialogActionsState);
	},
	useDialogBodyStyles_unstable: (state) => {
		return useDialogBodyStyles(state as DialogBodyState);
	},
	useDialogSurfaceStyles_unstable: (state) => {
		return useDialogSurfaceStyles(state as DialogSurfaceState);
	},
	useDialogTitleStyles_unstable: (state) => {
		return useDialogTitleStyles(state as DialogTitleState);
	},
	useImageStyles_unstable: (state) => {
		return useImageStyles(state as ImageState);
	},
	useLabelStyles_unstable: (state) => {
		return useLabelStyles(state as LabelState);
	},
	useMenuButtonStyles_unstable: (state) => {
		return useMenuButtonStyles(state as MenuButtonState);
	},
	usePopoverSurfaceStyles_unstable: (state) => {
		return usePopoverSurfaceStyles(state as PopoverSurfaceState);
	},
	useSplitButtonStyles_unstable: (state) => {
		return useSplitButtonStyles(state as SplitButtonState);
	},
	useSwitchStyles_unstable: (state) => {
		return useSwitchStyles(state as SwitchState);
	},
	useToggleButtonStyles_unstable: (state) => {
		return useToggleButtonStyles(state as ToggleButtonState);
	},
	useTooltipStyles_unstable: (state) => {
		return useTooltipStyles(state as TooltipState);
	},
};

type CAPThemeProviderProps = Omit<
	FluentProviderProps,
	"theme" | "customStyleHooks_unstable"
>;
export const CAPThemeProvider = ({
	children,
	...rest
}: CAPThemeProviderProps): React.ReactElement => {
	return (
		<FluentProvider
			theme={teamsLightV21Theme}
			customStyleHooks_unstable={CAP_STYLE_HOOKS}
			{...rest}
		>
			{children}
		</FluentProvider>
	);
};
