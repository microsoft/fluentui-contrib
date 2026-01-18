'use client';

import * as React from 'react';
import {
  useId,
  useControllableState,
  useEventCallback,
} from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-components';
import { useOnScrollOutside, elementContains } from '@fluentui/react-utilities';
import type {
  PopoverProps,
  PopoverState,
  OpenPopoverEvents,
} from './Popover.types';

// Type definition for the ToggleEvent from Popover API
interface ToggleEvent extends Event {
  readonly newState: 'open' | 'closed';
  readonly oldState: 'open' | 'closed';
}

/**
 * Create the state required to render Popover.
 *
 * The returned state can be modified with hooks such as usePopoverStyles,
 * before being passed to renderPopover_unstable.
 *
 * @param props - props from this instance of Popover
 */
export const usePopover_unstable = (props: PopoverProps): PopoverState => {
  const id = useId('popover-');
  const triggerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLElement>(null);

  const children = React.Children.toArray(
    props.children
  ) as React.ReactElement[];

  if (process.env.NODE_ENV !== 'production') {
    if (children.length === 0) {
       
      console.warn('Popover must contain at least one child');
    }

    if (children.length > 2) {
       
      console.warn('Popover must contain at most two children');
    }
  }

  let popoverTrigger: React.ReactElement | undefined = undefined;
  let popoverSurface: React.ReactElement | undefined = undefined;
  if (children.length === 2) {
    popoverTrigger = children[0];
    popoverSurface = children[1];
  } else if (children.length === 1) {
    popoverSurface = children[0];
  }

  // Controlled/uncontrolled state management
  const [open, setOpenState] = useOpenState(props);

  const setOpen = useEventCallback(
    (e: OpenPopoverEvents, shouldOpen: boolean) => {
      setOpenState(e, shouldOpen);
    }
  );

  // Check if we're in controlled mode (has open prop OR openOnHover/openOnContext)
  // openOnHover and openOnContext require manual mode to prevent auto-dismiss
  // Note: defaultOpen doesn't make it controlled, it just sets the initial uncontrolled state
  const isControlled =
    props.open !== undefined ||
    props.openOnHover === true ||
    props.openOnContext === true;

  // Close on scroll if enabled or if using openOnContext
  const { targetDocument } = useFluent();
  useOnScrollOutside({
    contains: elementContains,
    element: targetDocument,
    callback: (ev) =>
      setOpen(ev as unknown as React.MouseEvent<HTMLElement>, false),
    refs: [triggerRef, contentRef],
    disabled: !open || (!props.closeOnScroll && !props.openOnContext),
  });

  // Sync open state with popover element for controlled scenarios
  // For uncontrolled popovers with popover="auto", the browser handles this via popovertarget
  React.useEffect(() => {
    // Only manually control the popover element for controlled scenarios
    if (!isControlled) return;

    const popoverElement = contentRef.current;
    if (!popoverElement) return;

    const isPopoverOpen = popoverElement.matches(':popover-open');

    if (open && !isPopoverOpen) {
      popoverElement.showPopover();
    } else if (!open && isPopoverOpen) {
      popoverElement.hidePopover();
    }
  }, [open, isControlled]);

  // Listen to popover toggle events from the browser to sync with onOpenChange
  React.useEffect(() => {
    const popoverElement = contentRef.current;
    if (!popoverElement) return;

    const handleToggle = (e: Event) => {
      const toggleEvent = e as ToggleEvent;
      const newState = toggleEvent.newState === 'open';
      // Cast to MouseEvent since the toggle event is not a React SyntheticEvent
      // and we need a specific event type for the callback
      setOpen(e as unknown as React.MouseEvent<HTMLElement>, newState);
    };

    popoverElement.addEventListener('toggle', handleToggle);
    return () => {
      popoverElement.removeEventListener('toggle', handleToggle);
    };
  }, [setOpen]);

  // Create anchor name for CSS Anchor Positioning
  const anchorName = `--${id}-anchor`;

  return {
    id,
    popoverTrigger,
    popoverSurface,
    appearance: props.appearance,
    inline: props.inline ?? false,
    closeOnScroll: props.closeOnScroll,
    onOpenChange: props.onOpenChange,
    openOnHover: props.openOnHover,
    openOnContext: props.openOnContext,
    mouseLeaveDelay: props.mouseLeaveDelay,
    trapFocus: props.trapFocus,
    inertTrapFocus: props.inertTrapFocus,
    legacyTrapFocus: props.legacyTrapFocus,
    unstable_disableAutoFocus: props.unstable_disableAutoFocus,
    positioning: props.positioning,
    open,
    setOpen,
    triggerRef,
    contentRef,
    children: props.children,
    isControlled,
    anchorName,
  };
};

/**
 * Creates and manages the Popover open state
 */
function useOpenState(
  props: Pick<PopoverProps, 'open' | 'defaultOpen' | 'onOpenChange'>
) {
  'use no memo';

  const onOpenChange = useEventCallback(
    (e: OpenPopoverEvents, data: { open: boolean }) =>
      props.onOpenChange?.(e, data)
  );

  const [open, setOpenState] = useControllableState({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  });

  const setOpen = React.useCallback(
    (e: OpenPopoverEvents, shouldOpen: boolean) => {
      setOpenState(shouldOpen);
      onOpenChange(e, { open: shouldOpen });
    },
    [setOpenState, onOpenChange]
  );

  return [open ?? false, setOpen] as const;
}
