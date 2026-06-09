import * as React from 'react';
import {
  useBreadthFirstTreeGridNavigation,
  useMergedTreeGridNavigation,
  useTreeGridNavigationOverride,
  TreeGrid,
  TreeGridCell,
  TreeGridInteraction,
  TreeGridRow,
  TreeGridRowOnOpenChangeData,
} from '@fluentui-contrib/react-tree-grid';
import {
  Avatar,
  Body1Stronger,
  Button,
  Caption1,
  Link,
  Textarea,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  useFluent,
} from '@fluentui/react-components';
import { CaretDownFilled, CaretRightFilled } from '@fluentui/react-icons';
import { isHTMLElement } from '@fluentui/react-utilities';
import { ListChildComponentProps, VariableSizeList } from 'react-window';

type ThreadSeed = {
  id: string;
  header: string;
  lastUpdated: string;
  messages: ThreadMessageSeed[];
};

type ThreadMessageSeed = {
  author: string;
  location: string;
  preview: string;
  timestamp: string;
};

type ThreadHeaderItem = {
  type: 'header';
  rowType: 'header';
  value: string;
  thread: ThreadSeed;
  threadIndex: number;
};

type ThreadMessageItem = {
  type: 'message';
  rowType: 'message';
  value: string;
  parentValue: string;
  message: ThreadMessageSeed;
  isUnread: boolean;
};

type ThreadInputItem = {
  type: 'input';
  rowType: 'input';
  value: string;
  parentValue: string;
};

type ThreadedVirtualizedItem =
  | ThreadHeaderItem
  | ThreadMessageItem
  | ThreadInputItem;

type VirtualizationContextValue = {
  openItems: Set<PropertyKey>;
  requestOpenChange: (data: TreeGridRowOnOpenChangeData) => void;
};

const rowFocusGap = 8;
const threadHeaderHeight = 72;
const threadMessageHeight = 112;
const threadInputHeight = 92;
const threadHeaderGap = 16;
const containerHeight = 720;

const threadSeeds: ThreadSeed[] = [
  {
    id: 'thread-401',
    header: 'Design critique follow-up',
    lastUpdated: '2m ago',
    messages: [
      {
        author: 'Adele Vance',
        location: 'Design team · General',
        preview:
          'Shared the latest compositional layout and asked for alignment on navigation density before handoff.',
        timestamp: '2m',
      },
      {
        author: 'Megan Bowen',
        location: 'Design team · General',
        preview:
          'Can we keep the header pinned while allowing child content to virtualize independently?',
        timestamp: '5m',
      },
      {
        author: 'Ravi Narayan',
        location: 'Design team · General',
        preview:
          'Yes, but the keyboard model needs to preserve thread semantics rather than row-only navigation.',
        timestamp: '9m',
      },
    ],
  },
  {
    id: 'thread-402',
    header: 'Unread navigation requirements',
    lastUpdated: '12m ago',
    messages: [
      {
        author: 'Lenka Klugarova',
        location: 'Client review · Requirements',
        preview:
          'The client expects Space on a focused header to jump to the next unread message in that thread.',
        timestamp: '12m',
      },
      {
        author: 'Amit Sehgal',
        location: 'Client review · Requirements',
        preview:
          'ArrowUp and ArrowDown should skip child rows and move between thread headers only.',
        timestamp: '16m',
      },
      {
        author: 'CZSK Comms',
        location: 'Client review · Requirements',
        preview:
          'Cmd+R and Ctrl+R need to jump directly into the reply box of the active thread.',
        timestamp: '18m',
      },
      {
        author: 'Jenny Lay-Flurrie',
        location: 'Client review · Requirements',
        preview:
          'This is the message we would mark as unread in the story so the shortcut has something concrete to target.',
        timestamp: '21m',
      },
    ],
  },
  {
    id: 'thread-403',
    header: 'Virtualization implementation notes',
    lastUpdated: '34m ago',
    messages: [
      {
        author: 'Alex Wilber',
        location: 'Engineering · Architecture',
        preview:
          'We can keep a flattened visible-items array and still preserve thread-level semantics with explicit row types.',
        timestamp: '34m',
      },
      {
        author: 'Miriam Chen',
        location: 'Engineering · Architecture',
        preview:
          'The row heights should stay deterministic here. Live measurement caused too much visible recaching.',
        timestamp: '42m',
      },
    ],
  },
  {
    id: 'thread-404',
    header: 'Reply interactions',
    lastUpdated: '1h ago',
    messages: [
      {
        author: 'Nora Diaz',
        location: 'Messaging · Interaction',
        preview:
          'The input row should behave like interactive content within the tree grid and keep the escape hatch obvious.',
        timestamp: '1h',
      },
      {
        author: 'Diego Siciliani',
        location: 'Messaging · Interaction',
        preview:
          'We should reserve space for the actions so hover and focus do not cause the layout to shift.',
        timestamp: '1h',
      },
      {
        author: 'Kevin Scott',
        location: 'Messaging · Interaction',
        preview:
          'This thread intentionally has one more message so the scroll behavior is easy to test at different offsets.',
        timestamp: '1h',
      },
      {
        author: 'Isaac Newton',
        location: 'Messaging · Interaction',
        preview:
          'Open the docs link to review the background notes for this experiment.',
        timestamp: '1h',
      },
    ],
  },
];

