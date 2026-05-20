import * as React from 'react';
import {
  TreeGrid,
  TreeGridCell,
  TreeGridRow,
  TreeGridRowOnOpenChangeData,
  TreeGridRowProvider,
} from '@fluentui-contrib/react-tree-grid';
import {
  Avatar,
  Body1Stronger,
  Button,
  Caption1,
  Caption1Stronger,
  InteractionTag,
  InteractionTagPrimary,
  Image,
  Tag,
  Tooltip,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  useEventCallback,
  useFluent,
} from '@fluentui/react-components';
import {
  AttachRegular,
  CalendarRegular,
  CaretDownFilled,
  CaretRightFilled,
  CheckmarkCircleRegular,
} from '@fluentui/react-icons';
import { ArrowLeft } from '@fluentui/keyboard-keys';
import { isHTMLElement } from '@fluentui/react-utilities';
import { ListChildComponentProps, VariableSizeList } from 'react-window';

type SectionItem = {
  type: 'section';
  rowType: 'section';
  value: string;
  header: string;
  meetingCount: number;
};

type MeetingRowType =
  | 'summary'
  | 'summaryWithBadges'
  | 'detail'
  | 'detailWithBadges'
  | 'preview'
  | 'previewWithBadges';

type MeetingItem = {
  type: 'meeting';
  rowType: MeetingRowType;
  value: string;
  parentValue: string;
  header: string;
  location: string;
  owner: string;
  description?: string;
  status?: 'missed';
  tasks?: number;
  attachments?: number;
  hasThumbnail: boolean;
  thumbnailLabel: string;
};

type VirtualizedMeetingsItem = SectionItem | MeetingItem;

type VirtualizationContextValue = {
  openItems: Map<PropertyKey, number>;
  requestOpenChange: (
    data: TreeGridRowOnOpenChangeData & { index: number }
  ) => void;
};

const rowFocusGap = 8;

const dayHeaders = [
  'Thursday, 1 February',
  'Wednesday, 31 January',
  'Tuesday, 30 January',
  'Monday, 29 January',
  'Friday, 26 January',
  'Thursday, 25 January',
  'Wednesday, 24 January',
  'Tuesday, 23 January',
  'Monday, 22 January',
  'Friday, 19 January',
  'Thursday, 18 January',
  'Wednesday, 17 January',
  'Tuesday, 16 January',
  'Monday, 15 January',
  'Friday, 12 January',
  'Thursday, 11 January',
  'Wednesday, 10 January',
  'Tuesday, 9 January',
];

const meetingTitles = [
  'All Hands with Sanjay Garg',
  'Monthly Sync with Fluent Team',
  'TAX RETURN 2023: How to Prepare | Online Training',
  'CAP January Top of Mind with Jeff Teper',
  'Design Review for TreeGrid Virtualization',
  'Weekly Recap with Product Design',
  'Partner Readiness Office Hours',
  'Engineering Health Dashboard Review',
];

const meetingOwners = [
  'Lenka Klugarova',
  'Amit Sehgal',
  'CZSK Comms',
  'Collaborative Apps and Platforms Executive Calendar',
  'Miriam Chen',
  'Alex Wilber',
  'Megan Bowen',
  'Ravi Narayan',
];

const meetingDescriptions = [
  'Meeting summary is currently not available for this meeting.',
  'Recap is processing and should be available shortly after the recording is indexed.',
  'Shared notes, tasks, and files are attached to help participants catch up quickly.',
  undefined,
];

const timeRanges = [
  '08:30 - 09:00',
  '09:00 - 09:30',
  '09:30 - 10:15',
  '10:30 - 11:00',
  '11:05 - 12:00',
  '12:30 - 13:00',
  '13:00 - 13:45',
  '14:00 - 14:30',
  '15:00 - 15:45',
  '16:00 - 16:30',
  '16:30 - 17:30',
  '18:00 - 18:30',
];

const thumbnailSources = [
  'https://placehold.co/130x70/E1F0FF/0F6CBD?text=Recap',
  'https://placehold.co/130x70/FDE7E9/C4314B?text=Recording',
  'https://placehold.co/130x70/E9F7EF/107C41?text=Notes',
  'https://placehold.co/130x70/FFF4CE/8A6D1E?text=Slides',
];

