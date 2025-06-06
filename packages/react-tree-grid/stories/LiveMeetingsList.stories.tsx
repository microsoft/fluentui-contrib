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
      className={styles.sectionItem}
    >
      <TreeGridCell
        aria-label={`${props.header}. ${props.location}`}
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
          aria-label="Go to meeting"
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
        <Caption1 className={styles.location}>
          {props.location}, {props.owner}
        </Caption1>
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
