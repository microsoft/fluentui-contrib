import * as React from 'react';
import {
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
  useEventCallback,
  useFluent,
} from '@fluentui/react-components';
import { CaretDownFilled, CaretRightFilled } from '@fluentui/react-icons';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  End,
  Enter,
  Home,
} from '@fluentui/keyboard-keys';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { isHTMLElement } from '@fluentui/react-utilities';
import { ListChildComponentProps, VariableSizeList } from 'react-window';

type ThreadHeaderItem = {
  type: 'thread-header';
  rowType: 'threadHeader';
  value: string;
  header: string;
  messageCount: number;
  lastUpdated: string;
};

type ThreadMessageItem = {
  type: 'thread-message';
  rowType: 'threadMessage';
  value: string;
  parentValue: string;
  author: string;
  location: string;
  preview: string;
  timestamp: string;
  isUnread?: boolean;
};

type ThreadInputItem = {
  type: 'thread-input';
  rowType: 'threadInput';
  value: string;
  parentValue: string;
};

type ThreadedItem = ThreadHeaderItem | ThreadMessageItem | ThreadInputItem;

type ThreadedVirtualizationContextValue = {
  focusedHeaderId: string | undefined;
  openItems: Map<string, number>;
  requestOpenChange: (
    data: TreeGridRowOnOpenChangeData & { index: number }
  ) => void;
  setFocusedHeaderId: React.Dispatch<React.SetStateAction<string | undefined>>;
  focusNextHeader: (threadId: string) => void;
  focusPrevHeader: (threadId: string) => void;
  focusFirstItem: () => void;
  focusLastItem: () => void;
  focusUnread: (threadId: string) => void;
  focusInput: (threadId: string) => void;
  registerElementRef: (id: string, element: HTMLElement | null) => void;
};

const rowFocusGap = 8;
const threadHeaderHeight = 72;
const threadMessageHeight = 112;
const threadInputHeight = 92;
const threadHeaderGap = 16;
const containerHeight = 720;
const headerPreventedKeys = [Home, End, ArrowUp, ArrowDown, Enter];