const useStyles = makeStyles({
  story: {
    maxWidth: '1200px',
    width: '100%',
    overflowX: 'hidden',
  },
  treeGrid: {
    width: '100%',
    overflowX: 'hidden',
  },
  section: {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr) auto',
    alignItems: 'center',
    minHeight: '48px',
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.padding(
      0,
      tokens.spacingHorizontalM,
      0,
      tokens.spacingHorizontalMNudge
    ),
    boxSizing: 'border-box',
    width: '100%',
    cursor: 'pointer',
  },
  sectionLabel: {
    display: 'grid',
    rowGap: tokens.spacingVerticalXXS,
  },
  sectionMeta: {
    color: tokens.colorNeutralForeground3,
  },
  sectionChevron: {
    color: tokens.colorNeutralForeground3,
    ...shorthands.margin(0, tokens.spacingHorizontalS, 0, 0),
  },
  sectionCount: {
    justifySelf: 'end',
  },
  sectionItem: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 220px)',
    gridTemplateRows: 'repeat(2, auto)',
    alignItems: 'start',
    columnGap: '0.5rem',
    rowGap: '0.75rem',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding('0.75rem'),
    boxSizing: 'border-box',
    minWidth: 0,
    width: '100%',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
    },
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr) auto',
    gridTemplateRows: 'repeat(3, auto)',
    gridAutoFlow: 'row',
    gridTemplateAreas: `
      'icon title tag'
      'icon location location'
      'icon description description'
    `,
    alignItems: 'center',
    rowGap: '0.5rem',
    columnGap: '0.5rem',
    alignSelf: 'baseline',
    justifySelf: 'baseline',
    minWidth: 0,
  },
  title: {
    alignSelf: 'start',
    justifySelf: 'start',
    minWidth: 0,
    ...shorthands.gridArea('title'),
  },
  icon: {
    ...shorthands.gridArea('icon'),
    ...shorthands.margin(0, '1rem', 0, '0.6rem'),
    alignSelf: 'flex-start',
  },
  tag: shorthands.gridArea('tag'),
  location: {
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...shorthands.gridArea('location'),
  },
  description: {
    color: tokens.colorNeutralForeground3,
    minWidth: 0,
    ...shorthands.gridArea('description'),
  },
  header: {
    ...shorthands.gridArea(1, 1, 3, 2),
    minWidth: 0,
  },
  noPadding: {
    ...shorthands.padding(0),
  },
  titleButton: {
    justifyContent: 'flex-start',
    minWidth: 0,
  },
  titleText: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  missedTag: {
    ...shorthands.border('1px', 'solid', tokens.colorPaletteRedBorder1),
    backgroundColor: tokens.colorPaletteRedBackground1,
    color: tokens.colorPaletteRedForeground1,
  },
  actionCell: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
  },
  actionPanel: {
    ...shorthands.gridArea(1, 2, 3, 3),
    display: 'grid',
    justifyItems: 'end',
    alignContent: 'start',
    rowGap: '0.75rem',
    minWidth: 0,
    width: '100%',
    maxWidth: '220px',
  },
  quickActions: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
    width: '100%',
    maxWidth: '220px',
  },
  actionButton: {
    minWidth: 'unset',
  },
  previewButton: {
    justifySelf: 'end',
    width: '130px',
    maxWidth: '100%',
  },
  previewImage: {
    display: 'block',
    width: '100%',
    maxWidth: '100%',
    height: '70px',
    objectFit: 'cover',
  },
});