const getThreadMessageId = (threadId: string, messageIndex: number): string =>
  `${threadId}--message-${messageIndex + 1}`;

const getThreadInputId = (threadId: string): string => `${threadId}-input`;

const isThreadMessageUnread = (
  thread: ThreadSeed,
  messageIndex: number
): boolean => messageIndex === thread.messages.length - 2;

const getItemKey = (
  index: number,
  items: ThreadedVirtualizedItem[]
): React.Key => items[index].value;

const getItemLevel = (item: ThreadedVirtualizedItem): number =>
  item.type === 'header' ? 1 : 2;

const getChildRowStyle = (style: React.CSSProperties): React.CSSProperties => ({
  ...style,
  width: `calc(100% - ${rowFocusGap * 2}px)`,
  marginInline: `${rowFocusGap}px`,
});

const useStyles = makeStyles({
  story: {
    maxWidth: '1180px',
    width: '100%',
    overflowX: 'hidden',
  },
  treeGrid: {
    width: '100%',
    overflowX: 'hidden',
  },
  rowFrame: {
    boxSizing: 'border-box',
    width: '100%',
  },
  headerRow: {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr) auto',
    alignItems: 'center',
    minHeight: `${threadHeaderHeight}px`,
    backgroundColor: tokens.colorNeutralBackground6,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    boxSizing: 'border-box',
    width: '100%',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground4Selected,
    },
  },
  headerChevron: {
    color: tokens.colorNeutralForeground3,
    ...shorthands.margin(0, tokens.spacingHorizontalS, 0, 0),
  },
  headerContent: {
    display: 'grid',
    rowGap: tokens.spacingVerticalXXS,
    minWidth: 0,
  },
  headerTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  headerMeta: {
    color: tokens.colorNeutralForeground3,
  },
  headerCount: {
    color: tokens.colorNeutralForeground2,
  },
  messageRow: {
    display: 'grid',
    gridTemplateAreas: `
      'unread avatar title meta'
      'unread avatar location meta'
      '. preview preview preview'
    `,
    gridTemplateColumns: '16px 44px minmax(0, 1fr) 176px',
    gridTemplateRows: '20px 20px 24px',
    alignItems: 'start',
    minHeight: `${threadMessageHeight}px`,
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalXS,
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    boxSizing: 'border-box',
    width: '100%',
    ':hover': {
      '--threadedRevealVisibility': 'visible',
      '--threadedRevealOpacity': '1',
      '--threadedRevealPointerEvents': 'auto',
      '--threadedTimestampRevealOpacity': '0',
      '--threadedTimestampRevealVisibility': 'hidden',
      backgroundColor: tokens.colorNeutralBackground4Selected,
    },
    ':focus-within': {
      '--threadedRevealVisibility': 'visible',
      '--threadedRevealOpacity': '1',
      '--threadedRevealPointerEvents': 'auto',
      '--threadedTimestampRevealOpacity': '0',
      '--threadedTimestampRevealVisibility': 'hidden',
    },
  },
  unread: {
    gridArea: 'unread',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDot: {
    width: '8px',
    height: '8px',
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    backgroundColor: tokens.colorPaletteRoyalBlueForeground2,
  },
  avatar: {
    gridArea: 'avatar',
  },
  title: {
    gridArea: 'title',
    minWidth: 0,
  },
  messageTitle: {
    color: tokens.colorNeutralForeground1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  location: {
    gridArea: 'location',
    color: tokens.colorNeutralForeground2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    minWidth: 0,
  },
  preview: {
    gridArea: 'preview',
    color: tokens.colorNeutralForeground2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    minWidth: 0,
  },
  previewLink: {
    marginLeft: tokens.spacingHorizontalXS,
  },
  meta: {
    gridArea: 'meta',
    width: '176px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalS,
  },
  timestamp: {
    color: tokens.colorNeutralForeground3,
    minWidth: '32px',
    textAlign: 'right',
    opacity: 'var(--threadedTimestampRevealOpacity, 1)',
    visibility: 'var(--threadedTimestampRevealVisibility, visible)' as
      | 'visible'
      | 'hidden',
  },
  actionButton: {
    minWidth: 'unset',
    opacity: 'var(--threadedRevealOpacity, 0)',
    visibility: 'var(--threadedRevealVisibility, hidden)' as
      | 'visible'
      | 'hidden',
    pointerEvents: 'var(--threadedRevealPointerEvents, none)' as
      | 'auto'
      | 'none',
  },
  inputRow: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    minHeight: `${threadInputHeight}px`,
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    boxSizing: 'border-box',
    width: '100%',
  },
  inputCell: {
    width: '100%',
  },
  inputInteraction: {
    width: '100%',
  },
  inputTextarea: {
    width: '100%',
  },
});

