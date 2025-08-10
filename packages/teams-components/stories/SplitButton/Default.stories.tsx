import * as React from 'react';
import { SplitButton } from '@fluentui-contrib/teams-components';
import {
  makeStyles,
  tokens,
  Menu,
  MenuPopover,
  MenuList,
  MenuItem,
} from '@fluentui/react-components';
import {
  CalendarRegular,
  CalendarFilled,
  bundleIcon,
} from '@fluentui/react-icons';

const CalendarIcon = bundleIcon(CalendarFilled, CalendarRegular);

const useStyles = makeStyles({
  sampleContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 120px)',
    gap: tokens.spacingHorizontalL,
  },

  evil: {
    background: 'red',
  },
});

export const Default = () => {
  const styles = useStyles();
  return (
    <div className={styles.sampleContainer}>
      <Menu positioning="below-end">
        <SplitButton>Split</SplitButton>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <SplitButton title="Single tooptip">Split</SplitButton>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <SplitButton title="Primary button title" menuTitle="Menu button title">
          Split
        </SplitButton>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <SplitButton
          title="Primary button title"
          menuTitle="Menu button title"
          icon={<CalendarIcon />}
        >
          Split
        </SplitButton>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <SplitButton
          title="Primary button title"
          menuTitle="Menu button title"
          icon={<CalendarIcon />}
        />

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <SplitButton appearance="transparent">Split</SplitButton>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <SplitButton title="Single tooptip" appearance="transparent">
          Split
        </SplitButton>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <SplitButton
          title="Primary button title"
          menuTitle="Menu button title"
          appearance="transparent"
        >
          Split
        </SplitButton>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <SplitButton
          title="Primary button title"
          menuTitle="Menu button title"
          icon={<CalendarIcon />}
          appearance="transparent"
        >
          Split
        </SplitButton>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <SplitButton
          title="Primary button title"
          menuTitle="Menu button title"
          icon={<CalendarIcon />}
          appearance="transparent"
        />

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <SplitButton appearance="primary">Split</SplitButton>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <SplitButton title="Single tooptip" appearance="primary">
          Split
        </SplitButton>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <SplitButton
          title="Primary button title"
          menuTitle="Menu button title"
          appearance="primary"
        >
          Split
        </SplitButton>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <SplitButton
          title="Primary button title"
          menuTitle="Menu button title"
          icon={<CalendarIcon />}
          appearance="primary"
        >
          Split
        </SplitButton>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu positioning="below-end">
        <SplitButton
          title="Primary button title"
          menuTitle="Menu button title"
          icon={<CalendarIcon />}
          appearance="primary"
        />

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