const threadSeeds = [
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

const allItems: ThreadedItem[] = threadSeeds.flatMap((thread) => {
  const threadMessages = thread.messages.map((message, index) => ({
    type: 'thread-message' as const,
    rowType: 'threadMessage' as const,
    value: `${thread.id}--message-${index + 1}`,
    parentValue: thread.id,
    author: message.author,
    location: message.location,
    preview: message.preview,
    timestamp: message.timestamp,
    isUnread: index === thread.messages.length - 2,
  }));

  return [
    {
      type: 'thread-header' as const,
      rowType: 'threadHeader' as const,
      value: thread.id,
      header: thread.header,
      messageCount: thread.messages.length,
      lastUpdated: thread.lastUpdated,
    },
    ...threadMessages,
    {
      type: 'thread-input' as const,
      rowType: 'threadInput' as const,
      value: `${thread.id}--input`,
      parentValue: thread.id,
    },
  ];
});

const defaultOpenItems = new Map<string, number>(
  allItems.flatMap((item, index) =>
    item.type === 'thread-header' ? [[item.value, index] as const] : []
  )
);

const getItemKey = (index: number, items: ThreadedItem[]): React.Key =>
  items[index].value;

const getFocusableItemId = (item: ThreadedItem): string =>
  item.type === 'thread-input' ? `${item.parentValue}-input` : item.value;

const getThreadedItemSize = (
  item: ThreadedItem,
  index: number,
  items: ThreadedItem[]
): number => {
  const previousItem = items[index - 1];
  const leadingGap =
    item.rowType === 'threadHeader' && previousItem ? threadHeaderGap : 0;

  switch (item.rowType) {
    case 'threadHeader':
      return threadHeaderHeight + leadingGap;
    case 'threadInput':
      return threadInputHeight;
    case 'threadMessage':
      return threadMessageHeight;
  }
};

const useStyles = makeStyles({
  story: {
    maxWidth: '1180px',
    width: '100%',
    overflowX: 'hidden',
  },
  infoBox: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalM,
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    backgroundColor: tokens.colorNeutralBackground2,
  },
  infoLabel: {
    color: tokens.colorNeutralForeground3,
  },
  focusedThreadId: {
    color: tokens.colorStatusDangerForeground1,
  },
  keyHint: {
    color: tokens.colorNeutralForeground2,
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
  headerRowOutlined: {
    boxShadow: `inset 2px 0 0 0 ${tokens.colorStrokeFocus2}, inset -2px 0 0 0 ${tokens.colorStrokeFocus2}, inset 0 2px 0 0 ${tokens.colorStrokeFocus2}`,
  },
  headerRowOutlinedLast: {
    boxShadow: `inset 2px 0 0 0 ${tokens.colorStrokeFocus2}, inset -2px 0 0 0 ${tokens.colorStrokeFocus2}, inset 0 2px 0 0 ${tokens.colorStrokeFocus2}, inset 0 -2px 0 0 ${tokens.colorStrokeFocus2}`,
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
  threadOutlined: {
    boxShadow: `inset 2px 0 0 0 ${tokens.colorStrokeFocus2}, inset -2px 0 0 0 ${tokens.colorStrokeFocus2}`,
  },
  threadOutlinedLast: {
    boxShadow: `inset 2px 0 0 0 ${tokens.colorStrokeFocus2}, inset -2px 0 0 0 ${tokens.colorStrokeFocus2}, inset 0 -2px 0 0 ${tokens.colorStrokeFocus2}`,
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

const ThreadedVirtualizationContext = React.createContext<
  ThreadedVirtualizationContextValue | undefined
>(undefined);

const useThreadedVirtualizationContext =
  (): ThreadedVirtualizationContextValue => {
    const context = React.useContext(ThreadedVirtualizationContext);
    if (!context) {
      throw new Error(
        'useThreadedVirtualizationContext must be used within a provider'
      );
    }
    return context;
  };

type TabsterMoveFocusEventDetail = {
  owner: HTMLElement;
  relatedEvent: Event;
};

const usePreventTabsterKeys = (
  ref: React.RefObject<HTMLElement>,
  keys: string[],
  rowTypeFilter?: string
): void => {
  React.useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const listener = (event: CustomEvent<TabsterMoveFocusEventDetail>) => {
      const { owner, relatedEvent } = event.detail;

      if (owner !== element || !relatedEvent) {
        return;
      }

      const target = (relatedEvent as KeyboardEvent).target;
      if (!isHTMLElement(target)) {
        return;
      }

      if (rowTypeFilter) {
        const row = target.closest<HTMLElement>('[data-rowtype]');
        if (row?.dataset.rowtype !== rowTypeFilter) {
          return;
        }
      }

      if (keys.includes((relatedEvent as KeyboardEvent).key)) {
        event.preventDefault();
      }
    };

    element.addEventListener('tabster:movefocus', listener as EventListener);

    return () => {
      element.removeEventListener(
        'tabster:movefocus',
        listener as EventListener
      );
    };
  }, [ref, keys, rowTypeFilter]);
};

const ThreadedVirtualizationRow = React.memo(
  (props: ListChildComponentProps<ThreadedItem[]>): React.ReactElement => {
    const styles = useStyles();
    const item = props.data[props.index];
    const nextItem = props.data[props.index + 1];
    const context = useThreadedVirtualizationContext();
    const rowStyle: React.CSSProperties = {
      ...props.style,
      width: `calc(100% - ${rowFocusGap * 2}px)`,
      marginInline: `${rowFocusGap}px`,
      ...(item.type === 'thread-header' && props.index > 0
        ? { paddingTop: `${threadHeaderGap}px` }
        : null),
    };

    if (item.type === 'thread-header') {
      const open = context.openItems.get(item.value) !== undefined;
      const outlined = context.focusedHeaderId === item.value;
      const outlinedBottom =
        outlined && (!nextItem || nextItem.type === 'thread-header');
      const headerRowRef = React.useRef<HTMLDivElement | null>(null);
      const headerCellRef = React.useRef<HTMLDivElement | null>(null);
      const headerTabsterAttributes = useTabsterAttributes({
        mover: { cyclic: false, direction: 2, memorizeCurrent: true },
        groupper: { tabbability: 2 },
      });
      const headerRowRefCallback = React.useCallback(
        (element: HTMLDivElement | null) => {
          headerRowRef.current = element;
          context.registerElementRef(item.value, element);
        },
        [context, item.value]
      );

      const onFocusCapture = React.useCallback(
        (event: React.FocusEvent<HTMLElement>) => {
          context.setFocusedHeaderId(
            event.target === event.currentTarget ? item.value : undefined
          );
        },
        [context, item.value]
      );

      const onBlurCapture = React.useCallback(
        (event: React.FocusEvent<HTMLElement>) => {
          const nextFocused = event.relatedTarget;
          if (
            isHTMLElement(nextFocused) &&
            event.currentTarget.contains(nextFocused)
          ) {
            return;
          }

          context.setFocusedHeaderId((prev) =>
            prev === item.value ? undefined : prev
          );
        },
        [context, item.value]
      );

      const onHeaderKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
          const isOnHeaderRow =
            isHTMLElement(event.target) && event.target === event.currentTarget;

          if (event.key === 'r' && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            context.focusInput(item.value);
            return;
          }

          if (!isOnHeaderRow) {
            return;
          }

          switch (event.key) {
            case ' ': {
              event.preventDefault();
              context.focusUnread(item.value);
              return;
            }
            case ArrowDown: {
              event.preventDefault();
              event.stopPropagation();
              context.focusNextHeader(item.value);
              return;
            }
            case ArrowUp: {
              event.preventDefault();
              event.stopPropagation();
              context.focusPrevHeader(item.value);
              return;
            }
            case Home: {
              event.preventDefault();
              event.stopPropagation();
              context.focusFirstItem();
              return;
            }
            case End: {
              event.preventDefault();
              event.stopPropagation();
              context.focusLastItem();
              return;
            }
            case ArrowRight: {
              if (open) {
                event.preventDefault();
                event.stopPropagation();
                headerCellRef.current?.focus();
              }
              return;
            }
          }
        },
        [context, item.value, open]
      );

      const onHeaderButtonKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLElement>) => {
          if (event.key !== ArrowLeft) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();
          headerRowRef.current?.focus();
        },
        []
      );

      return (
        <TreeGridRow
          className={mergeClasses(
            styles.rowFrame,
            styles.headerRow,
            outlined
              ? outlinedBottom
                ? styles.headerRowOutlinedLast
                : styles.headerRowOutlined
              : undefined
          )}
          data-item-id={item.value}
          data-rowtype="header"
          onBlurCapture={onBlurCapture}
          onFocusCapture={onFocusCapture}
          onKeyDown={onHeaderKeyDown}
          onOpenChange={(_, data) =>
            context.requestOpenChange({ ...data, index: props.index })
          }
          open={open}
          ref={headerRowRefCallback}
          style={rowStyle}
          subtree
          tabIndex={0}
          {...headerTabsterAttributes}
        >
          {open ? (
            <CaretDownFilled className={styles.headerChevron} aria-hidden />
          ) : (
            <CaretRightFilled className={styles.headerChevron} aria-hidden />
          )}
          <TreeGridCell
            data-header-cell="true"
            header
            onKeyDown={onHeaderButtonKeyDown}
            ref={headerCellRef}
            tabIndex={-1}
          >
            <div className={styles.headerContent}>
              <Body1Stronger className={styles.headerTitle}>
                {item.header}
              </Body1Stronger>
              <Caption1 className={styles.headerMeta}>
                {item.messageCount} messages · updated {item.lastUpdated}
              </Caption1>
            </div>
          </TreeGridCell>
          <TreeGridCell className={styles.headerCount}>
            <Caption1>{item.messageCount}</Caption1>
          </TreeGridCell>
        </TreeGridRow>
      );
    }

    const threadId = item.parentValue;
    const threadOutlined = context.focusedHeaderId === threadId;
    const isLastInThread =
      !nextItem ||
      nextItem.type === 'thread-header' ||
      nextItem.parentValue !== threadId;

    if (item.type === 'thread-input') {
      const textareaRefCallback = React.useCallback(
        (element: HTMLTextAreaElement | null) => {
          context.registerElementRef(`${threadId}-input`, element);
        },
        [context, threadId]
      );

      const inputOutlineClassName = threadOutlined
        ? isLastInThread
          ? styles.threadOutlinedLast
          : styles.threadOutlined
        : undefined;

      return (
        <TreeGridRow
          level={2}
          open={!!context.openItems.get(threadId)}
          onOpenChange={() => {
            /* noop */
          }}
          className={mergeClasses(
            styles.rowFrame,
            styles.inputRow,
            inputOutlineClassName
          )}
          data-item-parent-id={threadId}
          data-rowtype="input"
          style={rowStyle}
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
                ref={textareaRefCallback}
              />
            </TreeGridInteraction>
          </TreeGridCell>
        </TreeGridRow>
      );
    }

    const firstActionRef = React.useRef<HTMLButtonElement | null>(null);

    const messageRowRefCallback = React.useCallback(
      (element: HTMLDivElement | null) => {
        context.registerElementRef(item.value, element);
      },
      [context, item.value]
    );

    const onMessageRowKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'r' && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          context.focusInput(threadId);
          return;
        }

        if (event.key === ' ' && event.target === event.currentTarget) {
          event.preventDefault();
          context.focusUnread(threadId);
          return;
        }

        if (event.key === Enter && event.target === event.currentTarget) {
          event.preventDefault();
          firstActionRef.current?.focus();
        }
      },
      [context, threadId]
    );

    return (
      <TreeGridRow
        level={2}
        open={!!context.openItems.get(threadId)}
        onOpenChange={() => {
          /** noop */
        }}
        className={mergeClasses(
          styles.rowFrame,
          styles.messageRow,
          threadOutlined
            ? isLastInThread
              ? styles.threadOutlinedLast
              : styles.threadOutlined
            : undefined
        )}
        data-item-id={item.value}
        data-item-parent-id={threadId}
        data-rowtype="message"
        onKeyDown={onMessageRowKeyDown}
        ref={messageRowRefCallback}
        style={rowStyle}
      >
        <TreeGridCell aria-hidden className={styles.unread}>
          {item.isUnread ? <div className={styles.unreadDot} /> : null}
        </TreeGridCell>
        <TreeGridCell aria-hidden className={styles.avatar}>
          <Avatar name={item.author} size={32} />
        </TreeGridCell>
        <TreeGridCell className={styles.title} header>
          <Body1Stronger className={styles.messageTitle}>
            {item.author} {item.isUnread ? '· unread' : ''}
          </Body1Stronger>
        </TreeGridCell>
        <TreeGridCell className={styles.location}>
          <Caption1>{item.location}</Caption1>
        </TreeGridCell>
        <TreeGridCell className={styles.preview}>
          <Caption1>
            {item.preview}
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
          <Caption1 className={styles.timestamp}>{item.timestamp}</Caption1>
          <Button
            appearance="subtle"
            className={styles.actionButton}
            ref={firstActionRef}
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
);

