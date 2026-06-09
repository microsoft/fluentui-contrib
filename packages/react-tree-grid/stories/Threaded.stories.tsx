import * as React from 'react';
import {
  useBreadthFirstTreeGridNavigation,
  useMergeTreeGridNavigationOverrides,
  TreeGrid,
  TreeGridCell,
  TreeGridInteraction,
  TreeGridRow,
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
} from '@fluentui/react-components';
import { CaretDownFilled, CaretRightFilled } from '@fluentui/react-icons';
import { Enter } from '@fluentui/keyboard-keys';
import { isHTMLElement } from '@fluentui/react-utilities';

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

type ThreadedNavigationProps = {
  focusedHeaderId: string | undefined;
  setFocusedHeaderId: React.Dispatch<React.SetStateAction<string | undefined>>;
  focusUnread: (threadId: string) => void;
  focusInput: (threadId: string) => void;
  registerElementRef: (id: string, element: HTMLElement | null) => void;
};

type ThreadProps = {
  thread: ThreadSeed;
  index: number;
  navigation: ThreadedNavigationProps;
};

type ThreadMessageRowProps = {
  threadId: string;
  message: ThreadMessageSeed;
  messageId: string;
  isUnread: boolean;
  isLastInThread: boolean;
  navigation: Pick<
    ThreadedNavigationProps,
    'focusInput' | 'focusUnread' | 'focusedHeaderId' | 'registerElementRef'
  >;
};

