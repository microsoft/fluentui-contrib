import type {
  TeachingPopoverCarouselFooterButtonProps as FluentTeachingPopoverCarouselFooterButtonProps,
  TeachingPopoverCarouselFooterButtonSlots as FluentTeachingPopoverCarouselFooterButtonSlots,
} from '@fluentui/react-teaching-popover';
import type { ComponentState } from '@fluentui/react-utilities';
import type { PopoverContextValue } from '@fluentui/react-popover';
import type { ButtonState } from '../../../react-button';

/**
 * Slot definitions for the SharePoint TeachingPopoverCarouselFooterButton — identical to
 * Fluent's; re-exported so consumers can reach it through the SP package.
 * @alpha
 */
export type TeachingPopoverCarouselFooterButtonSlots =
  FluentTeachingPopoverCarouselFooterButtonSlots;

/**
 * Props for the SharePoint TeachingPopoverCarouselFooterButton. Extends Fluent's button props
 * but widens `appearance` with SP-specific values such as 'tint' through SP `ButtonState`.
 * @alpha
 */
export type TeachingPopoverCarouselFooterButtonProps = Omit<
  FluentTeachingPopoverCarouselFooterButtonProps,
  'appearance'
> & {
  appearance?: ButtonState['appearance'];
};

/**
 * State for the SharePoint TeachingPopoverCarouselFooterButton. Mirrors Fluent's state but
 * extends SP `ButtonState` so the SP `useButtonStyles` hook accepts it without casting.
 * @alpha
 */
export type TeachingPopoverCarouselFooterButtonState = ButtonState &
  ComponentState<TeachingPopoverCarouselFooterButtonSlots> &
  Pick<TeachingPopoverCarouselFooterButtonProps, 'navType' | 'altText'> & {
    popoverAppearance: PopoverContextValue['appearance'];
  };
