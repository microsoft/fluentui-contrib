import * as React from 'react';
import { VariableSizeList, type ListChildComponentProps } from 'react-window';
import { TreeGrid } from './TreeGrid';
import { TreeGridCell } from '../TreeGridCell';
import { TreeGridInteraction } from '../TreeGridInteraction';
import { TreeGridRow } from '../TreeGridRow/TreeGridRow';
import { useBreadthFirstTreeGridNavigation } from '../../hooks/useBreadthFirstTreeGridNavigation';
import {
  treeGridNavigationHandled,
  treeGridNavigationPass,
  useMergeTreeGridNavigationOverrides,
  useTreeGridNavigationOverrides,
} from '../../hooks/useTreeGridNavigationOverrides';

const threadedSeeds = [
  { id: 'thread-401', messages: 2 },
  { id: 'thread-402', messages: 3 },
  { id: 'thread-403', messages: 2 },
  { id: 'thread-404', messages: 2 },
] as const;

const getThreadMessageId = (threadId: string, messageIndex: number): string =>
  `${threadId}--message-${messageIndex + 1}`;

const getThreadInputId = (threadId: string): string => `${threadId}-input`;

export const ThreadedNavigationFixture = (): React.ReactElement => {
  const breadthNavigation = useBreadthFirstTreeGridNavigation();
  const treeGridNavigation =
    useMergeTreeGridNavigationOverrides(breadthNavigation);

  return (
    <TreeGrid
      aria-label="Threaded TreeGrid without virtualization"
      {...treeGridNavigation}
    >
      {threadedSeeds.map((thread) => (
        <TreeGridRow
          data-item-id={thread.id}
          defaultOpen
          key={thread.id}
          subtree={
            <>
              {Array.from({ length: thread.messages }, (_, index) => (
                <TreeGridRow
                  data-item-id={getThreadMessageId(thread.id, index)}
                  data-item-parent-id={thread.id}
                  data-rowtype="message"
                  key={getThreadMessageId(thread.id, index)}
                  level={2}
                >
                  <TreeGridCell header>{`Message ${index + 1}`}</TreeGridCell>
                  <TreeGridCell>Preview</TreeGridCell>
                </TreeGridRow>
              ))}
              <TreeGridRow
                data-item-id={getThreadInputId(thread.id)}
                data-item-parent-id={thread.id}
                data-rowtype="input"
                key={getThreadInputId(thread.id)}
                level={2}
              >
                <TreeGridCell header>
                  <TreeGridInteraction aria-label="Thread reply input">
                    <textarea placeholder="Reply to thread..." />
                  </TreeGridInteraction>
                </TreeGridCell>
              </TreeGridRow>
            </>
          }
        >
          <TreeGridCell header>{thread.id}</TreeGridCell>
          <TreeGridCell>{`messages ${thread.messages}`}</TreeGridCell>
        </TreeGridRow>
      ))}
    </TreeGrid>
  );
};

type VirtualizationSectionItem = {
  type: 'section';
  value: string;
};

type VirtualizationMeetingItem = {
  type: 'meeting';
  value: string;
  parentValue: string;
};

type VirtualizedMeetingsItem =
  | VirtualizationSectionItem
  | VirtualizationMeetingItem;

const meetingSections: VirtualizedMeetingsItem[] = Array.from(
  { length: 8 },
  (_, dayIndex) => {
    const sectionValue = `meeting-day-${dayIndex}`;
    return [
      { type: 'section' as const, value: sectionValue },
      {
        type: 'meeting' as const,
        value: `${sectionValue}-meeting-0`,
        parentValue: sectionValue,
      },
      {
        type: 'meeting' as const,
        value: `${sectionValue}-meeting-1`,
        parentValue: sectionValue,
      },
    ];
  }
).flat();

const defaultOpenMeetingSections = new Map<PropertyKey, number>([
  ['meeting-day-0', 0],
]);

const VirtualizedMeetingsRow = ({
  data,
  index,
  style,
}: ListChildComponentProps<VirtualizedMeetingsItem[]>): React.ReactElement => {
  const item = data[index];

  if (item.type === 'section') {
    return (
      <TreeGridRow data-item-id={item.value} style={style}>
        <TreeGridCell header>{item.value}</TreeGridCell>
        <TreeGridCell>Section</TreeGridCell>
      </TreeGridRow>
    );
  }

  return (
    <TreeGridRow
      data-item-id={item.value}
      data-item-parent-id={item.parentValue}
      level={2}
      style={style}
    >
      <TreeGridCell header>{item.value}</TreeGridCell>
      <TreeGridCell>Meeting</TreeGridCell>
    </TreeGridRow>
  );
};

