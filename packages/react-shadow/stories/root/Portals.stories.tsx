import { root } from '@fluentui-contrib/react-shadow';
import {
  Button,
  makeStyles,
  Menu,
  MenuList,
  MenuItem,
  MenuPopover,
  MenuTrigger,
  shorthands,
  tokens,
  Tooltip,
} from '@fluentui/react-components';
import * as React from 'react';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    ...shorthands.gap('5px'),
    ...shorthands.padding('5px'),
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
    ...shorthands.border('3px', 'solid', tokens.colorBrandBackground2),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
});

const ComponentSet: React.FC = () => {
  const classes = useClasses();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Menu>
          <MenuTrigger>
            <Button>ToggleMenu</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>New</MenuItem>
              <MenuItem>Open</MenuItem>
              <MenuItem>Save</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Tooltip content="Hello world!" relationship="label">
          <Button>A button with a tooltip</Button>
        </Tooltip>
      </div>
    </div>
  );
};

export const Portals = () => (
  <div
    style={{
      border: '3px dotted orange',
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}
  >
    <div style={{ border: '3px dotted grey', padding: 10, paddingTop: 0 }}>
      <h1>Light DOM</h1>
      <ComponentSet />
    </div>

    <root.div>
      <div style={{ border: '3px dotted grey', padding: 10, paddingTop: 0 }}>
        <h1>Shadow DOM</h1>
        <ComponentSet />
      </div>
    </root.div>
  </div>
);
