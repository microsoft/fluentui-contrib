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
import {
  TreeGridOnTabsterMoveFocus,
  TreeGridProps,
  TreeGridTabsterMoveFocusEventDetail,
} from './TreeGrid.types';
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

export const TreeGrid = React.forwardRef(
  (props: TreeGridProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { className, onKeyDown, onTabsterMoveFocus, ...rest } = props;
    const tabsterMoveFocusRef = useTreeGridTabsterMoveFocusHandler({
      onTabsterMoveFocus,
    });

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
        onKeyDown: useTreeGridKeyDownHandler({ onKeyDown }),
        className: mergeClasses('fui-TreeGrid', className),
      }),
      { elementType: 'div' }
    );
    return <Root />;
  }
);

const useTreeGridKeyDownHandler = (props: Pick<TreeGridProps, 'onKeyDown'>) => {
  const handleTreeGridRowKeyDown = useTreeGridRowKeyDownHandler();
  return useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    props.onKeyDown?.(event);
    if (event.isDefaultPrevented() || !isHTMLElement(event.target)) {
      return;
    }
    // TreeGridRow
    if (event.target.role === 'row') {
      handleTreeGridRowKeyDown(event);
      return;
    }
    const row = event.target.closest<HTMLElement>('[role=row]');
    if (!row) {
      return;
    }
    // TreeGridInteraction
    if (event.target.role === 'group') {
      handleTreeGridInteractionCellKeyDown(event, row);
      return;
    }
    const wrapper = event.target.closest<HTMLDivElement>(
      '[role=row],[role=group],[role=rowheader],[role=gridcell]'
    );
    // if the target is inside a TreeGridInteraction,
    // keydown should be handled by the interaction cell
    if (wrapper?.role === 'group') {
      return;
    }
    // TreeGridCell
    handleTreeGridCellKeyDown(event, row);
  });
};

const useTreeGridRowKeyDownHandler = () => {
  const findParentRow = useFindParentRow();
  return React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
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

const handleTreeGridInteractionCellKeyDown = (
  event: React.KeyboardEvent<HTMLElement>,
  row: HTMLElement
) => {
  switch (event.key) {
    case Enter: {
      event.target.dispatchEvent(
        new GroupperMoveFocusEvent({
          action: GroupperMoveFocusActions.Enter,
        })
      );
      return;
    }
    case ArrowUp:
    case ArrowDown: {
      event.target.dispatchEvent(
        new GroupperMoveFocusEvent({
          action: GroupperMoveFocusActions.Escape,
        })
      );
      row.dispatchEvent(new MoverMoveFocusEvent({ key: MoverKeys[event.key] }));
      return;
    }
    case ArrowLeft: {
      event.target.dispatchEvent(
        new GroupperMoveFocusEvent({
          action: GroupperMoveFocusActions.Escape,
        })
      );
      return;
    }
  }
};

const useTreeGridTabsterMoveFocusHandler = (
  props: Pick<TreeGridProps, 'onTabsterMoveFocus'>
): React.RefObject<HTMLDivElement | null> => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const moveFocusHandler = useEventCallback((event: Event) => {
    props.onTabsterMoveFocus?.(
      event as CustomEvent<TreeGridTabsterMoveFocusEventDetail>
    );
  });

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

const handleTreeGridCellKeyDown = (
  event: React.KeyboardEvent<HTMLElement>,
  row: HTMLElement
) => {
  switch (event.key) {
    case ArrowLeft: {
      event.target.dispatchEvent(
        new GroupperMoveFocusEvent({
          action: GroupperMoveFocusActions.Escape,
        })
      );
      return;
    }
    case ArrowUp:
    case ArrowDown: {
      event.target.dispatchEvent(
        new GroupperMoveFocusEvent({
          action: GroupperMoveFocusActions.Escape,
        })
      );
      row.dispatchEvent(new MoverMoveFocusEvent({ key: MoverKeys[event.key] }));
      return;
    }
  }
};