export const VirtualizationNavigationFixture = (): React.ReactElement => {
  const listRef = React.useRef<VariableSizeList>(null);
  const [openItems] = React.useState(() => new Map(defaultOpenMeetingSections));

  const visibleItems = React.useMemo(
    () =>
      meetingSections.filter(
        (item) =>
          item.type === 'section' ||
          openItems.get(item.parentValue) !== undefined
      ),
    [openItems]
  );

  const visibleIndexById = React.useMemo(
    () =>
      new Map(visibleItems.map((item, index) => [item.value, index] as const)),
    [visibleItems]
  );

  const focusItemById = React.useCallback((itemId: string): void => {
    document.querySelector<HTMLElement>(`[data-item-id="${itemId}"]`)?.focus();
  }, []);

  const scrollToItemAndFocus = React.useCallback(
    (index: number, itemId: string): boolean => {
      listRef.current?.scrollToItem(index, 'start');
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          focusItemById(itemId);
        });
      });
      return true;
    },
    [focusItemById]
  );

  const handleFocusParent = React.useCallback(
    (row: HTMLElement) => {
      const parentId = row.dataset.itemParentId;
      if (!parentId) {
        return treeGridNavigationPass;
      }

      const index = visibleIndexById.get(parentId);
      if (index === undefined) {
        return treeGridNavigationPass;
      }

      if (!scrollToItemAndFocus(index, parentId)) {
        return treeGridNavigationPass;
      }

      return treeGridNavigationHandled;
    },
    [scrollToItemAndFocus, visibleIndexById]
  );

  const handleFocusBoundaryItem = React.useCallback(
    (targetIndex: number) => {
      const targetItem = visibleItems[targetIndex];
      if (!targetItem) {
        return treeGridNavigationPass;
      }

      const targetRow = document.querySelector<HTMLElement>(
        `[data-item-id="${targetItem.value}"]`
      );
      if (targetRow) {
        return treeGridNavigationPass;
      }

      return {
        ...treeGridNavigationHandled,
        request: () => {
          scrollToItemAndFocus(targetIndex, targetItem.value);
        },
      };
    },
    [scrollToItemAndFocus, visibleItems]
  );

  const virtualizationNavigation = useTreeGridNavigationOverrides({
    onFocusFirst: () => handleFocusBoundaryItem(0),
    onFocusLast: () => handleFocusBoundaryItem(visibleItems.length - 1),
    onFocusParent: handleFocusParent,
  });
  const treeGridNavigation = useMergeTreeGridNavigationOverrides(
    virtualizationNavigation
  );

  return (
    <TreeGrid
      aria-label="Recent meetings with virtualization"
      {...treeGridNavigation}
    >
      <VariableSizeList
        height={120}
        itemCount={visibleItems.length}
        itemData={visibleItems}
        itemKey={(index, items) => items[index].value}
        itemSize={(index) => (visibleItems[index].type === 'section' ? 40 : 56)}
        ref={listRef}
        width={600}
      >
        {VirtualizedMeetingsRow}
      </VariableSizeList>
    </TreeGrid>
  );
};

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
      <TreeGridRow data-item-id={item.value} style={style}>
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