const allItems: ThreadedVirtualizedItem[] = threadSeeds.flatMap(
  (thread, threadIndex) => [
    {
      type: 'header' as const,
      rowType: 'header' as const,
      value: thread.id,
      thread,
      threadIndex,
    },
    ...thread.messages.map((message, messageIndex) => ({
      type: 'message' as const,
      rowType: 'message' as const,
      value: getThreadMessageId(thread.id, messageIndex),
      parentValue: thread.id,
      message,
      isUnread: isThreadMessageUnread(thread, messageIndex),
    })),
    {
      type: 'input' as const,
      rowType: 'input' as const,
      value: getThreadInputId(thread.id),
      parentValue: thread.id,
    },
  ]
);

const defaultOpenItems = new Set<PropertyKey>(
  threadSeeds.map((thread) => thread.id)
);

const VirtualizationContext = React.createContext<
  VirtualizationContextValue | undefined
>(undefined);

const useVirtualizationContext = (): VirtualizationContextValue => {
  const context = React.useContext(VirtualizationContext);
  if (!context) {
    throw new Error(
      'useVirtualizationContext must be used within a VirtualizationProvider'
    );
  }
  return context;
};

const ThreadedVirtualizedRow = React.memo(
  (
    props: ListChildComponentProps<ThreadedVirtualizedItem[]>
  ): React.ReactElement => {
    const styles = useStyles();
    const item = props.data[props.index];
    const { openItems, requestOpenChange } = useVirtualizationContext();

    if (item.type === 'header') {
      const isOpen = openItems.has(item.value);
      const rowStyle: React.CSSProperties = {
        ...getChildRowStyle(props.style),
        ...(item.threadIndex > 0 ? { paddingTop: `${threadHeaderGap}px` } : {}),
      };

      return (
        <TreeGridRow
          className={mergeClasses(styles.rowFrame, styles.headerRow)}
          data-item-id={item.value}
          data-rowtype="header"
          onOpenChange={(_, data) => requestOpenChange(data)}
          open={isOpen}
          style={rowStyle}
          subtree
        >
          {isOpen ? (
            <CaretDownFilled className={styles.headerChevron} aria-hidden />
          ) : (
            <CaretRightFilled className={styles.headerChevron} aria-hidden />
          )}
          <TreeGridCell tabIndex={0} data-header-cell="true" header>
            <div className={styles.headerContent}>
              <Body1Stronger className={styles.headerTitle}>
                {item.thread.header}
              </Body1Stronger>
              <Caption1 className={styles.headerMeta}>
                {item.thread.messages.length} messages · updated{' '}
                {item.thread.lastUpdated}
              </Caption1>
            </div>
          </TreeGridCell>
          <TreeGridCell className={styles.headerCount}>
            <Caption1>{item.thread.messages.length}</Caption1>
          </TreeGridCell>
        </TreeGridRow>
      );
    }

    if (item.type === 'message') {
      return (
        <TreeGridRow
          className={mergeClasses(styles.rowFrame, styles.messageRow)}
          data-item-id={item.value}
          data-item-parent-id={item.parentValue}
          data-rowtype="message"
          level={2}
          style={getChildRowStyle(props.style)}
        >
          <TreeGridCell aria-hidden className={styles.unread}>
            {item.isUnread ? <div className={styles.unreadDot} /> : null}
          </TreeGridCell>
          <TreeGridCell aria-hidden className={styles.avatar}>
            <Avatar name={item.message.author} size={32} />
          </TreeGridCell>
          <TreeGridCell className={styles.title} header>
            <Body1Stronger className={styles.messageTitle}>
              {item.message.author} {item.isUnread ? '· unread' : ''}
            </Body1Stronger>
          </TreeGridCell>
          <TreeGridCell className={styles.location}>
            <Caption1>{item.message.location}</Caption1>
          </TreeGridCell>
          <TreeGridCell className={styles.preview}>
            <Caption1>
              {item.message.preview}
              <Link
                className={styles.previewLink}
                href="https://example.com"
                target="_blank"
              >
                Docs
              </Link>
            </Caption1>
          </TreeGridCell>
          <TreeGridCell className={styles.meta}>
            <Caption1 className={styles.timestamp}>
              {item.message.timestamp}
            </Caption1>
            <Button
              appearance="subtle"
              className={styles.actionButton}
              size="small"
            >
              Reply
            </Button>
            <Button
              appearance="subtle"
              className={styles.actionButton}
              size="small"
            >
              Open
            </Button>
          </TreeGridCell>
        </TreeGridRow>
      );
    }

    return (
      <TreeGridRow
        className={mergeClasses(styles.rowFrame, styles.inputRow)}
        data-item-id={item.value}
        data-item-parent-id={item.parentValue}
        data-rowtype="input"
        level={2}
        style={getChildRowStyle(props.style)}
      >
        <TreeGridCell className={styles.inputCell} header>
          <TreeGridInteraction
            aria-description="Interact with Enter, then leave with Escape"
            aria-label="Thread reply input"
            aria-roledescription="interactive content"
            className={styles.inputInteraction}
          >
            <Textarea
              className={styles.inputTextarea}
              placeholder="Reply to thread..."
            />
          </TreeGridInteraction>
        </TreeGridCell>
      </TreeGridRow>
    );
  }
);

