import * as React from 'react';
import {
  TreeGrid,
  TreeGridProps,
  TreeGridCell,
  TreeGridRow,
} from '@fluentui-contrib/react-tree-grid';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';

export const Meetings = () => {
  return (
    <MeetingsPanel>
      <MeetingsSection header="Today" action={<Button>Header action</Button>}>
        <MeetingsSectionItem
          header="Monthly townhall, 10:00 AM to 11:00 AM"
          primaryAction={<Button>Chat with participants</Button>}
          secondaryAction={
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button>Toggle menu</Button>
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem>New </MenuItem>
                  <MenuItem>New Window</MenuItem>
                  <MenuItem disabled>Open File</MenuItem>
                  <MenuItem>Open Folder</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          }
        />
        <MeetingsSectionItem
          header="Planning for next quarter, 11:00 AM to 12:00 PM"
          primaryAction={<Button>Chat with participants</Button>}
          secondaryAction={<Button>View recap</Button>}
        />
      </MeetingsSection>
      <MeetingsSection
        header="Last week"
        action={<Button>Header action</Button>}
      >
        <MeetingsSectionItem
          header="Weekly summary #2, 2:30 PM to 3:30 PM"
          primaryAction={<Button>Chat with participants</Button>}
          secondaryAction={<Button>View recap</Button>}
        />
        <MeetingsSectionItem
          header="Mandatory training #1, 9:00 AM to 10:00 AM"
          primaryAction={<Button>Chat with participants</Button>}
          secondaryAction={<Button>View recap</Button>}
        />
        <MeetingsSectionItem
          header="Meeting with John, 10:15 AM to 11:15 AM"
          primaryAction={<Button>Chat with participants</Button>}
          secondaryAction={<Button>View recap</Button>}
        />
      </MeetingsSection>
    </MeetingsPanel>
  );
};

const MeetingsPanel = (props: TreeGridProps) => (
  <TreeGrid aria-label="All meetings" {...props} />
);

type MeetingsSectionProps = {
  header: React.ReactNode;
  action: React.ReactNode;
  children?: React.ReactNode;
};
const MeetingsSection = (props: MeetingsSectionProps) => (
  <TreeGridRow subtree={<>{props.children}</>}>
    <TreeGridCell header>{props.header}</TreeGridCell>
    <TreeGridCell aria-colspan={3}>{props.action}</TreeGridCell>
  </TreeGridRow>
);
type MeetingsSectionItemProps = {
  header: React.ReactNode;
  primaryAction: React.ReactNode;
  secondaryAction: React.ReactNode;
};
const MeetingsSectionItem = (props: MeetingsSectionItemProps) => (
  <TreeGridRow>
    <TreeGridCell header>{props.header}</TreeGridCell>
    <TreeGridCell>{props.primaryAction}</TreeGridCell>
    <TreeGridCell>{props.secondaryAction}</TreeGridCell>
  </TreeGridRow>
);
