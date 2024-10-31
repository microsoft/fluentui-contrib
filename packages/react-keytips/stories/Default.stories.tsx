import * as React from 'react';
import {
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
  SplitButton,
  MenuButtonProps,
  useMergedRefs,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  splitButtonWrapper: {
    display: 'flex',
    minWidth: 'min-content',
  },
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

const onExecute: ExecuteKeytipEventHandler = (_, { targetElement }) => {
  if (targetElement) {
    targetElement.click();
  }
};

const SplitButtonComponent = () => {
  const splitButton = useKeytipRef({
    keySequences: ['b3'],
    content: 'B3',
    onExecute,
  });

  const menuItemA = useKeytipRef<HTMLDivElement>({
    keySequences: ['b3', '1'],
    content: '1',
    onExecute: () => alert('Item A'),
  });

  const menuItemB = useKeytipRef<HTMLDivElement>({
    keySequences: ['b3', '2'],
    content: '2',
    onExecute: () => alert('Item B'),
  });

  return (
    <Menu positioning="below-end">
      <MenuTrigger disableButtonEnhancement>
        {(triggerProps: MenuButtonProps) => (
          <SplitButton
            menuButton={{
              ...triggerProps,
              // @ts-expect-error ref exists
              ref: useMergedRefs(splitButton, triggerProps.ref),
            }}
          >
            Split Button
          </SplitButton>
        )}
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem ref={menuItemA}>Item a</MenuItem>
          <MenuItem ref={menuItemB}>Item b</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const MenuButtonComponent = () => {
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

export const DefaultStory = () => {
  const classes = useStyles();

  const disabledButton = useKeytipRef({
    keySequences: ['b0'],
    content: 'B0',
    onExecute,
  });

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

  const offsetButton = useKeytipRef({
    keySequences: ['b4'],
    positioning: { offset: { crossAxis: -50, mainAxis: 5 } },
    content: 'B4',
    onExecute,
  });

  return (
    <>
      <div className={classes.column}>
        <div className={classes.row}>
          <Button ref={disabledButton} disabled>
            Disabled Button
          </Button>
          <Button ref={normalButton}>Button</Button>
          <CompoundButton
            ref={compoundButton}
            icon={<CalendarMonthRegular />}
            secondaryContent="Keytips"
          >
            Compound Button
          </CompoundButton>
          <MenuButtonComponent />
          <SplitButtonComponent />
        </div>
        <Button ref={offsetButton}>Button with Keytip offset</Button>
      </div>
    </>
  );
};
