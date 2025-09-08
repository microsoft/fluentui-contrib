import * as React from 'react';
import { MenuButton } from '@fluentui-contrib/teams-components';
import {
  CalendarRegular,
  CalendarFilled,
  bundleIcon,
} from '@fluentui/react-icons';
import {
  makeStyles,
  tokens,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

const CalendarIcon = bundleIcon(CalendarFilled, CalendarRegular);

const useStyles = makeStyles({
  sampleContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 120px)',
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
      {withMenu(<MenuButton>Menu</MenuButton>)}
      {withMenu(
        <MenuButton icon={{ children: <CalendarIcon /> }}>Menu</MenuButton>
      )}
      {withMenu(<MenuButton icon={<CalendarIcon />} title="Calendar" />)}

      {withMenu(<MenuButton appearance="transparent">Menu</MenuButton>)}
      {withMenu(
        <MenuButton appearance="transparent" icon={<CalendarIcon />}>
          Menu
        </MenuButton>
      )}
      {withMenu(
        <MenuButton
          appearance="transparent"
          icon={<CalendarIcon />}
          title="Calendar"
        />
      )}

      {withMenu(<MenuButton appearance="primary">Menu</MenuButton>)}
      {withMenu(
        <MenuButton appearance="primary" icon={<CalendarIcon />}>
          Menu
        </MenuButton>
      )}
      {withMenu(
        <MenuButton
          appearance="primary"
          icon={<CalendarIcon />}
          title="Calendar"
        />
      )}
    </div>
  );
};

const withMenu = (component: JSXElement) => (
  <Menu positioning={{ autoSize: true }}>
    <MenuTrigger disableButtonEnhancement>{component}</MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem>New </MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem disabled>Open File</MenuItem>
        <MenuItem>Open Folder</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
