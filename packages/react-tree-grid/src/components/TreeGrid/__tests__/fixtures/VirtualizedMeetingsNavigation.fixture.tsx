import * as React from 'react';
import { VariableSizeList, type ListChildComponentProps } from 'react-window';
import { Button, useFluent } from '@fluentui/react-components';
import { TreeGrid } from '../../TreeGrid';
import { TreeGridCell } from '../../../TreeGridCell';
import { TreeGridRow } from '../../../TreeGridRow/TreeGridRow';
import {
  useMergedTreeGridNavigation,
  useTreeGridNavigationOverride,
} from '../../../../hooks/useTreeGridNavigationOverrides';

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
  const isOpen = item.type === 'section' && item.value === 'meeting-day-0';

  if (item.type === 'section') {
    return (
      <div>
        <TreeGridRow
          data-item-id={item.value}
          open={isOpen}
          style={style}
          subtree
        >
          <TreeGridCell header>{item.value}</TreeGridCell>
          <TreeGridCell>Section</TreeGridCell>
        </TreeGridRow>
      </div>
    );
  }

  return (
    <div>
      <TreeGridRow
        data-item-id={item.value}
        data-item-parent-id={item.parentValue}
        level={2}
        style={style}
      >
        <TreeGridCell header>
          <Button>{item.value}</Button>
        </TreeGridCell>
        <TreeGridCell>Meeting</TreeGridCell>
      </TreeGridRow>
    </div>
  );
};

export const VirtualizedMeetingsNavigationFixture = (): React.ReactElement => {
  const { targetDocument: doc } = useFluent();
  const win = doc?.defaultView;
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

  const isRowFocused = React.useCallback(
    (row: HTMLElement): boolean => {
      return row === doc?.activeElement;
    },
    [doc]
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

      const index = visibleIndexById.get(parentId);
      if (index === undefined) {
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

      if (!scrollToItemAndFocus(index, parentId)) {
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

  const parentNavigation = React.useMemo(
    () => ({
      onTabsterMoveFocus: (
        event: CustomEvent<{ relatedEvent: KeyboardEvent }>
      ): void => {
        if (
          event.defaultPrevented ||
          event.detail.relatedEvent.key !== 'ArrowLeft'
        ) {
          return;
        }

        const currentRow = getCurrentRow(event.detail.relatedEvent.target);
        if (
          !currentRow ||
          !isRowFocused(currentRow) ||
          currentRow.getAttribute('aria-expanded') === 'true'
        ) {
          return;
        }

        const parentId = currentRow.dataset.itemParentId;
        if (!parentId || !visibleIndexById.has(parentId)) {
          return;
        }

        event.preventDefault();
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLElement>): void => {
        if (event.key === 'ArrowLeft') {
          const currentRow = getCurrentRow(event.target);
          if (!currentRow || !isRowFocused(currentRow)) {
            return;
          }

          handleFocusParent(event);
        }
      },
    }),
    [getCurrentRow, handleFocusParent, isRowFocused, visibleIndexById]
  );

  const treeGridNavigation = useMergedTreeGridNavigation(
    virtualizationNavigation,
    parentNavigation
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
