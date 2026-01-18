'use client';

import * as React from 'react';
import {
  applyTriggerPropsToChildren,
  getTriggerChild,
  getReactElementRef,
  useMergedRefs,
  useEventCallback,
  mergeCallbacks,
  useTimeout,
} from '@fluentui/react-utilities';
import { usePopoverContext_unstable } from '../../popoverContext';
import type {
  PopoverTriggerProps,
  PopoverTriggerState,
} from './PopoverTrigger.types';

/**
 * Create the state required to render PopoverTrigger.
 *
 * The returned state can be modified with hooks such as usePopoverTriggerStyles,
 * before being passed to renderPopoverTrigger_unstable.
 *
 * @param props - props from this instance of PopoverTrigger
 */
export const usePopoverTrigger_unstable = (
  props: PopoverTriggerProps
): PopoverTriggerState => {
  const { children } = props;
  const child = getTriggerChild(children);

  const id = usePopoverContext_unstable((context) => context.id);
  const triggerRef = usePopoverContext_unstable(
    (context) => context.triggerRef
  );
  const anchorName = usePopoverContext_unstable(
    (context) => context.anchorName
  );
  const openOnHover = usePopoverContext_unstable(
    (context) => context.openOnHover
  );
  const openOnContext = usePopoverContext_unstable(
    (context) => context.openOnContext
  );
  const mouseLeaveDelay = usePopoverContext_unstable(
    (context) => context.mouseLeaveDelay
  );
  const setOpen = usePopoverContext_unstable((context) => context.setOpen);
  const open = usePopoverContext_unstable((context) => context.open);

  const [setCloseTimer, clearCloseTimer] = useTimeout();

  const onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      // Clear any pending close timer
      clearCloseTimer();
      setOpen(e, true);
    }
  });

  const onMouseLeave = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      if (mouseLeaveDelay !== undefined && mouseLeaveDelay > 0) {
        // Set a timer to close after the delay
        setCloseTimer(() => {
          setOpen(e, false);
        }, mouseLeaveDelay);
      } else {
        setOpen(e, false);
      }
    }
  });

  const onClick = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    // For hover mode, clicks should toggle the popover
    if (openOnHover) {
      e.preventDefault();
      setOpen(e, !open);
    }
    // For context menu mode, left clicks should be ignored
    if (openOnContext) {
      e.preventDefault();
    }
  });

  const onContextMenu = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnContext) {
      e.preventDefault();
      setOpen(e, true);
    }
  });

  const onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLElement>) => {
    // For controlled popovers (openOnHover/openOnContext), we need to manually handle keyboard
    // For uncontrolled popovers, the native popovertarget attribute handles this
    if (openOnHover || openOnContext) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(e, !open);
      }
    }
  });

  const shouldSetAriaExpanded = !('aria-expanded' in (child?.props || {}));

  const triggerChildProps: any = {
    // Only add popovertarget if not using hover or context menu behavior
    // When openOnHover or openOnContext is true, we handle open/close manually via events
    ...(!openOnHover && !openOnContext && { popovertarget: id }),
    ...child?.props,
    // Set aria-expanded based on open state unless explicitly provided by user
    ...(shouldSetAriaExpanded && { 'aria-expanded': String(open) }),
    ref: useMergedRefs(triggerRef, getReactElementRef(child)),
    onMouseEnter: mergeCallbacks(
      (child?.props as any)?.onMouseEnter,
      onMouseEnter
    ),
    onMouseLeave: mergeCallbacks(
      (child?.props as any)?.onMouseLeave,
      onMouseLeave
    ),
    onClick: mergeCallbacks((child?.props as any)?.onClick, onClick),
    onContextMenu: mergeCallbacks(
      (child?.props as any)?.onContextMenu,
      onContextMenu
    ),
    onKeyDown: mergeCallbacks((child?.props as any)?.onKeyDown, onKeyDown),
    style: {
      ...(child?.props as any)?.style,
      anchorName,
    },
  };

  return {
    children: applyTriggerPropsToChildren(props.children, triggerChildProps),
  };
};
