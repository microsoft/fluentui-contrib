import * as React from 'react';
import { VariableSizeList, type ListChildComponentProps } from 'react-window';
import { useFluent } from '@fluentui/react-components';
import { TreeGrid } from '../../TreeGrid';
import { TreeGridCell } from '../../../TreeGridCell';
import { TreeGridRow } from '../../../TreeGridRow/TreeGridRow';
import {
  useMergedTreeGridNavigation,
  useTreeGridNavigationOverride,
} from '../../../../hooks/useTreeGridNavigationOverrides';

const threadedSeeds = [
  { id: 'thread-401', messages: 2 },
  { id: 'thread-402', messages: 3 },
  { id: 'thread-403', messages: 2 },
  { id: 'thread-404', messages: 2 },
] as const;

const getThreadMessageId = (threadId: string, messageIndex: number): string =>
  `${threadId}--message-${messageIndex + 1}`;

const getThreadInputId = (threadId: string): string => `${threadId}-input`;

type ThreadedVirtualizedHeaderItem = {
  type: 'header';
  value: string;
};

type ThreadedVirtualizedChildItem = {
  type: 'message' | 'input';
  value: string;
  parentValue: string;
};

type ThreadedVirtualizedItem =
  | ThreadedVirtualizedHeaderItem
  | ThreadedVirtualizedChildItem;

const threadedVirtualizedItems: ThreadedVirtualizedItem[] =
  threadedSeeds.flatMap((thread) => [
    { type: 'header' as const, value: thread.id },
    ...Array.from({ length: thread.messages }, (_, index) => ({
      type: 'message' as const,
      value: getThreadMessageId(thread.id, index),
      parentValue: thread.id,
    })),
    {
      type: 'input' as const,
      value: getThreadInputId(thread.id),
      parentValue: thread.id,
    },
  ]);

const getThreadedVirtualizedLevel = (item: ThreadedVirtualizedItem): number =>
  item.type === 'header' ? 1 : 2;

const ThreadedVirtualizedRow = ({
  data,
  index,
  style,
}: ListChildComponentProps<ThreadedVirtualizedItem[]>): React.ReactElement => {
  const item = data[index];

  if (item.type === 'header') {
    return (
      <TreeGridRow data-item-id={item.value} open style={style} subtree>
        <TreeGridCell header>{item.value}</TreeGridCell>
        <TreeGridCell>Header</TreeGridCell>
      </TreeGridRow>
    );
  }

  return (
    <TreeGridRow
      data-item-id={item.value}
      data-item-parent-id={item.parentValue}
      data-rowtype={item.type}
      level={2}
      style={style}
    >
      <TreeGridCell header>{item.value}</TreeGridCell>
      <TreeGridCell>{item.type}</TreeGridCell>
    </TreeGridRow>
  );
};

