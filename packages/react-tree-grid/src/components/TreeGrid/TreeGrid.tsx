import * as React from 'react';
import {
  mergeClasses,
  useArrowNavigationGroup,
  useEventCallback,
  useFocusFinders,
} from '@fluentui/react-components';
import { useTreeGridStyles } from './useTreeGridStyles.styles';
import { TreeGridProps } from './TreeGrid.types';
import { useFindParentRow } from '../../hooks/useFindParentRow';
import { isHTMLElement } from '@fluentui/react-utilities';
import {
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  ArrowUp,
} from '@fluentui/keyboard-keys';

export const TreeGrid = React.forwardRef(
  (props: TreeGridProps, ref: React.ForwardedRef<HTMLDivElement>) => {
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
        // TreeGridCell
        const row = event.target.closest<HTMLDivElement>('[role=row]');
        if (!row) {
          return;
        }
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
    return (
      <div
        ref={ref}
        role="treegrid"
        {...props}
        onKeyDown={handleKeyDown}
        className={mergeClasses(useTreeGridStyles(), props.className)}
        {...tabsterAttributes}
      />
    );
  }
);
