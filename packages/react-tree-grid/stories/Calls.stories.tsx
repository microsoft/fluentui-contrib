import * as React from 'react';
import {
  TreeGrid,
  TreeGridCell,
  TreeGridInteraction,
  TreeGridRow,
  TreeGridRowTrigger,
} from '@fluentui-contrib/react-tree-grid';
import {
  Avatar,
  Body1,
  Button,
  Caption1,
  Input,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tab,
  TabList,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import {
  CaretRightFilled,
  CaretDownFilled,
  MoreHorizontalFilled,
  FilterFilled,
  DismissFilled,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  cell: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ':hover': {
      '--moreActionsBtn-opacity': '1',
      '--moreActionsBtn-position': 'relative',
    },
    ':focus-within': {
      '--moreActionsBtn-opacity': '1',
      '--moreActionsBtn-position': 'relative',
    },
  },
  historyRow: {
    ...shorthands.borderBottom(
      tokens.strokeWidthThin,
      'solid',
      tokens.colorNeutralForeground2
    ),
  },
  historyRowHeader: {
    ...shorthands.flex(1, 1, 'auto'),
  },
  descriptionCell: {
    ...shorthands.flex(1, 1, 'auto'),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
  },

  description: {
    display: 'inline-flex',
    flexDirection: 'column',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
  },
  caption: {
    whiteSpace: 'nowrap',
  },
  moreActionsBtn: {
    position: 'var(--moreActionsBtn-position, fixed)' as 'fixed' | 'unset',
    opacity: 'var(--moreActionsBtn-opacity, 0)',
    ':focus': {
      opacity: '1',
      position: 'relative',
    },
  },
  moreActionsBtnVisible: {
    opacity: '1',
    position: 'relative',
  },
  input: {
    width: '100%',
  },
});

export const Calls = () => {
  const styles = useStyles();
  return (
    <TreeGrid className={styles.grid} aria-label="All calls">
      <HistoryCalls>
        <Call
          name="Jane Smith"
          date="Today"
          duration="8m 45s"
          type="outgoing"
        />
        <Call
          name="John Doe"
          date="Yesterday"
          duration="6m 35s"
          type="incoming"
        />
        <Call
          name="Alice Johnson"
          date="Yesterday"
          duration="4m 20s"
          type="missed"
        />
        <Call
          name="Bob Williams"
          date="2 days ago"
          duration="3m 15s"
          type="incoming"
        />
      </HistoryCalls>
    </TreeGrid>
  );
};

const HistoryCalls = (props: { children?: React.ReactNode }) => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(true);
  const input = (
    <>
      <TreeGridCell
        className={mergeClasses(styles.cell, styles.historyRowHeader)}
        header
      >
        <TreeGridInteraction
          className={styles.input}
          aria-label="TreeGrid interactive filter input"
          aria-roledescription="interactive content"
          aria-description="interact with Enter, then leave with Escape"
        >
          <Input className={styles.input} autoFocus />
        </TreeGridInteraction>
      </TreeGridCell>
      <TreeGridCell className={styles.cell}>
        <Button
          appearance="subtle"
          onClick={() => setShowInput(false)}
          icon={<DismissFilled aria-label="Enter by voice" />}
        />
      </TreeGridCell>
    </>
  );
  const [showInput, setShowInput] = React.useState(false);
  const cells = (
    <>
      <TreeGridCell
        className={mergeClasses(styles.cell, styles.historyRowHeader)}
        header
      >
        <TreeGridRowTrigger>
          <Button
            icon={open ? <CaretDownFilled /> : <CaretRightFilled />}
            appearance="transparent"
          >
            History
          </Button>
        </TreeGridRowTrigger>
      </TreeGridCell>
      <TreeGridCell className={styles.cell}>
        <TreeGridInteraction
          aria-label="TreeGrid interactive tablist"
          aria-roledescription="interactive content"
          aria-description="interact with Enter, then leave with Escape"
        >
          <TabList>
            <Tab value="all">All</Tab>
            <Tab value="missed">Missed</Tab>
            <Tab value="incoming">Incoming</Tab>
            <Tab value="voicemail">Voice Call</Tab>
          </TabList>
        </TreeGridInteraction>
      </TreeGridCell>
      <TreeGridCell className={styles.cell}>
        <Button
          appearance="subtle"
          icon={<FilterFilled />}
          aria-label="Filter"
          onClick={() => setShowInput(true)}
        />
      </TreeGridCell>
    </>
  );
  return (
    <TreeGridRow
      open={open}
      onOpenChange={(_, data) => setOpen(data.open)}
      className={mergeClasses(styles.row, styles.historyRow)}
      subtree={{ children: props.children }}
    >
      {showInput ? input : cells}
    </TreeGridRow>
  );
};

type CallProps = {
  name: string;
  duration: string;
  date: string;
  type: 'incoming' | 'outgoing' | 'missed' | 'voicemail';
};
const Call = (props: CallProps) => {
  const styles = useStyles();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const popover = (
    <MenuPopover>
      <MenuList>
        <MenuItem>Call back</MenuItem>
        <MenuItem>Chat</MenuItem>
        <MenuItem>Remove from view</MenuItem>
        <MenuItem>Add to speed dial</MenuItem>
        <MenuItem>Add contact</MenuItem>
      </MenuList>
    </MenuPopover>
  );
  return (
    <Menu openOnContext>
      <MenuTrigger disableButtonEnhancement>
        <TreeGridRow
          aria-description="has contextual menu"
          className={mergeClasses(styles.row)}
        >
          <TreeGridCell className={styles.cell} header>
            <Avatar
              role="button"
              tabIndex={0}
              badge={{ status: 'available' }}
              name={props.name}
            />
          </TreeGridCell>
          <TreeGridCell className={styles.descriptionCell}>
            <span className={styles.description} tabIndex={0}>
              <Body1>{props.name}</Body1>
              <Caption1 className={styles.caption}>{props.type}</Caption1>
            </span>
          </TreeGridCell>
          <TreeGridCell className={styles.cell}>
            <Menu
              open={menuOpen}
              onOpenChange={(_, data) => setMenuOpen(data.open)}
            >
              <MenuTrigger disableButtonEnhancement>
                <Button
                  className={mergeClasses(
                    styles.moreActionsBtn,
                    menuOpen && styles.moreActionsBtnVisible
                  )}
                  appearance="subtle"
                  aria-label="More actions"
                  icon={<MoreHorizontalFilled />}
                />
              </MenuTrigger>
              {popover}
            </Menu>
          </TreeGridCell>
          <TreeGridCell className={styles.cell}>
            <Caption1 className={styles.caption} tabIndex={0}>
              {props.duration}
            </Caption1>
          </TreeGridCell>
          <TreeGridCell className={styles.cell}>
            <Caption1 className={styles.caption} tabIndex={0}>
              {props.date}
            </Caption1>
          </TreeGridCell>
        </TreeGridRow>
      </MenuTrigger>
      {popover}
    </Menu>
  );
};