type ThreadInputRowProps = {
  threadId: string;
  isLastInThread: boolean;
  navigation: Pick<
    ThreadedNavigationProps,
    'focusedHeaderId' | 'registerElementRef'
  >;
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

const getChildRowStyle = (): React.CSSProperties => ({
  width: `calc(100% - ${rowFocusGap * 2}px)`,
  marginInline: `${rowFocusGap}px`,
});

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
  treeGridViewport: {
    maxHeight: `${containerHeight}px`,
    overflowY: 'auto',
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

const ThreadInputRow = React.memo(
  ({
    threadId,
    isLastInThread,
    navigation,
  }: ThreadInputRowProps): React.ReactElement => {
    const styles = useStyles();
    const threadOutlined = navigation.focusedHeaderId === threadId;
    const textareaRefCallback = React.useCallback(
      (element: HTMLTextAreaElement | null) => {
        navigation.registerElementRef(getThreadInputId(threadId), element);
      },
      [navigation, threadId]
    );

    return (
      <TreeGridRow
        className={mergeClasses(
          styles.rowFrame,
          styles.inputRow,
          threadOutlined
            ? isLastInThread
              ? styles.threadOutlinedLast
              : styles.threadOutlined
            : undefined
        )}
        data-rowtype="input"
        style={getChildRowStyle()}
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
);

const ThreadMessageRow = React.memo(
  ({
    threadId,
    message,
    messageId,
    isUnread,
    isLastInThread,
    navigation,
  }: ThreadMessageRowProps): React.ReactElement => {
    const styles = useStyles();
    const firstActionRef = React.useRef<HTMLButtonElement | null>(null);
    const threadOutlined = navigation.focusedHeaderId === threadId;

    const messageRowRefCallback = React.useCallback(
      (element: HTMLDivElement | null) => {
        navigation.registerElementRef(messageId, element);
      },
      [navigation, messageId]
    );

    const onMessageRowKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'r' && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          navigation.focusInput(threadId);
          return;
        }

        if (event.key === ' ' && event.target === event.currentTarget) {
          event.preventDefault();
          navigation.focusUnread(threadId);
          return;
        }

        if (event.key === Enter && event.target === event.currentTarget) {
          event.preventDefault();
          firstActionRef.current?.focus();
        }
      },
      [navigation, threadId]
    );

    return (
      <TreeGridRow
        className={mergeClasses(
          styles.rowFrame,
          styles.messageRow,
          threadOutlined
            ? isLastInThread
              ? styles.threadOutlinedLast
              : styles.threadOutlined
            : undefined
        )}
        data-rowtype="message"
        onKeyDown={onMessageRowKeyDown}
        ref={messageRowRefCallback}
        style={getChildRowStyle()}
      >
        <TreeGridCell aria-hidden className={styles.unread}>
          {isUnread ? <div className={styles.unreadDot} /> : null}
        </TreeGridCell>
        <TreeGridCell aria-hidden className={styles.avatar}>
          <Avatar name={message.author} size={32} />
        </TreeGridCell>
        <TreeGridCell className={styles.title} header>
          <Body1Stronger className={styles.messageTitle}>
            {message.author} {isUnread ? '· unread' : ''}
          </Body1Stronger>
        </TreeGridCell>
        <TreeGridCell className={styles.location}>
          <Caption1>{message.location}</Caption1>
        </TreeGridCell>
        <TreeGridCell className={styles.preview}>
          <Caption1>
            {message.preview}
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
          <Caption1 className={styles.timestamp}>{message.timestamp}</Caption1>
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

const Thread = React.memo(
  ({ thread, index, navigation }: ThreadProps): React.ReactElement => {
    const styles = useStyles();
    const [open, setOpen] = React.useState(true);
    const outlined = navigation.focusedHeaderId === thread.id;
    const rowStyle: React.CSSProperties = {
      width: `calc(100% - ${rowFocusGap * 2}px)`,
      marginInline: `${rowFocusGap}px`,
      ...(index > 0 ? { paddingTop: `${threadHeaderGap}px` } : null),
    };

    const headerRowRefCallback = React.useCallback(
      (element: HTMLDivElement | null) => {
        navigation.registerElementRef(thread.id, element);
      },
      [navigation, thread.id]
    );

    const onFocusCapture = React.useCallback(
      (event: React.FocusEvent<HTMLElement>) => {
        navigation.setFocusedHeaderId(
          event.target === event.currentTarget ? thread.id : undefined
        );
      },
      [navigation, thread.id]
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

        navigation.setFocusedHeaderId((prev) =>
          prev === thread.id ? undefined : prev
        );
      },
      [navigation, thread.id]
    );

    const onHeaderKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        const isOnHeaderRow =
          isHTMLElement(event.target) && event.target === event.currentTarget;

        if (event.key === 'r' && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          navigation.focusInput(thread.id);
          return;
        }

        if (!isOnHeaderRow) {
          return;
        }

        switch (event.key) {
          case ' ': {
            event.preventDefault();
            navigation.focusUnread(thread.id);
            return;
          }
        }
      },
      [navigation, open, thread.id]
    );

    return (
      <TreeGridRow
        className={mergeClasses(
          styles.rowFrame,
          styles.headerRow,
          outlined
            ? open
              ? styles.headerRowOutlined
              : styles.headerRowOutlinedLast
            : undefined
        )}
        data-item-id={thread.id}
        onBlurCapture={onBlurCapture}
        onFocusCapture={onFocusCapture}
        onKeyDown={onHeaderKeyDown}
        onOpenChange={(_, data) => setOpen(data.open)}
        open={open}
        ref={headerRowRefCallback}
        style={rowStyle}
        subtree={
          <>
            {thread.messages.map((message, messageIndex) => (
              <ThreadMessageRow
                isLastInThread={false}
                isUnread={isThreadMessageUnread(thread, messageIndex)}
                key={getThreadMessageId(thread.id, messageIndex)}
                message={message}
                messageId={getThreadMessageId(thread.id, messageIndex)}
                navigation={navigation}
                threadId={thread.id}
              />
            ))}
            <ThreadInputRow
              isLastInThread
              key={getThreadInputId(thread.id)}
              navigation={navigation}
              threadId={thread.id}
            />
          </>
        }
      >
        {open ? (
          <CaretDownFilled className={styles.headerChevron} aria-hidden />
        ) : (
          <CaretRightFilled className={styles.headerChevron} aria-hidden />
        )}
        <TreeGridCell tabIndex={0} data-header-cell="true" header>
          <div className={styles.headerContent}>
            <Body1Stronger className={styles.headerTitle}>
              {thread.header}
            </Body1Stronger>
            <Caption1 className={styles.headerMeta}>
              {thread.messages.length} messages · updated {thread.lastUpdated}
            </Caption1>
          </div>
        </TreeGridCell>
        <TreeGridCell className={styles.headerCount}>
          <Caption1>{thread.messages.length}</Caption1>
        </TreeGridCell>
      </TreeGridRow>
    );
  }
);

export const Threaded = (): React.ReactElement => {
  const styles = useStyles();
  const elementRefsMap = React.useRef<Map<string, HTMLElement>>(new Map());

  const [focusedHeaderId, setFocusedHeaderId] = React.useState<
    string | undefined
  >(undefined);

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

  const scrollAndFocus = React.useCallback((id: string): boolean => {
    const element = elementRefsMap.current.get(id);
    if (!element) {
      return false;
    }

    element.scrollIntoView({ block: 'nearest' });
    element.focus();
    return true;
  }, []);

  const focusUnread = React.useCallback(
    (threadId: string): void => {
      const thread = threadSeeds.find((candidate) => candidate.id === threadId);
      if (!thread) {
        return;
      }

      const unreadIndex = thread.messages.findIndex((_, messageIndex) =>
        isThreadMessageUnread(thread, messageIndex)
      );
      if (unreadIndex !== -1) {
        scrollAndFocus(getThreadMessageId(threadId, unreadIndex));
      }
    },
    [scrollAndFocus]
  );

  const focusInput = React.useCallback(
    (threadId: string): void => {
      scrollAndFocus(getThreadInputId(threadId));
    },
    [scrollAndFocus]
  );

  const breadthNavigation = useBreadthFirstTreeGridNavigation();
  const treeGridNavigation =
    useMergeTreeGridNavigationOverrides(breadthNavigation);

  const navigation = React.useMemo(
    () => ({
      focusedHeaderId,
      setFocusedHeaderId,
      focusUnread,
      focusInput,
      registerElementRef,
    }),
    [focusInput, focusUnread, focusedHeaderId, registerElementRef]
  );

  return (
    <div>
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
      <TreeGrid
        aria-label="Threaded TreeGrid without virtualization"
        {...treeGridNavigation}
      >
        {threadSeeds.map((thread, index) => (
          <Thread
            index={index}
            key={thread.id}
            navigation={navigation}
            thread={thread}
          />
        ))}
      </TreeGrid>
    </div>
  );
};
