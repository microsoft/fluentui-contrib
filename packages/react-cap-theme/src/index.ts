import { FluentProviderProps } from '@fluentui/react-components';
import type {
  AccordionHeaderState,
  AccordionPanelState,
} from '@fluentui/react-accordion';
import {
  useAccordionHeaderStyles,
  useAccordionPanelStyles,
} from './components/react-accordion';
import type {
  AvatarState,
  AvatarGroupItemState,
  AvatarGroupPopoverState,
} from '@fluentui/react-avatar';
import {
  useAvatarStyles,
  useAvatarGroupItemStyles,
  useAvatarGroupPopoverStyles,
} from './components/react-avatar';
import type { BadgeState } from '@fluentui/react-badge';
import { useBadgeStyles } from './components/react-badge';
import {
  useButtonStyles,
  useMenuButtonStyles,
  useSplitButtonStyles,
  useToggleButtonStyles,
} from './components/react-button';
import type {
  ButtonState,
  MenuButtonState,
  SplitButtonState,
  ToggleButtonState,
} from './components/react-button';

import {
  useCarouselStyles,
  useCarouselAutoplayButtonStyles,
  useCarouselButtonStyles,
  useCarouselNavStyles,
  useCarouselNavButtonStyles,
  useCarouselNavContainerStyles,
  useCarouselNavImageButtonStyles,
} from './components/react-carousel';
import type {
  CarouselState,
  CarouselAutoplayButtonState,
  CarouselButtonState,
  CarouselNavState,
  CarouselNavContainerState,
} from './components/react-carousel';
import type {
  CarouselNavButtonState,
  CarouselNavImageButtonState,
} from '@fluentui/react-carousel';
import { useCheckboxStyles } from './components/react-checkbox';
import type { CheckboxState } from './components/react-checkbox';
import {
  useDialogActionsStyles,
  useDialogBodyStyles,
  useDialogSurfaceStyles,
  useDialogTitleStyles,
} from './components/react-dialog';
import type {
  DialogActionsState,
  DialogBodyState,
  DialogSurfaceState,
  DialogTitleState,
} from '@fluentui/react-dialog';
import {
  useDrawerBodyStyles,
  useDrawerFooterStyles,
  useDrawerHeaderStyles,
  useDrawerHeaderNavigationStyles,
  useDrawerHeaderTitleStyles,
  useInlineDrawerStyles,
  useOverlayDrawerStyles,
} from './components/react-drawer';
import type {
  DrawerBodyState,
  DrawerFooterState,
  DrawerHeaderState,
  DrawerHeaderNavigationState,
  DrawerHeaderTitleState,
  OverlayDrawerState,
} from '@fluentui/react-drawer';
import type { InlineDrawerState } from './components/react-drawer';
import { useImageStyles } from './components/react-image';
import type { ImageState } from '@fluentui/react-image';
import { useLabelStyles } from './components/react-label';
import type { LabelState } from './components/react-label';
import { useInputStyles } from './components/react-input';
import type { InputState } from './components/react-input';
import { useLinkStyles } from './components/react-link';
import type { LinkState } from './components/react-link';
import {
  useMenuDividerStyles,
  useMenuGroupHeaderStyles,
  useMenuItemStyles,
  useMenuItemCheckboxStyles,
  useMenuItemRadioStyles,
  useMenuPopoverStyles,
  useMenuSplitGroupStyles,
} from './components/react-menu';
import type {
  MenuDividerState,
  MenuGroupHeaderState,
  MenuItemState,
  MenuItemCheckboxState,
  MenuItemRadioState,
  MenuPopoverState,
  MenuSplitGroupState,
} from '@fluentui/react-menu';
import { usePopoverSurfaceStyles } from './components/react-popover';
import type { PopoverSurfaceState } from '@fluentui/react-popover';
import { useTooltipStyles } from './components/react-tooltip';
import type { TooltipState } from './components/react-tooltip';

export const CAP_STYLE_HOOKS: NonNullable<
  FluentProviderProps['customStyleHooks_unstable']
> = {
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
      state as CarouselAutoplayButtonState
    );
  },
  useCarouselButtonStyles_unstable: (state) => {
    return useCarouselButtonStyles(state as CarouselButtonState);
  },
  useCarouselNavButtonStyles_unstable: (state) => {
    return useCarouselNavButtonStyles(state as CarouselNavButtonState);
  },
  useCarouselNavContainerStyles_unstable: (state) => {
    return useCarouselNavContainerStyles(state as CarouselNavContainerState);
  },
  useCarouselNavImageButtonStyles_unstable: (state) => {
    return useCarouselNavImageButtonStyles(
      state as CarouselNavImageButtonState
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
      state as DrawerHeaderNavigationState
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
  useLabelStyles_unstable: (state) => {
    return useLabelStyles(state as LabelState);
  },
  useInputStyles_unstable: (state) => {
    return useInputStyles(state as InputState);
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

export { TEAMS_STYLE_HOOKS } from './teams/index';