const allItems: VirtualizedMeetingsItem[] = dayHeaders.flatMap(
  (header, dayIndex) => {
    const sectionValue = `meeting-day-${dayIndex}`;
    const meetings = Array.from({ length: 22 }, (_, meetingIndex) => {
      const titleIndex = (dayIndex * 3 + meetingIndex) % meetingTitles.length;
      const ownerIndex = (dayIndex + meetingIndex) % meetingOwners.length;
      const descriptionIndex =
        (dayIndex * 2 + meetingIndex) % meetingDescriptions.length;
      const timeIndex = (dayIndex + meetingIndex) % timeRanges.length;
      const tasks =
        meetingIndex % 4 === 0
          ? ((meetingIndex + dayIndex) % 8) + 2
          : undefined;
      const attachments =
        meetingIndex % 3 === 0
          ? ((meetingIndex + dayIndex) % 4) + 1
          : undefined;
      const hasThumbnail = meetingIndex % 2 === 0;
      const description = meetingDescriptions[descriptionIndex];
      const hasBadges = Boolean(tasks) && Boolean(attachments);

      let rowType: MeetingRowType;
      if (hasThumbnail) {
        rowType = hasBadges ? 'previewWithBadges' : 'preview';
      } else if (description) {
        rowType = hasBadges ? 'detailWithBadges' : 'detail';
      } else {
        rowType = hasBadges ? 'summaryWithBadges' : 'summary';
      }

      return {
        type: 'meeting' as const,
        rowType,
        value: `${sectionValue}-meeting-${meetingIndex}`,
        parentValue: sectionValue,
        header:
          meetingIndex % 5 === 0
            ? `${meetingTitles[titleIndex]} ${meetingIndex + 1}`
            : meetingTitles[titleIndex],
        location: `${header} · ${timeRanges[timeIndex]}`,
        owner: meetingOwners[ownerIndex],
        description,
        status:
          (dayIndex + meetingIndex) % 9 === 0 ? ('missed' as const) : undefined,
        tasks,
        attachments,
        hasThumbnail,
        thumbnailLabel: ['Recap', 'Recording', 'Notes', 'Slides'][
          (dayIndex + meetingIndex) % 4
        ],
      };
    });

    return [
      {
        type: 'section' as const,
        rowType: 'section' as const,
        value: sectionValue,
        header,
        meetingCount: meetings.length,
      },
      ...meetings,
    ];
  }
);

const defaultOpenItems = new Map<PropertyKey, number>(
  allItems.flatMap((item, index) => {
    if (item.type !== 'section' || index > 46) {
      return [];
    }

    return [[item.value, index] as const];
  })
);

const getItemKey = (
  index: number,
  items: VirtualizedMeetingsItem[]
): React.Key => items[index].value;

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

const renderCountTag = (
  count: number,
  label: string,
  icon: React.ReactElement,
  appearance?: 'brand'
): React.ReactElement => (
  <Tooltip content={`${count} ${label}`} relationship="label">
    <InteractionTag appearance={appearance} shape="circular" size="small">
      <InteractionTagPrimary aria-label={`${count} ${label}`} icon={icon}>
        {count}
      </InteractionTagPrimary>
    </InteractionTag>
  </Tooltip>
);

const getMeetingRowSize = (item: MeetingItem): number => {
  switch (item.rowType) {
    case 'previewWithBadges':
      return 164;
    case 'preview':
      return 152;
    case 'detailWithBadges':
      return 124;
    case 'detail':
      return 112;
    case 'summaryWithBadges':
      return 104;
    case 'summary':
      return 92;
  }
};

