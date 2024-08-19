import * as React from 'react';
import {
  Keytips,
  KeytipsProps,
  ExecuteKeytipEventHandler,
  useKeytipRef,
} from '@fluentui-contrib/react-keytips';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import {
  makeStyles,
  Button,
  CompoundButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '35px',
  },
  row: {
    display: 'flex',
    alignItems: 'start',
    gap: '16px',
  },
});

const MenuButtonComponent = () => {
  const onExecute: ExecuteKeytipEventHandler = (_, { targetElement }) => {
    if (targetElement) targetElement.click();
  };

  const menuRef = useKeytipRef({
    keySequences: ['2a'],
    content: '2A',
    onExecute,
  });

  const firstMenuItemRef = useKeytipRef<HTMLDivElement>({
    keySequences: ['2a', 'e'],
    content: 'E',
    onExecute,
  });

  const secondMenuItemRef = useKeytipRef<HTMLDivElement>({
    keySequences: ['2a', 'f'],
    content: 'F',
    onExecute,
  });

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton ref={menuRef}>Menu Button</MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem ref={firstMenuItemRef}>Item a</MenuItem>
          <MenuItem ref={secondMenuItemRef}>Item b</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const Default = (props: KeytipsProps) => {
  const classes = useStyles();

  const onExecute: ExecuteKeytipEventHandler = (_, { targetElement }) => {
    if (targetElement) targetElement.click();
  };

  const normalButton = useKeytipRef({
    keySequences: ['b1'],
    content: 'B1',
    onExecute,
  });

  const compoundButton = useKeytipRef({
    keySequences: ['b2'],
    content: 'B2',
    onExecute,
  });

  const splitButton = useKeytipRef({
    keySequences: ['b3'],
    content: 'B3',
    onExecute,
  });

  const offsetButton = useKeytipRef({
    keySequences: ['b4'],
    positioning: { offset: { crossAxis: -50, mainAxis: 5 } },
    content: 'B4',
    onExecute,
  });

  return (
    <>
      <Keytips {...props} />
      <div className={classes.column}>
        <div className={classes.row}>
          <Button ref={normalButton}>Button</Button>
          <CompoundButton
            ref={compoundButton}
            icon={<CalendarMonthRegular />}
            secondaryContent="Keytips"
          >
            Compound Button
          </CompoundButton>
          <MenuButtonComponent />
          <Button ref={splitButton}>Split Button</Button>
        </div>
        <Button ref={offsetButton}>Button with Keytip offset</Button>
      </div>
    </>
  );
};
