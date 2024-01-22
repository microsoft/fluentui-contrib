import * as React from 'react';
import {
  useArrowNavigationGroup,
  useFocusFinders,
} from '@fluentui/react-tabster';
import type { TreeGridProps } from '../components/TreeGrid/TreeGrid.types';
import { isHTMLElement, useEventCallback } from '@fluentui/react-utilities';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Escape,
  keyCodes,
} from '@fluentui/keyboard-keys';

export const useNavigation = (props: Pick<TreeGridProps, 'onKeyDown'>) => {
  const tabsterAttributes = useArrowNavigationGroup({
    axis: 'vertical',
    memorizeCurrent: true,
  });
  const { findFirstFocusable } = useFocusFinders();
  const findParentRow = useFindParentRow();
  const handleKeyDown = useEventCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      props.onKeyDown?.(event);
      // TreeGridRow
      if (isHTMLElement(event.target) && event.target.role === 'row') {
        switch (event.key) {
          case ArrowRight: {
            const ariaExpanded = event.target.getAttribute('aria-expanded');
            if (ariaExpanded === 'false') {
              return;
            }
            findFirstFocusable(event.target)?.focus();
            return;
          }
          case ArrowLeft: {
            const ariaExpanded = event.target.getAttribute('aria-expanded');
            if (ariaExpanded === 'true') {
              return;
            }
            findParentRow(event.target)?.focus();
            return;
          }
        }
        return;
      }
      // TreeGridCell
      switch (event.key) {
        case ArrowDown:
        case ArrowUp:
        case ArrowLeft: {
          event.target.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: Escape,
              keyCode: keyCodes.Escape,
            })
          );
        }
      }
    }
  );
  return { onKeyDown: handleKeyDown, ...tabsterAttributes };
};

const useFindParentRow = () => {
  const { findPrevFocusable } = useFocusFinders();
  return React.useCallback(
    (currentRow: HTMLElement): HTMLElement | null => {
      const currentLevel = Number(currentRow.getAttribute('aria-level'));
      if (isNaN(currentLevel)) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(
            `TreeGrid: aria-level ${currentLevel} is not a number, at row:`,
            currentRow
          );
        }
        return null;
      }
      if (currentLevel === 1) {
        return null;
      }
      let element = currentRow;
      while (Number(element.getAttribute('aria-level')) !== currentLevel - 1) {
        const nextElement = findPrevFocusable(element);
        if (!nextElement) {
          return null;
        }
        element = nextElement;
      }
      if (element !== currentRow) {
        return element;
      }
      return null;
    },
    [findPrevFocusable]
  );
};
