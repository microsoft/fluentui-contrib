'use client';

import * as React from 'react';
import {
  useMergedRefs,
  slot,
  useTimeout,
  useOnClickOutside,
  elementContains,
} from '@fluentui/react-utilities';
import { usePopoverContext_unstable } from '../../popoverContext';
import type {
  PopoverSurfaceProps,
  PopoverSurfaceState,
} from './PopoverSurface.types';
import { useFluent } from '@fluentui/react-components';

/**
 * Create the state required to render PopoverSurface.
 *
 * The returned state can be modified with hooks such as usePopoverSurfaceStyles_unstable,
 * before being passed to renderPopoverSurface_unstable.
 *
 * @param props - props from this instance of PopoverSurface
 * @param ref - reference to root HTMLDivElement of PopoverSurface
 */
export const usePopoverSurface_unstable = (
  props: PopoverSurfaceProps,
  ref: React.Ref<HTMLDivElement>
): PopoverSurfaceState => {
  const { targetDocument } = useFluent();

  // Check if tabIndex was explicitly set in props
  const hasExplicitTabIndex = 'tabIndex' in props;

  const id = usePopoverContext_unstable((context) => context.id);
  const contentRef = usePopoverContext_unstable(
    (context) => context.contentRef
  );
  const appearance = usePopoverContext_unstable(
    (context) => context.appearance
  );
  const inline = usePopoverContext_unstable((context) => context.inline);
  const isControlled = usePopoverContext_unstable(
    (context) => context.isControlled
  );
  const anchorName = usePopoverContext_unstable(
    (context) => context.anchorName
  );
  const positioning = usePopoverContext_unstable(
    (context) => context.positioning
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
  const trapFocus = usePopoverContext_unstable((context) => context.trapFocus);
  const inertTrapFocus = usePopoverContext_unstable(
    (context) => context.inertTrapFocus
  );
  const legacyTrapFocus = usePopoverContext_unstable(
    (context) => context.legacyTrapFocus
  );
  const unstable_disableAutoFocus = usePopoverContext_unstable(
    (context) => context.unstable_disableAutoFocus
  );
  const setOpen = usePopoverContext_unstable((context) => context.setOpen);
  const open = usePopoverContext_unstable((context) => context.open);

  const [setCloseTimer, clearCloseTimer] = useTimeout();
  const [setFinderTimer, clearFinderTimer] = useTimeout();

  // Use 'manual' mode ONLY for openOnHover/openOnContext to prevent browser auto-dismiss
  // Use 'auto' mode for everything else (including regular controlled popovers) to get automatic light-dismiss
  const popoverMode = openOnHover || openOnContext ? 'manual' : 'auto';

  // Build focusgroup attribute value based on trapFocus settings
  let focusgroupValue: string | undefined = undefined;
  if (trapFocus) {
    if (inertTrapFocus) {
      // Use inert-based focus trap with wrap behavior
      focusgroupValue = 'wrap';
    } else if (legacyTrapFocus) {
      // Use legacy Tab key cycling (handled by keydown listener below)
      focusgroupValue = undefined;
    } else {
      // Default: use wrap behavior
      focusgroupValue = 'wrap';
    }
  }

  const state: PopoverSurfaceState = {
    inline,
    appearance,
    positioning,
    components: {
      root: 'div',
    },
    root: slot.always(
      {
        id,
        popover: popoverMode,
        ref: useMergedRefs(ref, contentRef),
        style: {
          ...props?.style,
          // Pass anchor name as CSS variable for anchor positioning
          '--popover-anchor-name': anchorName,
        } as React.CSSProperties,
        ...(focusgroupValue && { focusgroup: focusgroupValue }),
        // Add role based on trapFocus
        role: trapFocus ? 'dialog' : 'group',
        // Add aria-modal when trapFocus is enabled
        ...(trapFocus && { 'aria-modal': 'true' }),
        ...props,
      },
      { elementType: 'div' }
    ),
  };

  // Add hover event handlers for openOnHover functionality
  const {
    onMouseEnter: onMouseEnterOriginal,
    onMouseLeave: onMouseLeaveOriginal,
  } = state.root;

  state.root.onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (openOnHover) {
      // Clear any pending close timer
      clearCloseTimer();
      setOpen(e, true);
    }
    onMouseEnterOriginal?.(e);
  };

  state.root.onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
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
    onMouseLeaveOriginal?.(e);
  };

  // Store the element that had focus before opening for restoration
  const previouslyFocusedElementRef = React.useRef<HTMLElement | null>(null);

  // Handle autofocus and focus restoration
  React.useEffect(() => {
    if (open && !unstable_disableAutoFocus) {
      // Store the currently focused element before moving focus
      if (!previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current =
          targetDocument?.activeElement as HTMLElement;
      }

      // Use setTimeout to ensure the popover is fully shown before focusing
      // eslint-disable-next-line no-restricted-globals
      const timerId = setTimeout(() => {
        // Move focus to the popover content
        const popoverElement = contentRef.current;
        if (popoverElement && popoverElement.matches(':popover-open')) {
          // If trap focus is enabled and the surface itself has a tabIndex prop, focus it directly
          if (trapFocus && hasExplicitTabIndex) {
            popoverElement.focus();
          } else {
            // Try to focus the first focusable element inside
            const firstFocusable = popoverElement.querySelector<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (firstFocusable) {
              firstFocusable.focus();
            } else {
              // If no focusable element, focus the popover itself
              popoverElement.focus();
            }
          }
        }
      }, 0);

      // eslint-disable-next-line no-restricted-globals
      return () => clearTimeout(timerId);
    }

    // Restore focus when closing
    if (!open && previouslyFocusedElementRef.current) {
      previouslyFocusedElementRef.current.focus();
      previouslyFocusedElementRef.current = null;
    }
  }, [
    open,
    unstable_disableAutoFocus,
    contentRef,
    targetDocument,
    hasExplicitTabIndex,
  ]);

  // Implement legacy focus trap using Tab key cycling
  React.useEffect(() => {
    if (!open || !trapFocus || !legacyTrapFocus) return;

    const popoverElement = contentRef.current;
    if (!popoverElement) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = popoverElement.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if on first element, move to last
        if (targetDocument?.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab: if on last element, move to first
        if (targetDocument?.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    popoverElement.addEventListener('keydown', handleKeyDown);
    return () => {
      popoverElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, trapFocus, legacyTrapFocus, contentRef]);

  // Implement inert-based focus trap
  React.useEffect(() => {
    if (!open || !trapFocus || !inertTrapFocus) return;

    // Make all elements outside the popover inert
    const popoverElement = contentRef.current;
    if (!popoverElement) return;

    const allElements =
      targetDocument?.body.querySelectorAll<HTMLElement>('body > *') ?? [];
    const elementsToMakeInert: HTMLElement[] = [];

    allElements.forEach((element) => {
      if (element !== popoverElement && !element.contains(popoverElement)) {
        if (!element.hasAttribute('inert')) {
          element.setAttribute('inert', '');
          elementsToMakeInert.push(element);
        }
      }
    });

    return () => {
      // Remove inert attribute on cleanup
      elementsToMakeInert.forEach((element) => {
        element.removeAttribute('inert');
      });
    };
  }, [open, trapFocus, inertTrapFocus, contentRef, targetDocument]);

  // Handle Escape key for manual mode popovers (openOnHover/openOnContext)
  React.useEffect(() => {
    if (!open || (!openOnHover && !openOnContext)) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(e as unknown as React.KeyboardEvent<HTMLElement>, false);
      }
    };

    targetDocument?.addEventListener('keydown', handleKeyDown);
    return () => {
      targetDocument?.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, openOnHover, openOnContext, setOpen, targetDocument]);

  // Handle click outside for manual mode popovers (openOnHover/openOnContext)
  const triggerRef = usePopoverContext_unstable(
    (context) => context.triggerRef
  );

  useOnClickOutside({
    element: targetDocument,
    refs: [contentRef, triggerRef],
    callback: (ev) =>
      setOpen(ev as unknown as React.MouseEvent<HTMLElement>, false),
    disabled: !open || (!openOnHover && !openOnContext),
    contains: (parent, child) => {
      // Use default contains check
      if (elementContains(parent, child)) {
        return true;
      }
      // Also check if clicking on a trigger element with popovertarget
      return child.closest('[popovertarget]') !== null;
    },
  });

  return state;
};