export const ThreadedVirtualizationNavigationFixture =
  (): React.ReactElement => {
    const listRef = React.useRef<VariableSizeList>(null);
    const visibleItems = React.useMemo(() => threadedVirtualizedItems, []);
    const visibleIndexById = React.useMemo(
      () =>
        new Map(
          visibleItems.map((item, index) => [item.value, index] as const)
        ),
      [visibleItems]
    );

    const focusItemById = React.useCallback((itemId: string): void => {
      document
        .querySelector<HTMLElement>(`[data-item-id="${itemId}"]`)
        ?.focus();
    }, []);

    const scrollToItemAndFocus = React.useCallback(
      (index: number, itemId: string): boolean => {
        listRef.current?.scrollToItem(index, 'start');
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            focusItemById(itemId);
          });
        });
        return true;
      },
      [focusItemById]
    );

    const focusHeaderAtIndex = React.useCallback(
      (index: number) => {
        const targetItem = visibleItems[index];
        if (!targetItem || targetItem.type !== 'header') {
          return treeGridNavigationPass;
        }

        const mountedHeader = document.querySelector<HTMLElement>(
          `[data-item-id="${targetItem.value}"]`
        );
        if (mountedHeader) {
          return {
            ...treeGridNavigationHandled,
            request: () => {
              mountedHeader.focus();
            },
          };
        }

        return {
          ...treeGridNavigationHandled,
          request: () => {
            scrollToItemAndFocus(index, targetItem.value);
          },
        };
      },
      [scrollToItemAndFocus, visibleItems]
    );

    const handleFocusParent = React.useCallback(
      (row: HTMLElement) => {
        const parentId = row.dataset.itemParentId;
        if (!parentId) {
          return treeGridNavigationPass;
        }

        const parentIndex = visibleIndexById.get(parentId);
        if (parentIndex === undefined) {
          return treeGridNavigationPass;
        }

        if (!scrollToItemAndFocus(parentIndex, parentId)) {
          return treeGridNavigationPass;
        }

        return treeGridNavigationHandled;
      },
      [scrollToItemAndFocus, visibleIndexById]
    );

    const handleFocusBoundaryItem = React.useCallback(
      (targetIndex: number) => {
        const targetItem = visibleItems[targetIndex];
        if (!targetItem) {
          return treeGridNavigationPass;
        }

        const targetRow = document.querySelector<HTMLElement>(
          `[data-item-id="${targetItem.value}"]`
        );
        if (targetRow) {
          return treeGridNavigationPass;
        }

        return {
          ...treeGridNavigationHandled,
          request: () => {
            scrollToItemAndFocus(targetIndex, targetItem.value);
          },
        };
      },
      [scrollToItemAndFocus, visibleItems]
    );

    const handleFocusPrevious = React.useCallback(
      (row: HTMLElement) => {
        const currentId = row.dataset.itemId;
        if (!currentId) {
          return treeGridNavigationPass;
        }

        const currentVisibleIndex = visibleIndexById.get(currentId);
        if (currentVisibleIndex === undefined) {
          return treeGridNavigationPass;
        }

        const currentLevel = getThreadedVirtualizedLevel(
          visibleItems[currentVisibleIndex]
        );
        for (let index = currentVisibleIndex - 1; index >= 0; index -= 1) {
          const candidateLevel = getThreadedVirtualizedLevel(
            visibleItems[index]
          );
          if (candidateLevel < currentLevel) {
            return treeGridNavigationPass;
          }
          if (candidateLevel === currentLevel) {
            const targetItem = visibleItems[index];
            const mountedHeader = document.querySelector<HTMLElement>(
              `[data-item-id="${targetItem.value}"]`
            );

            return mountedHeader
              ? treeGridNavigationPass
              : focusHeaderAtIndex(index);
          }
        }

        return treeGridNavigationHandled;
      },
      [focusHeaderAtIndex, visibleIndexById, visibleItems]
    );

    const handleFocusNext = React.useCallback(
      (row: HTMLElement) => {
        const currentId = row.dataset.itemId;
        if (!currentId) {
          return treeGridNavigationPass;
        }

        const currentVisibleIndex = visibleIndexById.get(currentId);
        if (currentVisibleIndex === undefined) {
          return treeGridNavigationPass;
        }

        const currentLevel = getThreadedVirtualizedLevel(
          visibleItems[currentVisibleIndex]
        );
        for (
          let index = currentVisibleIndex + 1;
          index < visibleItems.length;
          index += 1
        ) {
          const candidateLevel = getThreadedVirtualizedLevel(
            visibleItems[index]
          );
          if (candidateLevel < currentLevel) {
            return treeGridNavigationPass;
          }
          if (candidateLevel === currentLevel) {
            const targetItem = visibleItems[index];
            const mountedHeader = document.querySelector<HTMLElement>(
              `[data-item-id="${targetItem.value}"]`
            );

            return mountedHeader
              ? treeGridNavigationPass
              : focusHeaderAtIndex(index);
          }
        }

        return treeGridNavigationHandled;
      },
      [focusHeaderAtIndex, visibleIndexById, visibleItems]
    );

    const breadthNavigation = useBreadthFirstTreeGridNavigation();
    const virtualizationNavigation = useTreeGridNavigationOverrides({
      onFocusFirst: () => handleFocusBoundaryItem(0),
      onFocusLast: () => handleFocusBoundaryItem(visibleItems.length - 1),
      onFocusParent: handleFocusParent,
      onFocusPrevious: handleFocusPrevious,
      onFocusNext: handleFocusNext,
    });

    const treeGridNavigation = useMergeTreeGridNavigationOverrides(
      virtualizationNavigation,
      breadthNavigation
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
          itemSize={(index) =>
            visibleItems[index].type === 'header' ? 40 : 52
          }
          ref={listRef}
          width={600}
        >
          {ThreadedVirtualizedRow}
        </VariableSizeList>
      </TreeGrid>
    );
  };
