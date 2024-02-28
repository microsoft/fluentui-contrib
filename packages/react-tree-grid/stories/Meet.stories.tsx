import * as React from 'react';
import {
  TreeGrid,
  TreeGridProps,
  TreeGridCell,
  TreeGridRow,
  TreeGridRowOnOpenChangeData,
} from '@fluentui-contrib/react-tree-grid';
import {
  Button,
  makeStyles,
  tokens,
  shorthands,
  Avatar,
  Body1Stronger,
  Tag,
  Caption1Stronger,
  Caption1,
  InteractionTag,
  InteractionTagPrimary,
  Tooltip,
  Image,
  mergeClasses,
} from '@fluentui/react-components';
import { EventHandler } from '@fluentui/react-utilities';
import {
  CaretRightFilled,
  CaretDownFilled,
  CalendarRegular,
  CheckmarkCircleRegular,
  AttachRegular,
} from '@fluentui/react-icons';

const useMeetingsSectionStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
    gridTemplateRows: 'repeat(3, auto)',
    gridAutoFlow: 'row',
    gridTemplateAreas: `
      "icon title tag"
      "icon location location"
      "icon description description"
    `,
    alignItems: 'center',
    rowGap: '0.5rem',
    columnGap: '0.5rem',
    alignSelf: 'baseline',
    justifySelf: 'baseline',
  },
  title: {
    alignSelf: 'start',
    justifySelf: 'start',
    ...shorthands.gridArea('title'),
  },
  icon: {
    ...shorthands.gridArea('icon'),
    ...shorthands.margin(0, '1rem', 0, '0.6rem'),
    alignSelf: 'flex-start',
  },
  tag: shorthands.gridArea('tag'),
  location: shorthands.gridArea('location'),
  description: shorthands.gridArea('description'),
  section: {
    alignItems: 'center',
    height: '35px',
    ...shorthands.padding(
      0,
      tokens.spacingHorizontalM,
      0,
      tokens.spacingHorizontalMNudge
    ),
    cursor: 'pointer',
  },
  sectionItem: {
    ...shorthands.padding('0.5rem'),
    alignItems: 'start',
    display: 'grid',
    gridTemplateColumns: '1fr repeat(4, auto)',
    gridTemplateRows: 'repeat(2, auto)',
    columnGap: '0.5rem',
    rowGap: '1rem',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
    },
  },
  noPadding: {
    ...shorthands.padding(0),
  },
  missedTag: {
    ...shorthands.border('1px', 'solid', tokens.colorPaletteRedBorder1),
    backgroundColor: tokens.colorPaletteRedBackground1,
    color: tokens.colorPaletteRedForeground1,
  },
  image: {
    ...shorthands.gridArea(2, 1, 3, 5),
    justifySelf: 'end',
  },
  header: {
    ...shorthands.gridArea(1, 1, 3, 2),
  },
  thumbnail: {
    alignSelf: 'end',
    justifySelf: 'end',
    ...shorthands.gridArea(2, 2, 3, 6),
  },
});

