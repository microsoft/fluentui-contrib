import * as React from 'react';
import {
  mergeClasses,
  useArrowNavigationGroup,
  useEventCallback,
  useFocusableGroup,
} from '@fluentui/react-components';
import { useTreeGridRowStyles } from './useTreeGridRowStyles.styles';
import { TreeGridRowProps } from './TreeGridRow.types';
import { useMergedTabsterAttributes_unstable } from '@fluentui/react-tabster';
import { isHTMLElement } from '@fluentui/react-utilities';
import { ArrowLeft, ArrowRight, Enter } from '@fluentui/keyboard-keys';
import { useTreeGridRowGroupContext } from '../TreeGridRowGroup/TreeGridRowGroup';

export const TreeGridRow = React.forwardRef(
  (props: TreeGridRowProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { groupOwner = false, className, ...rest } = props;
    const { level, open, requestOpenChange } = useTreeGridRowGroupContext();
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
        if (
          !isHTMLElement(event.target) ||
          !(
            event.target === event.currentTarget ||
            event.target.parentElement === event.currentTarget
          )
        ) {
          return;
        }
        requestOpenChange({ open: !open, event, type: 'click' });
      }
    );
    if (!open && !groupOwner) return null;
    return (
      <div
        ref={ref}
        role="row"
        tabIndex={0}
        aria-level={level + 1}
        {...rest}
        className={mergeClasses(styles, className)}
        {...tabsterAttributes}
        {...(groupOwner && {
          onKeyDown: handleKeyDown,
          onClick: handleClick,
          'aria-expanded': open,
          'aria-level': level,
        })}
      />
    );
  }
);
