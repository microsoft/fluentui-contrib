/** @jsxRuntime classic */
/** @jsx createElement */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeClasses,
  slot,
  useArrowNavigationGroup,
  useEventCallback,
  useFocusFinders,
} from '@fluentui/react-components';
import { TreeGridProps } from './TreeGrid.types';
import { useFindParentRow } from '../../hooks/useFindParentRow';
import { isHTMLElement } from '@fluentui/react-utilities';
import {
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  Enter,
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
    const Root = slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'treegrid',
        ...props,
        className: mergeClasses('fui-TreeGrid', props.className),
        ...tabsterAttributes,
        onKeyDown: handleKeyDown,
      }),
      { elementType: 'div' }
    );
    return <Root />;
  }
);
