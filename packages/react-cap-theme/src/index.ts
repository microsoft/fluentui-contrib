import { FluentProviderProps } from "@fluentui/react-components";
import {
	useAccordionStyles,
	useAccordionItemStyles,
	useAccordionHeaderStyles,
	useAccordionPanelStyles,
	type AccordionState,
	type AccordionItemState,
	type AccordionHeaderState,
	type AccordionPanelState,
} from "./components/react-accordion";
import {
	useAvatarGroupStyles,
	useAvatarStyles,
	useAvatarGroupItemStyles,
	useAvatarGroupPopoverStyles,
	type AvatarGroupState,
	type AvatarState,
	type AvatarGroupItemState,
	type AvatarGroupPopoverState,
} from "./components/react-avatar";
import { useBadgeStyles, type BadgeState } from "./components/react-badge";
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
import {
	useCarouselStyles,
	useCarouselAutoplayButtonStyles,
	useCarouselButtonStyles,
	useCarouselNavStyles,
	useCarouselNavButtonStyles,
	useCarouselNavContainerStyles,
	useCarouselNavImageButtonStyles,
	type CarouselState,
	type CarouselAutoplayButtonState,
	type CarouselButtonState,
	type CarouselNavState,
	type CarouselNavButtonState,
	type CarouselNavContainerState,
	type CarouselNavImageButtonState,
} from "./components/react-carousel";
import {
	useCheckboxStyles,
	type CheckboxState,
} from "./components/react-checkbox";
import {
	useDialogTitleStyles,
	useDialogActionsStyles,
	useDialogBodyStyles,
	useDialogSurfaceStyles,
	type DialogTitleState,
	type DialogActionsState,
	type DialogBodyState,
	type DialogSurfaceState,
} from "./components/react-dialog";
import {
	useDrawerBodyStyles,
	useDrawerFooterStyles,
	useDrawerHeaderStyles,
	useDrawerHeaderNavigationStyles,
	useDrawerHeaderTitleStyles,
	useInlineDrawerStyles,
	useOverlayDrawerStyles,
	type DrawerBodyState,
	type DrawerFooterState,
	type DrawerHeaderState,
	type DrawerHeaderNavigationState,
	type DrawerHeaderTitleState,
	type InlineDrawerState,
	type OverlayDrawerState,
} from "./components/react-drawer";
import { useImageStyles, type ImageState } from "./components/react-image";
import { useLinkStyles, type LinkState } from "./components/react-link";
import {
	useMenuDividerStyles,
	useMenuGroupHeaderStyles,
	useMenuItemStyles,
	useMenuItemCheckboxStyles,
	useMenuItemRadioStyles,
	useMenuPopoverStyles,
	useMenuSplitGroupStyles,
	type MenuDividerState,
	type MenuGroupHeaderState,
	type MenuItemState,
	type MenuItemCheckboxState,
	type MenuItemRadioState,
	type MenuPopoverState,
	type MenuSplitGroupState,
} from "./components/react-menu";
import {
	usePopoverSurfaceStyles,
	type PopoverSurfaceState,
} from "./components/react-popover";
import {
	useTooltipStyles,
	type TooltipState,
} from "./components/react-tooltip";

export { getIntrinsicElementProps, slot } from "@fluentui/react-utilities";
export {
	motionTokens,
	makeStyles,
	mergeClasses,
} from "@fluentui/react-components";

export * from "./components/react-accordion";
export * from "./components/react-avatar";
export * from "./components/react-badge";
export * from "./components/react-button";
export * from "./components/react-carousel";
export * from "./components/react-checkbox";
export * from "./components/react-dialog";
export * from "./components/react-drawer";
export * from "./components/react-icons";
export * from "./components/react-image";
export * from "./components/react-link";
export * from "./components/react-popover";
export * from "./components/react-tooltip";
export * from "./components/tokens";

export const CAP_STYLE_HOOKS: NonNullable<
	FluentProviderProps["customStyleHooks_unstable"]