export const Meet = () => {
  const styles = useMeetingsSectionStyles();
  return (
    <MeetingsPanel>
      <MeetingsSection header="Thursday, 1 February">
        <MeetingsSectionItem
          status="missed"
          header="All Hands with Sanjay Garg"
          location="Thursday, 1 February · 11:05 - 12:00, Lenka Klugarova"
          description="Meeting summary is currently not available for this meeting."
          tasks={
            <Tooltip
              content="5 tasks for people to follow up on"
              relationship="label"
            >
              <InteractionTag appearance="brand" shape="circular" size="small">
                <InteractionTagPrimary
                  aria-label="5 tasks for people to follow up on"
                  icon={<CheckmarkCircleRegular />}
                >
                  5
                </InteractionTagPrimary>
              </InteractionTag>
            </Tooltip>
          }
          attachments={
            <Tooltip content="2 files" relationship="label">
              <InteractionTag shape="circular" size="small">
                <InteractionTagPrimary
                  aria-label="2 files"
                  icon={<AttachRegular />}
                >
                  2
                </InteractionTagPrimary>
              </InteractionTag>
            </Tooltip>
          }
          thumbnail={
            <Button
              className={mergeClasses(styles.noPadding, styles.image)}
              appearance="subtle"
            >
              <Image
                src="https://placehold.co/130x70"
                alt="Image placeholder"
              />
            </Button>
          }
        />
      </MeetingsSection>
      <MeetingsSection header="Thursday, 25 January">
        <MeetingsSectionItem
          header="Monthly Sync with Fluent Team"
          location="Thursday, 25 January 2024 · 16:30 - 17:30, Amit Sehgal"
          description="Meeting summary is currently not available for this meeting."
          tasks={
            <Tooltip
              content="8 tasks for people to follow up on"
              relationship="label"
            >
              <InteractionTag appearance="brand" shape="circular" size="small">
                <InteractionTagPrimary
                  aria-label="8 tasks for people to follow up on"
                  icon={<CheckmarkCircleRegular />}
                >
                  8
                </InteractionTagPrimary>
              </InteractionTag>
            </Tooltip>
          }
          attachments={
            <Tooltip content="2 files" relationship="label">
              <InteractionTag shape="circular" size="small">
                <InteractionTagPrimary
                  aria-label="2 files"
                  icon={<AttachRegular />}
                >
                  2
                </InteractionTagPrimary>
              </InteractionTag>
            </Tooltip>
          }
          thumbnail={
            <Button
              className={mergeClasses(styles.noPadding, styles.image)}
              appearance="subtle"
            >
              <Image
                src="https://placehold.co/130x70"
                alt="Image placeholder"
              />
            </Button>
          }
        />
        <MeetingsSectionItem
          header="TAX RETURN 2023: How to Prepare | Online Training (Option 1)"
          location="Thursday, 25 January 2024 · 10:00 - 12:00, CZSK Comms"
          attachments={
            <Tooltip content="2 files" relationship="label">
              <InteractionTag shape="circular" size="small">
                <InteractionTagPrimary
                  aria-label="2 files"
                  icon={<AttachRegular />}
                >
                  2
                </InteractionTagPrimary>
              </InteractionTag>
            </Tooltip>
          }
        />
      </MeetingsSection>
      <MeetingsSection header="Tuesday, 23 January">
        <MeetingsSectionItem
          header="CAP January Top of Mind with Jeff Teper"
          location="Tuesday, 23 January 2024 · 23:05 - 23:30, Collaborative Apps and Platforms Executive Calendar"
          description="Meeting summary is currently not available for this meeting."
          attachments={
            <Tooltip content="2 files" relationship="label">
              <InteractionTag shape="circular" size="small">
                <InteractionTagPrimary
                  aria-label="2 files"
                  icon={<AttachRegular />}
                >
                  2
                </InteractionTagPrimary>
              </InteractionTag>
            </Tooltip>
          }
          thumbnail={
            <Button
              className={mergeClasses(styles.noPadding, styles.image)}
              appearance="subtle"
            >
              <Image
                src="https://placehold.co/130x70"
                alt="Image placeholder"
              />
            </Button>
          }
        />
      </MeetingsSection>
    </MeetingsPanel>
  );
};

const MeetingsPanel = (props: TreeGridProps) => (
  <TreeGrid aria-label="All meetings" {...props} />
);

type MeetingsSectionProps = {
  header: string;
  children?: React.ReactNode;
};
const MeetingsSection = (props: MeetingsSectionProps) => {
  const [open, setOpen] = React.useState(true);
  const handleOpenChange: EventHandler<TreeGridRowOnOpenChangeData> = (
    ev,
    data
  ) => {
    setOpen(data.open);
  };
  const styles = useMeetingsSectionStyles();
  return (
    <TreeGridRow
      open={open}
      onOpenChange={handleOpenChange}
      subtree={<>{props.children}</>}
      className={styles.section}
    >
      {open ? (
        <CaretDownFilled aria-hidden />
      ) : (
        <CaretRightFilled aria-hidden />
      )}
      <TreeGridCell header aria-colspan={4}>
        {props.header}
      </TreeGridCell>
    </TreeGridRow>
  );
};
type MeetingsSectionItemProps = {
  header: React.ReactNode;
  location: React.ReactNode;
  description?: React.ReactNode;
  status?: 'missed';
  tasks?: React.ReactNode;
  attachments?: React.ReactNode;
  thumbnail?: React.ReactNode;
};
const MeetingsSectionItem = (props: MeetingsSectionItemProps) => {
  const styles = useMeetingsSectionStyles();
  return (
    <TreeGridRow className={styles.sectionItem}>
      <TreeGridCell
        className={mergeClasses(styles.header, styles.container)}
        header
      >
        <Avatar
          className={styles.icon}
          icon={<CalendarRegular />}
          aria-hidden
        />
        <Button
          appearance="transparent"
          className={mergeClasses(styles.noPadding, styles.title)}
        >
          <Body1Stronger>{props.header}</Body1Stronger>
        </Button>
        {props.status === 'missed' && (
          <Tag
            className={mergeClasses(styles.missedTag, styles.tag)}
            size="small"
            shape="circular"
          >
            <Caption1Stronger>Missed</Caption1Stronger>
          </Tag>
        )}
        <Caption1 className={styles.location}>{props.location}</Caption1>
        {props.description && (
          <Caption1 className={styles.description}>
            {props.description}
          </Caption1>
        )}
      </TreeGridCell>
      {props.tasks && <TreeGridCell>{props.tasks}</TreeGridCell>}
      {props.attachments && <TreeGridCell>{props.attachments}</TreeGridCell>}
      <TreeGridCell>
        <Button size="small">Chat</Button>
      </TreeGridCell>
      <TreeGridCell>
        <Button size="small">View recaps</Button>
      </TreeGridCell>
      {props.thumbnail && (
        <TreeGridCell className={styles.thumbnail}>
          {props.thumbnail}
        </TreeGridCell>
      )}
    </TreeGridRow>
  );
};
