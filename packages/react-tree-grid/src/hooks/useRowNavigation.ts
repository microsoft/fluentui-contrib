import * as React from 'react';
import {
  useArrowNavigationGroup,
  useEventCallback,
  useFocusFinders,
} from '@fluentui/react-components';
import {
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  Enter,
} from '@fluentui/keyboard-keys';
import { useFindParentRow } from './useFindParentRow';
import { TreeGridProps } from '../components/TreeGrid/TreeGrid.types';
import { isHTMLElement } from '@fluentui/react-utilities';

/**
 * @internal
 */
export const useRowNavigation = (props: Pick<TreeGridProps, 'onKeyDown'>) => {
  const tabsterAttributes = useArrowNavigationGroup({
    axis: 'vertical',
    memorizeCurrent: true,
  });
  const { findFirstFocusable } = useFocusFinders();
  const findParentRow = useFindParentRow();
  const handleKeyDown = useEventCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      props.onKeyDown?.(event);
      if (!isHTMLElement(event.target)) {
        return;
      }
      // TreeGridRow
      if (event.target.role === 'row') {
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
      const row = event.target.closest<HTMLDivElement>('[role=row]');
      if (!row) {
        return;
      }
      // TreeGridInteraction
      if (event.target.role === 'group') {
        switch (event.key) {
          case Enter: {
            findFirstFocusable(event.target)?.focus();
            return;
          }
          case ArrowDown: {
            if (isHTMLElement(row.nextElementSibling)) {
              row.nextElementSibling.focus();
            }
            return;
          }
          case ArrowUp: {
            if (isHTMLElement(row.previousElementSibling)) {
              row.previousElementSibling.focus();
            }
            return;
          }
          case ArrowLeft: {
            row.focus();
            return;
          }
        }
        return;
      }
      const wrapper = event.target.closest<HTMLDivElement>(
        '[role=row],[role=group],[role=rowheader],[role=gridcell]'
      );
      if (wrapper?.role === 'group') {
        return;
      }
      // TreeGridCell
      switch (event.key) {
        case ArrowDown: {
          if (isHTMLElement(row.nextElementSibling)) {
            row.nextElementSibling.focus();
          }
          return;
        }
        case ArrowUp: {
          if (isHTMLElement(row.previousElementSibling)) {
            row.previousElementSibling.focus();
          }
          return;
        }
        case ArrowLeft: {
          row.focus();
          return;
        }
      }
    }
  );
  return { ...tabsterAttributes, onKeyDown: handleKeyDown };
};
