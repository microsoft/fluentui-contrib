/** @jsxRuntime classic */
/** @jsx createElement */
/** @jsxFrag Fragment */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement, Fragment } from '@fluentui/react-jsx-runtime';
import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeClasses,
  slot,
  useArrowNavigationGroup,
  useEventCallback,
  useFocusableGroup,
} from '@fluentui/react-components';
import { useTreeGridRowStyles } from './useTreeGridRowStyles.styles';
import { TreeGridRowProps } from './TreeGridRow.types';
import { useMergedTabsterAttributes_unstable } from '@fluentui/react-tabster';
import { isHTMLElement } from '@fluentui/react-utilities';
import { ArrowLeft, ArrowRight, Enter } from '@fluentui/keyboard-keys';
import {
  TreeGridRowProvider,
  useTreeGridRowContext,
  useTreeGridRowContextValue,
} from '../../contexts/TreeGridRowContext';

export const TreeGridRow = React.forwardRef(
  (props: TreeGridRowProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const context = useTreeGridRowContextValue(props);
    const { level } = useTreeGridRowContext();
    const { open, requestOpenChange } = context;
    const styles = useTreeGridRowStyles();
    const tabsterAttributes = useMergedTabsterAttributes_unstable(
      useArrowNavigationGroup({
        axis: 'horizontal',
        memorizeCurrent: true,
      }),
      useFocusableGroup({
        tabBehavior: 'limited-trap-focus',
        ignoreDefaultKeydown: { Enter: true },
      })
    );
    const handleKeyDown = useEventCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        props.onKeyDown?.(event);
        if (event.target !== event.currentTarget) return;
        switch (event.key) {
          case Enter: {
            return event.currentTarget.click();
          }
          case ArrowRight: {
            if (open === false) {
              requestOpenChange({ open: true, event, type: 'keydown' });
            }
            return;
          }
          case ArrowLeft: {
            if (open === true) {
              requestOpenChange({ open: false, event, type: 'keydown' });
            }
            return;
          }
        }
      }
    );
    const handleClick = useEventCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        props.onClick?.(event);
        if (!isHTMLElement(event.target)) {
          return;
        }
        let element: HTMLElement | null = event.target;
        while (element && element !== event.currentTarget) {
          if (element.tabIndex >= 0) return;
          element = element.parentElement;
        }
        requestOpenChange({ open: !open, event, type: 'click' });
      }
    );
    const Subtree = slot.optional(props.subtree === true ? {} : props.subtree, {
      elementType: React.Fragment,
    });
    const Root = slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'row',
        tabIndex: 0,
        'aria-level': level,
        ...tabsterAttributes,
        ...props,
        className: mergeClasses(styles, props.className),
        ...(Subtree && {
          onKeyDown: handleKeyDown,
          onClick: handleClick,
          'aria-expanded': open,
          'aria-level': level,
        }),
      }),
      { elementType: 'div' }
    );
    return (
      <>
        <Root />
        {open && Subtree && (
          <TreeGridRowProvider value={context}>
            <Subtree />
          </TreeGridRowProvider>
        )}
      </>
    );
  }
);
