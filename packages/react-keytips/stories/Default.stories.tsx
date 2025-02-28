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
import description from './Default.md';

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
    console.info(targetElement.getAttribute('aria-keyshortcuts'));
    targetElement.focus();
    targetElement.click();
  }
};

const SplitButtonComponent = () => {
  const splitButton = useKeytipRef({
    keySequences: ['1d'],
    content: '1D',
    onExecute,
  });

  const menuItemA = useKeytipRef<HTMLDivElement>({
    keySequences: ['1d', '1'],
    content: '1',
    onExecute: () => alert('Item A'),
  });

  const menuItemB = useKeytipRef<HTMLDivElement>({
    keySequences: ['1d', '2'],
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
    keySequences: ['1b'],
    content: '1B',
    onExecute,
  });

  const firstMenuItemRef = useKeytipRef<HTMLDivElement>({
    keySequences: ['1b', 'e'],
    content: 'E',
    onExecute,
  });

  const secondMenuItemRef = useKeytipRef<HTMLDivElement>({
    keySequences: ['1b', 'f'],
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
    keySequences: ['1a'],
    content: '1A',
    onExecute,
  });

  const normalButton = useKeytipRef({
    keySequences: ['1c'],
    content: '1C',
    onExecute,
  });

  const compoundButton = useKeytipRef({
    keySequences: ['1e'],
    content: '1E',
    onExecute,
  });

  const offsetButton = useKeytipRef({
    keySequences: ['2ee'],
    positioning: { offset: { crossAxis: -50, mainAxis: 5 } },
    content: '2EE',
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

DefaultStory.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