> = {
	useAccordionStyles_unstable: (state) => {
		return useAccordionStyles(state as AccordionState);
	},
	useAccordionItemStyles_unstable: (state) => {
		return useAccordionItemStyles(state as AccordionItemState);
	},
	useAccordionHeaderStyles_unstable: (state) => {
		return useAccordionHeaderStyles(state as AccordionHeaderState);
	},
	useAccordionPanelStyles_unstable: (state) => {
		return useAccordionPanelStyles(state as AccordionPanelState);
	},
	useAvatarGroupItemStyles_unstable: (state) => {
		return useAvatarGroupItemStyles(state as AvatarGroupItemState);
	},
	useAvatarGroupPopoverStyles_unstable: (state) => {
		return useAvatarGroupPopoverStyles(state as AvatarGroupPopoverState);
	},
	useAvatarGroupStyles_unstable: (state) => {
		return useAvatarGroupStyles(state as AvatarGroupState);
	},
	useAvatarStyles_unstable: (state) => {
		return useAvatarStyles(state as AvatarState);
	},
	useBadgeStyles_unstable: (state) => {
		return useBadgeStyles(state as BadgeState);
	},
	useButtonStyles_unstable: (state) => {
		return useButtonStyles(state as ButtonState);
	},
	useCarouselAutoplayButtonStyles_unstable: (state) => {
		return useCarouselAutoplayButtonStyles(
			state as CarouselAutoplayButtonState,
		);
	},
	useCarouselButtonStyles_unstable: (state) => {
		return useCarouselButtonStyles(state as CarouselButtonState);
	},
	useCarouselNavButtonStyles_unstable: (state) => {
		return useCarouselNavButtonStyles(state as CarouselNavButtonState);
	},
	useCarouselNavContainerStyles_unstable: (state) => {
		return useCarouselNavContainerStyles(
			state as CarouselNavContainerState,
		);
	},
	useCarouselNavImageButtonStyles_unstable: (state) => {
		return useCarouselNavImageButtonStyles(
			state as CarouselNavImageButtonState,
		);
	},
	useCarouselNavStyles_unstable: (state) => {
		return useCarouselNavStyles(state as CarouselNavState);
	},
	useCarouselStyles_unstable: (state) => {
		return useCarouselStyles(state as CarouselState);
	},
	useCheckboxStyles_unstable: (state) => {
		return useCheckboxStyles(state as CheckboxState);
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
	useDrawerBodyStyles_unstable: (state) => {
		return useDrawerBodyStyles(state as DrawerBodyState);
	},
	useDrawerFooterStyles_unstable: (state) => {
		return useDrawerFooterStyles(state as DrawerFooterState);
	},
	useDrawerHeaderNavigationStyles_unstable: (state) => {
		return useDrawerHeaderNavigationStyles(
			state as DrawerHeaderNavigationState,
		);
	},
	useDrawerHeaderStyles_unstable: (state) => {
		return useDrawerHeaderStyles(state as DrawerHeaderState);
	},
	useDrawerHeaderTitleStyles_unstable: (state) => {
		return useDrawerHeaderTitleStyles(state as DrawerHeaderTitleState);
	},
	useImageStyles_unstable: (state) => {
		return useImageStyles(state as ImageState);
	},
	useInlineDrawerStyles_unstable: (state) => {
		return useInlineDrawerStyles(state as InlineDrawerState);
	},
	useLinkStyles_unstable: (state) => {
		return useLinkStyles(state as LinkState);
	},
	useMenuButtonStyles_unstable: (state) => {
		return useMenuButtonStyles(state as MenuButtonState);
	},
	useOverlayDrawerStyles_unstable: (state) => {
		return useOverlayDrawerStyles(state as OverlayDrawerState);
	},
	usePopoverSurfaceStyles_unstable: (state) => {
		return usePopoverSurfaceStyles(state as PopoverSurfaceState);
	},
	useSplitButtonStyles_unstable: (state) => {
		return useSplitButtonStyles(state as SplitButtonState);
	},
	useToggleButtonStyles_unstable: (state) => {
		return useToggleButtonStyles(state as ToggleButtonState);
	},
	useTooltipStyles_unstable: (state) => {
		return useTooltipStyles(state as TooltipState);
	},
	useMenuDividerStyles_unstable: (state) => {
		return useMenuDividerStyles(state as MenuDividerState);
	},
	useMenuGroupHeaderStyles_unstable: (state) => {
		return useMenuGroupHeaderStyles(state as MenuGroupHeaderState);
	},
	useMenuItemStyles_unstable: (state) => {
		return useMenuItemStyles(state as MenuItemState);
	},
	useMenuItemCheckboxStyles_unstable: (state) => {
		return useMenuItemCheckboxStyles(state as MenuItemCheckboxState);
	},
	useMenuItemRadioStyles_unstable: (state) => {
		return useMenuItemRadioStyles(state as MenuItemRadioState);
	},
	useMenuPopoverStyles_unstable: (state) => {
		return useMenuPopoverStyles(state as MenuPopoverState);
	},
	useMenuSplitGroupStyles_unstable: (state) => {
		return useMenuSplitGroupStyles(state as MenuSplitGroupState);
	},
};
