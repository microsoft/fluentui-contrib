import * as React from 'react';
import {
  TreeGrid,
  TreeGridProps,
  TreeGridCell,
  TreeGridRow,
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
  Title2,
} from '@fluentui/react-components';
import {
  CalendarRegular,
  CheckmarkCircleRegular,
  AttachRegular,
} from '@fluentui/react-icons';

const useMeetingsSectionStyles = makeStyles({
  title: shorthands.gridArea('title'),
  icon: shorthands.gridArea('icon'),
  tag: shorthands.gridArea('tag'),
  location: shorthands.gridArea('location'),
  description: shorthands.gridArea('description'),
  tasks: shorthands.gridArea('tasks'),
  attachments: shorthands.gridArea('attachments'),
  chat: shorthands.gridArea('chat'),
  viewRecaps: shorthands.gridArea('view'),
  treeGridRow: {
    ...shorthands.padding(tokens.spacingHorizontalM),
    display: 'grid',
    gridTemplateColumns: 'auto 1fr repeat(5, auto)',
    gridTemplateRows: 'repeat(3, auto)',
    gridTemplateAreas: `
      "icon title       tag         tasks    attachments chat      view"
      "icon location    location    location nothing     thumbnail thumbnail"
      "icon description description description  nothing thumbnail thumbnail"
    `,
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS,
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
  image: {},
  thumbnail: {
    ...shorthands.gridArea('thumbnail'),
    justifySelf: 'end',
  },
  h2: {
    padding: tokens.spacingVerticalM,
    margin: 0,
    display: 'inline-block',
  },
});

export const LiveMeetingsList = () => {
  const styles = useMeetingsSectionStyles();
  return (
    <>
      <Title2 className={styles.h2} as="h2">
        Live meetings list:
      </Title2>
      <MeetingsPanel>
        <MeetingsSectionItem
          status="missed"
          header="All Hands with Sanjay Garg"
          location="Thursday, 1 February · 11:05 - 12:00"
          owner="Lenka Klugarova"
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
                alt="Meeting recording"
              />
            </Button>
          }
        />
        <MeetingsSectionItem
          header="Monthly Sync with Fluent Team"
          location="Thursday, 25 January 2024 · 16:30 - 17:30"
          owner="Amit Sehgal"
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
                alt="Meeting recording"
              />
            </Button>
          }
        />
        <MeetingsSectionItem
          header="TAX RETURN 2023: How to Prepare | Online Training (Option 1)"
          location="Thursday, 25 January 2024 · 10:00 - 12:00"
          owner="CZSK Comms"
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
        <MeetingsSectionItem
          header="CAP January Top of Mind with Jeff Teper"
          location="Tuesday, 23 January 2024 · 23:05 - 23:30"
          owner="Collaborative Apps and Platforms Executive Calendar"
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
                alt="Meeting recording"
              />
            </Button>
          }
        />
      </MeetingsPanel>
    </>
  );
};

const MeetingsPanel = (props: TreeGridProps) => (
  <TreeGrid aria-label="All meetings" {...props} />
);

type MeetingsSectionItemProps = {
  header: string;
  location: string;
  owner: string;
  description?: React.ReactNode;
  status?: 'missed';
  tasks?: React.ReactNode;
  attachments?: React.ReactNode;
  thumbnail?: React.ReactNode;
};
const MeetingsSectionItem = (props: MeetingsSectionItemProps) => {
  const styles = useMeetingsSectionStyles();
  return (
    <TreeGridRow
      aria-description={`Created by: ${props.owner}. ${
        props.status ? `Meeting status: ${props.status}` : ''
      }`}
      className={styles.treeGridRow}
    >
      <TreeGridCell className={styles.icon}>
        <Avatar icon={<CalendarRegular />} aria-hidden />
      </TreeGridCell>
      <TreeGridCell header className={styles.title}>
        <Button className={styles.noPadding} appearance="transparent">
          <Body1Stronger>{props.header}</Body1Stronger>
        </Button>
      </TreeGridCell>
      <TreeGridCell className={styles.location}>
        <Caption1>
          {props.location}, {props.owner}
        </Caption1>
      </TreeGridCell>
      <TreeGridCell className={styles.description}>
        {props.description && <Caption1>{props.description}</Caption1>}
      </TreeGridCell>
      <TreeGridCell className={styles.tag}>
        {props.status === 'missed' && (
          <Tag className={styles.missedTag} size="small" shape="circular">
            <Caption1Stronger aria-label="status: missed">
              Missed
            </Caption1Stronger>
          </Tag>
        )}
      </TreeGridCell>
      <TreeGridCell className={styles.tasks}>{props.tasks}</TreeGridCell>
      <TreeGridCell className={styles.attachments}>
        {props.attachments}
      </TreeGridCell>
      <TreeGridCell className={styles.chat}>
        <Button size="small">Chat</Button>
      </TreeGridCell>
      <TreeGridCell className={styles.viewRecaps}>
        <Button size="small">View recaps</Button>
      </TreeGridCell>
      <TreeGridCell className={styles.thumbnail}>
        {props.thumbnail}
      </TreeGridCell>
    </TreeGridRow>
  );
};
