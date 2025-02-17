import * as React from 'react';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarToggleButton,
  ToolbarMenuButton,
} from '@fluentui-contrib/teams-components';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from '@fluentui/react-components';
import {
  bundleIcon,
  PeopleAddRegular,
  PeopleAddFilled,
  AddRegular,
  AddFilled,
  TextEditStyleRegular,
  TextEditStyleFilled,
  EmojiRegular,
  EmojiFilled,
  PenSparkleRegular,
  PenSparkleFilled,
  SendRegular,
  SendFilled,
  DeviceEqRegular,
  DeviceEqFilled,
  DocumentEditFilled,
  DocumentEditRegular,
  MoreHorizontalRegular,
  MoreHorizontalFilled,
  DocumentOnePageMultipleRegular,
  DocumentOnePageMultipleFilled,
} from '@fluentui/react-icons';

const PeopleAddIcon = bundleIcon(PeopleAddFilled, PeopleAddRegular);
const AddIcon = bundleIcon(AddFilled, AddRegular);
const TextEditStyleIcon = bundleIcon(TextEditStyleFilled, TextEditStyleRegular);
const EmojiIcon = bundleIcon(EmojiFilled, EmojiRegular);
const PenSparkleIcon = bundleIcon(PenSparkleFilled, PenSparkleRegular);
const SendIcon = bundleIcon(SendFilled, SendRegular);
const DeviceEqIcon = bundleIcon(DeviceEqFilled, DeviceEqRegular);
const DocumentEditIcon = bundleIcon(DocumentEditFilled, DocumentEditRegular);
const MoreHorizontalIcon = bundleIcon(
  MoreHorizontalFilled,
  MoreHorizontalRegular
);
const DocumentOnePageMultipleIcon = bundleIcon(
  DocumentOnePageMultipleFilled,
  DocumentOnePageMultipleRegular
);

export const Default = () => {
  return (
    <>
      <EditorToolbar />
      <GroupChatHeader />
    </>
  );
};

export const EditorToolbar = () => {
  const [toggle, setToggle] = React.useState(false);
  return (
    <Toolbar>
      <ToolbarToggleButton
        checked={toggle}
        onClick={() => setToggle((s) => !s)}
        appearance="transparent"
        icon={<TextEditStyleIcon />}
        title="Show formatting options"
      />
      <Menu>
        <MenuTrigger>
          <ToolbarMenuButton
            appearance="transparent"
            icon={<EmojiIcon />}
            title="Emojis, GIFs and Stickers"
          />
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Emoji</MenuItem>
            <MenuItem>GIF</MenuItem>
            <MenuItem>Sticker</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <ToolbarButton
        appearance="transparent"
        icon={<PenSparkleIcon />}
        title="Rewrite with copilot"
      />
      <Menu>
        <MenuTrigger>
          <ToolbarMenuButton
            appearance="transparent"
            icon={<AddIcon />}
            title="Actions and apps"
          />
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Attach file</MenuItem>
            <MenuItem>Schedule message</MenuItem>
            <MenuItem>Set delivery options</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <ToolbarDivider />
      <ToolbarButton
        appearance="transparent"
        icon={<SendIcon />}
        title="Send message"
      />
    </Toolbar>
  );
};

export const GroupChatHeader = () => {
  const [toggleNotes, setToggleNotes] = React.useState(false);
  const [toggleAINotes, setToggleAINotes] = React.useState(false);
  return (
    <Toolbar>
      <ToolbarButton appearance="transparent" icon={<DeviceEqIcon />}>
        Meet now
      </ToolbarButton>
      <Menu>
        <MenuTrigger>
          <ToolbarMenuButton
            title="Add people, agents and bots"
            appearance="transparent"
            icon={<PeopleAddIcon />}
          >
            72
          </ToolbarMenuButton>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Max Mustermann</MenuItem>
            <MenuItem>Jane Doe</MenuItem>
            <MenuItem>Pierre Dupont</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <ToolbarDivider />
      <ToolbarToggleButton
        checked={toggleAINotes}
        onClick={() => setToggleAINotes((s) => !s)}
        appearance="transparent"
        icon={<DocumentOnePageMultipleIcon />}
        title="Open AI notes"
      />
      <ToolbarToggleButton
        checked={toggleNotes}
        onClick={() => setToggleNotes((s) => !s)}
        appearance="transparent"
        icon={<DocumentEditIcon />}
        title="Open notes"
      />
      <Menu>
        <MenuTrigger>
          <ToolbarMenuButton
            title="More chat options"
            appearance="transparent"
            icon={<MoreHorizontalIcon />}
          />
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Mark as unread</MenuItem>
            <MenuItem>Mute</MenuItem>
            <MenuItem>Leave</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </Toolbar>
  );
};