export const ThreadedVirtualization = (): React.ReactElement => {
  const styles = useStyles();
  const { targetDocument: doc } = useFluent();
  const win = doc?.defaultView;
  const listRef = React.useRef<VariableSizeList>(null);
  const [openItems, setOpenItems] = React.useState(
    () => new Set(defaultOpenItems)
  );

  const requestOpenChange = React.useCallback(
    (data: TreeGridRowOnOpenChangeData): void => {
      const row = data.event.currentTarget;
      if (!isHTMLElement(row)) {
        return;
      }

      const id = row.dataset.itemId;
      if (!id) {
        return;
      }

      setOpenItems((prev) => {
        const next = new Set(prev);
        if (data.open) {
          next.add(id);
        } else {
          next.delete(id);
        }
        return next;
      });
    },
    []
  );

  const visibleItems = React.useMemo(
    () =>
      allItems.filter(
        (item) => item.type === 'header' || openItems.has(item.parentValue)
      ),
    [openItems]
  );

  const visibleIndexById = React.useMemo(
    () =>
      new Map(visibleItems.map((item, index) => [item.value, index] as const)),
    [visibleItems]
  );

  const getItemSize = React.useCallback(
    (index: number): number => {
      const item = visibleItems[index];

      switch (item.rowType) {
        case 'header':
          return (
            threadHeaderHeight + (item.threadIndex > 0 ? threadHeaderGap : 0)
          );
        case 'message':
          return threadMessageHeight;
        case 'input':
          return threadInputHeight;
      }
    },
    [visibleItems]
  );

  React.useEffect(() => {
    listRef.current?.resetAfterIndex(0);
  }, [visibleItems]);

  const focusItemById = React.useCallback(
    (itemId: string): void => {
      doc?.querySelector<HTMLElement>(`[data-item-id="${itemId}"]`)?.focus();
    },
    [doc]
  );

  const scrollToItemAndFocus = React.useCallback(
    (index: number, itemId: string): boolean => {
      if (!doc || !win) {
        return false;
      }

      listRef.current?.scrollToItem(index, 'smart');
      win.requestAnimationFrame(() => {
        focusItemById(itemId);
      });

      return true;
    },
    [doc, focusItemById, win]
  );

  const getCurrentRow = React.useCallback(
    (target: EventTarget | null): HTMLElement | null => {
      if (!isHTMLElement(target)) {
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
      win?.queueMicrotask(() => {
        scrollToItemAndFocus(targetIndex, targetItem.value);
      });
    },
    [doc, scrollToItemAndFocus, visibleItems]
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

      const currentLevel = getItemLevel(visibleItems[currentVisibleIndex]);

      for (
        let index = currentVisibleIndex + direction;
        index >= 0 && index < visibleItems.length;
        index += direction
      ) {
        const candidateLevel = getItemLevel(visibleItems[index]);
        if (candidateLevel < currentLevel) {
          return { type: 'boundary' as const };
        }

        if (candidateLevel === currentLevel) {
          const targetItem = visibleItems[index];
          const mountedHeader = doc?.querySelector<HTMLElement>(
            `[data-item-id="${targetItem.value}"]`
          );

          if (mountedHeader) {
            return { type: 'mounted' as const };
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
      if (
        adjacentHeader.type === 'boundary' ||
        adjacentHeader.type === 'mounted'
      ) {
        return;
      }

      event.preventDefault();

      if (adjacentHeader.type === 'virtualized') {
        scrollToItemAndFocus(adjacentHeader.index, adjacentHeader.itemId);
      }
    },
    [getAdjacentHeaderAtLevel, scrollToItemAndFocus]
  );

  const handleListBoundaryRef = React.useCallback(
    (instance: HTMLElement | null): void => {
      if (instance) {
        instance.setAttribute('role', 'none');
      }
    },
    []
  );

  const contextValue = React.useMemo(
    () => ({ openItems, requestOpenChange }),
    [openItems, requestOpenChange]
  );

  const breadthNavigation = useBreadthFirstTreeGridNavigation();
  const virtualizationNavigation = useTreeGridNavigationOverride({
    focusFirst: {
      shouldOverride: () => {
        const targetItem = visibleItems[0];
        if (!targetItem || !doc || !win) {
          return false;
        }

        const targetRow = doc.querySelector<HTMLElement>(
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
        if (!targetItem || !doc || !win) {
          return false;
        }

        const targetRow = doc.querySelector<HTMLElement>(
          `[data-item-id="${targetItem.value}"]`
        );

        return !targetRow;
      },
      onKeyDown: (event) => {
        handleFocusBoundaryItem(visibleItems.length - 1, event);
      },
    },
    focusParent: {
      shouldOverride: (event) => {
        const currentRow = getCurrentRow(event.detail.relatedEvent.target);
        if (!currentRow) {
          return false;
        }

        const parentId = currentRow.dataset.itemParentId;
        if (!parentId || !visibleIndexById.has(parentId)) {
          return false;
        }

        const parentRow = doc?.querySelector<HTMLElement>(
          `[data-item-id="${parentId}"]`
        );

        return !parentRow;
      },
      onKeyDown: handleFocusParent,
    },
    focusPrevious: {
      shouldOverride: (event) => {
        const adjacentHeader = getAdjacentHeaderAtLevel(
          event.detail.relatedEvent.target,
          -1
        );

        return (
          adjacentHeader.type === 'virtualized' ||
          adjacentHeader.type === 'none'
        );
      },
      onKeyDown: (event) => {
        handleFocusAdjacentHeader(event, -1);
      },
    },
    focusNext: {
      shouldOverride: (event) => {
        const adjacentHeader = getAdjacentHeaderAtLevel(
          event.detail.relatedEvent.target,
          1
        );

        return (
          adjacentHeader.type === 'virtualized' ||
          adjacentHeader.type === 'none'
        );
      },
      onKeyDown: (event) => {
        handleFocusAdjacentHeader(event, 1);
      },
    },
  });
  const treeGridNavigation = useMergedTreeGridNavigation(
    virtualizationNavigation,
    breadthNavigation
  );

  return (
    <div className={styles.story}>
      <VirtualizationContext.Provider value={contextValue}>
        <TreeGrid
          aria-label="Threaded TreeGrid with virtualization"
          className={styles.treeGrid}
          {...treeGridNavigation}
        >
          <VariableSizeList
            height={containerHeight}
            innerRef={handleListBoundaryRef}
            itemCount={visibleItems.length}
            itemData={visibleItems}
            itemKey={getItemKey}
            itemSize={getItemSize}
            outerRef={handleListBoundaryRef}
            ref={listRef}
            width="100%"
          >
            {ThreadedVirtualizedRow}
          </VariableSizeList>
        </TreeGrid>
      </VirtualizationContext.Provider>
    </div>
  );
};
