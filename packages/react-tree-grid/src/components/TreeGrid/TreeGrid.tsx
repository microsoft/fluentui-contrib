/** @jsxRuntime classic */
/** @jsx createElement */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from '@fluentui/react-jsx-runtime';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeClasses,
  slot,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-components';
import { TreeGridProps } from './TreeGrid.types';
import {
  GroupperMoveFocusActions,
  GroupperMoveFocusEvent,
  MoverKeys,
  MoverMoveFocusEvent,
  TabsterDOMAttribute,
  useArrowNavigationGroup,
  useMergedTabsterAttributes_unstable,
} from '@fluentui/react-tabster';
import { isHTMLElement } from '@fluentui/react-utilities';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Enter,
} from '@fluentui/keyboard-keys';
import { useFindParentRow } from '../../hooks/useFindParentRow';

/**
 * Root TreeGrid container that wires Tabster-based row and cell navigation.
 */
export const TreeGrid = React.forwardRef(
  (props: TreeGridProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { className, onKeyDown, onTabsterMoveFocus, ...rest } = props;
    const keyDownHandler = useTreeGridKeyDownHandler(onKeyDown);
    const tabsterMoveFocusRef =
      useTreeGridTabsterMoveFocusHandler(onTabsterMoveFocus);

    const Root = slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, tabsterMoveFocusRef),
        role: 'treegrid',
        ...rest,
        ...useMergedTabsterAttributes_unstable(
          useArrowNavigationGroup({
            axis: 'vertical',
            memorizeCurrent: true,
          }),
          rest as TabsterDOMAttribute
        ),
        onKeyDown: keyDownHandler,
        className: mergeClasses('fui-TreeGrid', className),
      }),
      { elementType: 'div' }
    );
    return <Root />;
  }
);

const useTreeGridRowKeyDownHandler = () => {
  const findParentRow = useFindParentRow();
  return React.useCallback(
    (event: KeyboardEvent) => {
      if (!isHTMLElement(event.target)) {
        return;
      }
      const ariaExpanded = event.target.getAttribute('aria-expanded') as
        | 'true' // the row is expanded
        | 'false' // the row is collapsed
        | null; //the row is not expandable

      switch (event.key) {
        case ArrowRight: {
          if (ariaExpanded === 'false') {
            return;
          }
          event.target.dispatchEvent(
            new GroupperMoveFocusEvent({
              action: GroupperMoveFocusActions.Enter,
            })
          );
          return;
        }
        case ArrowLeft: {
          if (ariaExpanded === 'true') {
            return;
          }
          findParentRow(event.target)?.focus();
          return;
        }
      }
    },
    [findParentRow]
  );
};

const useTreeGridKeyDownHandler = (
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
): ((event: React.KeyboardEvent<HTMLDivElement>) => void) => {
  const handleTreeGridRowKeyDown = useTreeGridRowKeyDownHandler();
  return useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.isDefaultPrevented() || !isHTMLElement(event.target)) {
      return;
    }

    if (event.target.role === 'row') {
      handleTreeGridRowKeyDown(event.nativeEvent);
      return;
    }

    const row = event.target.closest<HTMLElement>('[role=row]');
    if (!row) {
      return;
    }

    if (event.target.role === 'group') {
      handleTreeGridInteractionCellKeyDown(
        event.target,
        event.nativeEvent,
        row
      );
      return;
    }

    const wrapper = event.target.closest<HTMLDivElement>(
      '[role=row],[role=group],[role=rowheader],[role=gridcell]'
    );
    if (wrapper?.role === 'group') {
      return;
    }

    handleTreeGridCellKeyDown(event.target, event.nativeEvent, row);
  });
};

const noop = () => {
  /** noop */
};

const useTreeGridTabsterMoveFocusHandler = (
  onTabsterMoveFocus?: TreeGridProps['onTabsterMoveFocus']
): React.RefObject<HTMLDivElement | null> => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const moveFocusHandler = useEventCallback(onTabsterMoveFocus ?? noop);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    element.addEventListener(
      'tabster:movefocus',
      moveFocusHandler as EventListener,
      true
    );

    return () => {
      element.removeEventListener(
        'tabster:movefocus',
        moveFocusHandler as EventListener,
        true
      );
    };
  }, [moveFocusHandler]);

  return ref;
};

const handleTreeGridInteractionCellKeyDown = (
  target: HTMLElement,
  event: KeyboardEvent,
  row: HTMLElement
) => {
  switch (event.key) {
    case Enter: {
      target.dispatchEvent(
        new GroupperMoveFocusEvent({
          action: GroupperMoveFocusActions.Enter,
        })
      );
      return;
    }
    case ArrowUp:
    case ArrowDown: {
      target.dispatchEvent(
        new GroupperMoveFocusEvent({
          action: GroupperMoveFocusActions.Escape,
        })
      );
      row.dispatchEvent(new MoverMoveFocusEvent({ key: MoverKeys[event.key] }));
      return;
    }
    case ArrowLeft: {
      target.dispatchEvent(
        new GroupperMoveFocusEvent({
          action: GroupperMoveFocusActions.Escape,
        })
      );
      return;
    }
  }
};

const handleTreeGridCellKeyDown = (
  target: HTMLElement,
  event: KeyboardEvent,
  row: HTMLElement
) => {
  switch (event.key) {
    case ArrowLeft: {
      target.dispatchEvent(
        new GroupperMoveFocusEvent({
          action: GroupperMoveFocusActions.Escape,
        })
      );
      return;
    }
    case ArrowUp:
    case ArrowDown: {
      target.dispatchEvent(
        new GroupperMoveFocusEvent({
          action: GroupperMoveFocusActions.Escape,
        })
      );
      row.dispatchEvent(new MoverMoveFocusEvent({ key: MoverKeys[event.key] }));
      return;
    }
  }
};