export const ThreadedVirtualization = (): React.ReactElement => {
  const styles = useStyles();
  const { targetDocument: doc } = useFluent();
  const win = doc?.defaultView;
  const treeGridRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<VariableSizeList>(null);
  const elementRefsMap = React.useRef<Map<string, HTMLElement>>(new Map());

  usePreventTabsterKeys(treeGridRef, headerPreventedKeys, 'header');

  const [openItems, setOpenItems] = React.useState(
    () => new Map(defaultOpenItems)
  );
  const [focusedHeaderId, setFocusedHeaderId] = React.useState<
    string | undefined
  >(undefined);

  const requestOpenChange = useEventCallback(
    (data: TreeGridRowOnOpenChangeData & { index: number }) => {
      const row = data.event.currentTarget;
      if (!isHTMLElement(row)) {
        return;
      }

      const id = row.dataset.itemId;
      if (!id) {
        return;
      }

      setOpenItems((prev) => {
        const next = new Map(prev);
        if (data.open) {
          next.set(id, data.index);
        } else {
          next.delete(id);
        }
        return next;
      });
    }
  );

  const registerElementRef = React.useCallback(
    (id: string, element: HTMLElement | null) => {
      if (element) {
        elementRefsMap.current.set(id, element);
      } else {
        elementRefsMap.current.delete(id);
      }
    },
    []
  );

  const visibleItems = React.useMemo(
    () =>
      allItems.filter(
        (item) =>
          item.type === 'thread-header' ||
          openItems.get(item.parentValue) !== undefined
      ),
    [openItems]
  );

  const scrollAndFocus = React.useCallback(
    (id: string): void => {
      const index = visibleItems.findIndex((item) => {
        return getFocusableItemId(item) === id;
      });

      if (index === -1) {
        return;
      }

      listRef.current?.scrollToItem(index, 'smart');
      win?.requestAnimationFrame(() => {
        elementRefsMap.current.get(id)?.focus();
      });
    },
    [visibleItems, win]
  );

  const findHeaderIndex = React.useCallback(
    (threadId: string): number =>
      visibleItems.findIndex(
        (item) => item.type === 'thread-header' && item.value === threadId
      ),
    [visibleItems]
  );

  const focusHeaderByDirection = React.useCallback(
    (threadId: string, direction: 1 | -1): void => {
      const currentIndex = findHeaderIndex(threadId);
      if (currentIndex === -1) {
        return;
      }

      let nextIndex = currentIndex + direction;
      while (nextIndex >= 0 && nextIndex < visibleItems.length) {
        const nextItem = visibleItems[nextIndex];
        if (nextItem.type === 'thread-header') {
          scrollAndFocus(nextItem.value);
          return;
        }
        nextIndex += direction;
      }
    },
    [findHeaderIndex, scrollAndFocus, visibleItems]
  );

  const focusUnread = React.useCallback(
    (threadId: string): void => {
      const unreadItem = visibleItems.find(
        (item) =>
          item.type === 'thread-message' &&
          item.parentValue === threadId &&
          item.isUnread
      );
      if (unreadItem) {
        scrollAndFocus(unreadItem.value);
      }
    },
    [scrollAndFocus, visibleItems]
  );

  const focusInput = React.useCallback(
    (threadId: string): void => {
      scrollAndFocus(`${threadId}-input`);
    },
    [scrollAndFocus]
  );

  const contextValue = React.useMemo(
    () => ({
      focusedHeaderId,
      openItems,
      requestOpenChange,
      setFocusedHeaderId,
      focusNextHeader: (threadId: string) =>
        focusHeaderByDirection(threadId, 1),
      focusPrevHeader: (threadId: string) =>
        focusHeaderByDirection(threadId, -1),
      focusFirstItem: () => {
        const firstItem = visibleItems[0];
        if (firstItem) {
          scrollAndFocus(getFocusableItemId(firstItem));
        }
      },
      focusLastItem: () => {
        const lastItem = visibleItems[visibleItems.length - 1];
        if (lastItem) {
          scrollAndFocus(getFocusableItemId(lastItem));
        }
      },
      focusUnread,
      focusInput,
      registerElementRef,
    }),
    [
      focusHeaderByDirection,
      focusInput,
      focusUnread,
      focusedHeaderId,
      openItems,
      requestOpenChange,
      registerElementRef,
      scrollAndFocus,
      visibleItems,
    ]
  );

  const getItemSize = React.useCallback(
    (index: number): number =>
      getThreadedItemSize(visibleItems[index], index, visibleItems),
    [visibleItems]
  );

  React.useEffect(() => {
    listRef.current?.resetAfterIndex(0);
  }, [visibleItems]);

  const handleListBoundaryRef = React.useCallback(
    (instance: HTMLElement | null): void => {
      if (instance) {
        instance.setAttribute('role', 'none');
      }
    },
    []
  );

  return (
    <div className={styles.story}>
      <div className={styles.infoBox}>
        <Caption1 className={styles.infoLabel}>Keyboard:</Caption1>
        <Caption1 className={styles.keyHint}>↑ ↓ headers</Caption1>
        <Caption1 className={styles.keyHint}>← → collapse or expand</Caption1>
        <Caption1 className={styles.keyHint}>Space unread</Caption1>
        <Caption1 className={styles.keyHint}>⌘R / Ctrl+R reply</Caption1>
        <Caption1 className={styles.keyHint}>
          Focused header:{' '}
          <span className={styles.focusedThreadId}>
            {focusedHeaderId ?? '(none)'}
          </span>
        </Caption1>
      </div>
      <ThreadedVirtualizationContext.Provider value={contextValue}>
        <TreeGrid
          aria-label="Threaded TreeGrid with virtualization"
          className={styles.treeGrid}
          ref={treeGridRef}
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
            {ThreadedVirtualizationRow}
          </VariableSizeList>
        </TreeGrid>
      </ThreadedVirtualizationContext.Provider>
    </div>
  );
};