export const ThreadedVirtualizedNavigationFixture = (): React.ReactElement => {
  const { targetDocument: doc } = useFluent();
  const win = doc?.defaultView;
  const listRef = React.useRef<VariableSizeList>(null);
  const visibleItems = React.useMemo(() => threadedVirtualizedItems, []);
  const visibleIndexById = React.useMemo(
    () =>
      new Map(visibleItems.map((item, index) => [item.value, index] as const)),
    [visibleItems]
  );

  const focusItemById = React.useCallback(
    (itemId: string): void => {
      doc?.querySelector<HTMLElement>(`[data-item-id="${itemId}"]`)?.focus();
    },
    [doc]
  );

  const scrollToItemAndFocus = React.useCallback(
    (index: number, itemId: string): boolean => {
      listRef.current?.scrollToItem(index, 'start');
      win?.requestAnimationFrame(() => {
        win.requestAnimationFrame(() => {
          focusItemById(itemId);
        });
      });
      return true;
    },
    [focusItemById, win]
  );

  const getCurrentRow = React.useCallback(
    (target: EventTarget | null): HTMLElement | null => {
      if (!(target instanceof HTMLElement)) {
        return null;
      }

      return target.closest<HTMLElement>('[role="row"]');
    },
    []
  );

  const handleFocusParent = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const currentRow = getCurrentRow(event.target);
      if (!currentRow) {
        return;
      }

      const parentId = currentRow.dataset.itemParentId;
      if (!parentId) {
        return;
      }

      const parentIndex = visibleIndexById.get(parentId);
      if (parentIndex === undefined) {
        return;
      }

      const parentRow = doc?.querySelector<HTMLElement>(
        `[data-item-id="${parentId}"]`
      );
      if (parentRow) {
        event.preventDefault();
        parentRow.focus();
        return;
      }

      if (!scrollToItemAndFocus(parentIndex, parentId)) {
        return;
      }

      event.preventDefault();
    },
    [doc, getCurrentRow, scrollToItemAndFocus, visibleIndexById]
  );

  const handleFocusBoundaryItem = React.useCallback(
    (targetIndex: number, event: React.KeyboardEvent<HTMLElement>) => {
      const targetItem = visibleItems[targetIndex];
      if (!targetItem) {
        return;
      }

      const targetRow = doc?.querySelector<HTMLElement>(
        `[data-item-id="${targetItem.value}"]`
      );
      if (targetRow) {
        return;
      }

      event.preventDefault();
      win?.setTimeout(() => {
        scrollToItemAndFocus(targetIndex, targetItem.value);
      }, 0);
    },
    [doc, scrollToItemAndFocus, visibleItems, win]
  );

  const getAdjacentHeaderAtLevel = React.useCallback(
    (target: EventTarget | null, direction: -1 | 1) => {
      const currentRow = getCurrentRow(target);
      if (!currentRow) {
        return { type: 'boundary' as const };
      }

      const currentId = currentRow.dataset.itemId;
      if (!currentId) {
        return { type: 'boundary' as const };
      }

      const currentVisibleIndex = visibleIndexById.get(currentId);
      if (currentVisibleIndex === undefined) {
        return { type: 'boundary' as const };
      }

      const currentLevel = getThreadedVirtualizedLevel(
        visibleItems[currentVisibleIndex]
      );

      for (
        let index = currentVisibleIndex + direction;
        index >= 0 && index < visibleItems.length;
        index += direction
      ) {
        const candidateLevel = getThreadedVirtualizedLevel(visibleItems[index]);
        if (candidateLevel < currentLevel) {
          return { type: 'boundary' as const };
        }

        if (candidateLevel === currentLevel) {
          const targetItem = visibleItems[index];
          const mountedHeader = doc?.querySelector<HTMLElement>(
            `[data-item-id="${targetItem.value}"]`
          );

          if (mountedHeader) {
            return { type: 'mounted' as const, index };
          }

          return {
            type: 'virtualized' as const,
            index,
            itemId: targetItem.value,
          };
        }
      }

      return { type: 'none' as const };
    },
    [doc, getCurrentRow, visibleIndexById, visibleItems]
  );

  const handleFocusAdjacentHeader = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>, direction: -1 | 1) => {
      const adjacentHeader = getAdjacentHeaderAtLevel(event.target, direction);
      if (adjacentHeader.type === 'boundary') {
        return;
      }

      event.preventDefault();

      if (adjacentHeader.type === 'mounted') {
        const targetItem = visibleItems[adjacentHeader.index];
        if (!targetItem) {
          return;
        }

        doc
          ?.querySelector<HTMLElement>(`[data-item-id="${targetItem.value}"]`)
          ?.focus();
        return;
      }

      if (adjacentHeader.type === 'virtualized') {
        scrollToItemAndFocus(adjacentHeader.index, adjacentHeader.itemId);
      }
    },
    [doc, getAdjacentHeaderAtLevel, scrollToItemAndFocus, visibleItems]
  );

  const virtualizationNavigation = useTreeGridNavigationOverride({
    focusFirst: {
      shouldOverride: () => {
        const targetItem = visibleItems[0];
        if (!targetItem) {
          return false;
        }

        const targetRow = doc?.querySelector<HTMLElement>(
          `[data-item-id="${targetItem.value}"]`
        );

        return !targetRow;
      },
      onKeyDown: (event) => {
        handleFocusBoundaryItem(0, event);
      },
    },
    focusLast: {
      shouldOverride: () => {
        const targetItem = visibleItems[visibleItems.length - 1];
        if (!targetItem) {
          return false;
        }

        const targetRow = doc?.querySelector<HTMLElement>(
          `[data-item-id="${targetItem.value}"]`
        );

        return !targetRow;
      },
      onKeyDown: (event) => {
        handleFocusBoundaryItem(visibleItems.length - 1, event);
      },
    },
  });

  const threadedNavigation = React.useMemo(
    () => ({
      onTabsterMoveFocus: (
        event: CustomEvent<{ relatedEvent: KeyboardEvent }>
      ): void => {
        if (event.defaultPrevented) {
          return;
        }

        switch (event.detail.relatedEvent.key) {
          case 'ArrowLeft': {
            const currentRow = getCurrentRow(event.detail.relatedEvent.target);
            if (
              !currentRow ||
              currentRow.getAttribute('aria-expanded') === 'true'
            ) {
              return;
            }

            const parentId = currentRow.dataset.itemParentId;
            if (parentId && visibleIndexById.has(parentId)) {
              event.preventDefault();
            }
            return;
          }
          case 'ArrowUp': {
            const adjacentHeader = getAdjacentHeaderAtLevel(
              event.detail.relatedEvent.target,
              -1
            );
            if (adjacentHeader.type !== 'boundary') {
              event.preventDefault();
            }
            return;
          }
          case 'ArrowDown': {
            const adjacentHeader = getAdjacentHeaderAtLevel(
              event.detail.relatedEvent.target,
              1
            );
            if (adjacentHeader.type !== 'boundary') {
              event.preventDefault();
            }
            return;
          }
        }
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLElement>): void => {
        switch (event.key) {
          case 'ArrowLeft': {
            handleFocusParent(event);
            return;
          }
          case 'ArrowUp': {
            handleFocusAdjacentHeader(event, -1);
            return;
          }
          case 'ArrowDown': {
            handleFocusAdjacentHeader(event, 1);
            return;
          }
        }
      },
    }),
    [
      getAdjacentHeaderAtLevel,
      getCurrentRow,
      handleFocusAdjacentHeader,
      handleFocusParent,
      visibleIndexById,
    ]
  );

  const treeGridNavigation = useMergedTreeGridNavigation(
    virtualizationNavigation,
    threadedNavigation
  );

  return (
    <TreeGrid
      aria-label="Threaded TreeGrid with virtualization"
      {...treeGridNavigation}
    >
      <VariableSizeList
        height={120}
        itemCount={visibleItems.length}
        itemData={visibleItems}
        itemKey={(index, items) => items[index].value}
        itemSize={(index) => (visibleItems[index].type === 'header' ? 40 : 52)}
        ref={listRef}
        width={600}
      >
        {ThreadedVirtualizedRow}
      </VariableSizeList>
    </TreeGrid>
  );
};
