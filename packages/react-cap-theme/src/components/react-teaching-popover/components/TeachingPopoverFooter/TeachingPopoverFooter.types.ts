import type {
  TeachingPopoverFooterProps as FluentTeachingPopoverFooterProps,
  TeachingPopoverFooterState as FluentTeachingPopoverFooterState,
} from '@fluentui/react-teaching-popover';
import type {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-utilities';
import type { Button } from '@fluentui/react-button';

/**
 * Slot definitions for the SharePoint TeachingPopoverFooter. Uses SP Button for the primary
 * and secondary slots so consumers can pass SP-specific Button appearances such as 'tint'.
 * @alpha
 */
export type TeachingPopoverFooterSlots = {
  root: NonNullable<Slot<'div'>>;
  primary: NonNullable<Slot<typeof Button>>;
  secondary?: Slot<typeof Button>;
};

/**
 * Props for the SharePoint TeachingPopoverFooter. Mirrors Fluent's footer props, but the
 * primary and secondary slots accept SP Button props (including SP-specific appearances).
 * @alpha
 */
export type TeachingPopoverFooterProps =
  ComponentProps<TeachingPopoverFooterSlots> &
    Pick<FluentTeachingPopoverFooterProps, 'footerLayout'>;

/**
 * State for the SharePoint TeachingPopoverFooter. Uses SP slot types so consumers' VR-only
 * appearances reach `state.primary` / `state.secondary` without losing type information.
 * @alpha
 */
export type TeachingPopoverFooterState =
  ComponentState<TeachingPopoverFooterSlots> &
    Pick<FluentTeachingPopoverFooterState, 'appearance' | 'footerLayout'>;
