import * as React from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  End,
  Home,
} from '@fluentui/keyboard-keys';
import type {
  TreeGridProps,
  TreeGridTabsterMoveFocusEventDetail,
} from '../components/TreeGrid';
import { isHTMLElement, useEventCallback } from '@fluentui/react-utilities';

/**
 * TreeGrid props returned by a navigation override hook.
 */
export type TreeGridNavigationOverrideProps = Required<
  Pick<TreeGridProps, 'onKeyDown' | 'onTabsterMoveFocus'>
>;

/**
 * Override callbacks for a single TreeGrid navigation action.
 */
export type TreeGridNavigationOverride = {
  shouldOverride?(
    event: CustomEvent<TreeGridTabsterMoveFocusEventDetail>
  ): boolean;
  onKeyDown?(event: React.KeyboardEvent<HTMLElement>): void;
};

/**
 * Per-direction overrides for TreeGrid keyboard navigation.
 */
export type TreeGridNavigationOverrideConfig = {
  focusFirst?: TreeGridNavigationOverride;
  focusLast?: TreeGridNavigationOverride;
  focusParent?: TreeGridNavigationOverride;
  focusPrevious?: TreeGridNavigationOverride;
  focusNext?: TreeGridNavigationOverride;
};

const getCurrentRow = (target: EventTarget | null): HTMLElement | null => {
  if (!isHTMLElement(target) || target.role !== 'row') {
    return null;
  }

  return target;
};

const getClosestRow = (target: EventTarget | null): HTMLElement | null => {
  if (!isHTMLElement(target)) {
    return null;
  }

  return target.closest<HTMLElement>('[role="row"]');
};

const canFocusParent = (row: HTMLElement | null): row is HTMLElement =>
  !!row && row.getAttribute('aria-expanded') !== 'true';

/**
 * Creates a TreeGrid navigation layer that can selectively override Tabster
 * movement for individual directional actions.
 */
export const useTreeGridNavigationOverride = ({
  focusFirst,
  focusLast,
  focusParent,
  focusPrevious,
  focusNext,
}: TreeGridNavigationOverrideConfig): TreeGridNavigationOverrideProps => {
  const onTabsterMoveFocus = useEventCallback(
    (event: CustomEvent<TreeGridTabsterMoveFocusEventDetail>): void => {
      const { relatedEvent } = event.detail;
      if (event.defaultPrevented) {
        return;
      }
      switch (relatedEvent.key) {
        case Home: {
          if (focusFirst?.shouldOverride?.(event)) {
            event.preventDefault();
          }
          return;
        }
        case End: {
          if (focusLast?.shouldOverride?.(event)) {
            event.preventDefault();
          }
          return;
        }
        case ArrowLeft: {
          const currentRow = getCurrentRow(relatedEvent.target);

          if (
            canFocusParent(currentRow) &&
            focusParent?.shouldOverride?.(event)
          ) {
            event.preventDefault();
          }
          return;
        }
        case ArrowUp: {
          if (
            getClosestRow(relatedEvent.target) &&
            focusPrevious?.shouldOverride?.(event)
          ) {
            event.preventDefault();
          }
          return;
        }
        case ArrowDown: {
          if (
            getClosestRow(relatedEvent.target) &&
            focusNext?.shouldOverride?.(event)
          ) {
            event.preventDefault();
          }
          return;
        }
      }
    }
  );

  const onKeyDown = useEventCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.isDefaultPrevented()) {
        return;
      }
      switch (event.key) {
        case Home: {
          focusFirst?.onKeyDown?.(event);
          return;
        }
        case End: {
          focusLast?.onKeyDown?.(event);
          return;
        }
        case ArrowLeft: {
          if (canFocusParent(getCurrentRow(event.target))) {
            focusParent?.onKeyDown?.(event);
          }
          return;
        }
        case ArrowUp: {
          if (getCurrentRow(event.target)) {
            focusPrevious?.onKeyDown?.(event);
          }
          return;
        }
        case ArrowDown: {
          if (getCurrentRow(event.target)) {
            focusNext?.onKeyDown?.(event);
          }
          return;
        }
      }
    }
  );

  return React.useMemo(
    () => ({ onKeyDown, onTabsterMoveFocus }),
    [onKeyDown, onTabsterMoveFocus]
  );
};

/**
 * Composes multiple TreeGrid navigation layers and stops once one of them
 * handles the current navigation request.
 */
export const useMergedTreeGridNavigation = (
  ...navigationOverrides: TreeGridNavigationOverrideProps[]
): TreeGridNavigationOverrideProps => {
  const onKeyDown = useEventCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      for (const navigationOverride of navigationOverrides) {
        navigationOverride.onKeyDown(event);
        if (event.isDefaultPrevented()) {
          return;
        }
      }
    }
  );

  const onTabsterMoveFocus = useEventCallback(
    (event: CustomEvent<TreeGridTabsterMoveFocusEventDetail>): void => {
      for (const navigationOverride of navigationOverrides) {
        navigationOverride.onTabsterMoveFocus(event);
        if (event.defaultPrevented) {
          return;
        }
      }
    }
  );

  return React.useMemo(
    () => ({ onKeyDown, onTabsterMoveFocus }),
    [onKeyDown, onTabsterMoveFocus]
  );
};