const VirtualizedMeetingsRow = React.memo(
  (
    props: ListChildComponentProps<VirtualizedMeetingsItem[]>
  ): React.ReactElement => {
    const styles = useStyles();
    const item = props.data[props.index];
    const { openItems, requestOpenChange } = useVirtualizationContext();
    const rowStyle: React.CSSProperties = {
      ...props.style,
      width: `calc(100% - ${rowFocusGap * 2}px)`,
      marginInline: `${rowFocusGap}px`,
    };

    if (item.type === 'section') {
      const isOpen = openItems.get(item.value) !== undefined;

      return (
        <TreeGridRow
          className={styles.section}
          data-item-id={item.value}
          onOpenChange={(_, data) =>
            requestOpenChange({ ...data, index: props.index })
          }
          open={isOpen}
          style={rowStyle}
          subtree
        >
          {isOpen ? (
            <CaretDownFilled className={styles.sectionChevron} aria-hidden />
          ) : (
            <CaretRightFilled className={styles.sectionChevron} aria-hidden />
          )}
          <TreeGridCell header aria-colspan={5}>
            <div className={styles.sectionLabel}>
              <Body1Stronger>{item.header}</Body1Stronger>
              <Caption1 className={styles.sectionMeta}>
                {item.meetingCount} meetings in this section
              </Caption1>
            </div>
          </TreeGridCell>
          <TreeGridCell className={styles.sectionCount}>
            {renderCountTag(
              item.meetingCount,
              'meetings',
              <CalendarRegular />,
              'brand'
            )}
          </TreeGridCell>
        </TreeGridRow>
      );
    }

    const thumbnailSource =
      thumbnailSources[props.index % thumbnailSources.length];

    return (
      <TreeGridRowProvider
        value={{
          open: !!openItems.get(item.parentValue),
          level: 1,
          requestOpenChange,
        }}
      >
        <TreeGridRow
          aria-description={`Created by: ${item.owner}. ${
            item.status ? `Meeting status: ${item.status}. ` : ''
          }${
            item.hasThumbnail ? `${item.thumbnailLabel} preview available.` : ''
          }`}
          className={styles.sectionItem}
          data-item-parent-id={item.parentValue}
          style={rowStyle}
        >
          <TreeGridCell
            aria-label={`${item.header}. ${item.location}`}
            className={mergeClasses(styles.header, styles.container)}
            header
          >
            <Avatar
              aria-hidden
              className={styles.icon}
              icon={<CalendarRegular />}
            />
            <Button
              appearance="transparent"
              aria-label={`Go to ${item.header}`}
              className={mergeClasses(
                styles.noPadding,
                styles.title,
                styles.titleButton
              )}
            >
              <Body1Stronger className={styles.titleText}>
                {item.header}
              </Body1Stronger>
            </Button>
            {item.status === 'missed' ? (
              <Tag
                className={mergeClasses(styles.missedTag, styles.tag)}
                shape="circular"
                size="small"
              >
                <Caption1Stronger>Missed</Caption1Stronger>
              </Tag>
            ) : null}
            <Caption1 className={styles.location}>
              {item.location}, {item.owner}
            </Caption1>
            {item.description ? (
              <Caption1 className={styles.description}>
                {item.description}
              </Caption1>
            ) : null}
          </TreeGridCell>
          <TreeGridCell className={styles.actionPanel}>
            <div className={styles.quickActions}>
              {item.tasks
                ? renderCountTag(
                    item.tasks,
                    'tasks for people to follow up on',
                    <CheckmarkCircleRegular />,
                    'brand'
                  )
                : null}
              {item.attachments
                ? renderCountTag(item.attachments, 'files', <AttachRegular />)
                : null}
              <Button className={styles.actionButton} size="small">
                Chat
              </Button>
              <Button className={styles.actionButton} size="small">
                View recaps
              </Button>
            </div>
            {item.hasThumbnail ? (
              <Button
                appearance="subtle"
                className={mergeClasses(styles.noPadding, styles.previewButton)}
              >
                <Image
                  className={styles.previewImage}
                  src={thumbnailSource}
                  alt={`${item.thumbnailLabel} preview`}
                />
              </Button>
            ) : null}
          </TreeGridCell>
        </TreeGridRow>
      </TreeGridRowProvider>
    );
  }
);

export const Virtualization = (): React.ReactElement => {
  const styles = useStyles();
  const { targetDocument: doc } = useFluent();
  const win = doc?.defaultView;
  const listRef = React.useRef<VariableSizeList>(null);

  const [openItems, setOpenItems] = React.useState(
    () => new Map(defaultOpenItems)
  );

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

  const visibleItems = React.useMemo(
    () =>
      allItems.filter(
        (item) =>
          item.type === 'section' ||
          openItems.get(item.parentValue) !== undefined
      ),
    [openItems]
  );

  const getItemSize = React.useCallback(
    (index: number): number => {
      const item = visibleItems[index];
      if (item.rowType === 'section') {
        return 48;
      }

      return getMeetingRowSize(item);
    },
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

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>): void => {
      if (event.key !== ArrowLeft || !isHTMLElement(event.target)) {
        return;
      }

      const row = event.target.closest<HTMLElement>('[role="row"]');
      const parentId = row?.dataset.itemParentId;
      if (!parentId) {
        return;
      }

      const index = openItems.get(parentId);
      if (index === undefined || !win || !doc) {
        return;
      }

      listRef.current?.scrollToItem(index, 'smart');
      win.requestAnimationFrame(() => {
        doc.querySelector<HTMLElement>(`[data-item-id="${parentId}"]`)?.focus();
      });
    },
    [doc, openItems, win]
  );

  const contextValue = React.useMemo(
    () => ({ openItems, requestOpenChange }),
    [openItems, requestOpenChange]
  );

  return (
    <div className={styles.story}>
      <VirtualizationContext.Provider value={contextValue}>
        <TreeGrid
          aria-label="Recent meetings with virtualization"
          className={styles.treeGrid}
          onKeyDown={handleKeyDown}
        >
          <VariableSizeList
            height={600}
            innerRef={handleListBoundaryRef}
            itemCount={visibleItems.length}
            itemData={visibleItems}
            itemKey={getItemKey}
            itemSize={getItemSize}
            outerRef={handleListBoundaryRef}
            ref={listRef}
            width="100%"
          >
            {VirtualizedMeetingsRow}
          </VariableSizeList>
        </TreeGrid>
      </VirtualizationContext.Provider>
    </div>
  );
};
