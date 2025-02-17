import * as React from 'react';
import { useKeytipRef } from '../../hooks/useKeytipRef';
import type {
  ExecuteKeytipEventHandler,
  KeytipProps,
} from '../Keytip/Keytip.types';
import {
  Button,
  FluentProvider,
  Overflow,
  OverflowItem,
  useMergedRefs,
  useOverflowMenu,
  Menu,
  MenuItem,
  MenuTrigger,
  Toolbar,
  ToolbarButton,
  MenuPopover,
  MenuList,
  Tab,
  TabList,
  Switch,
  Checkbox,
  Link,
  Text,
  SelectTabData,
  SelectTabEvent,
  makeStyles,
  tokens,
  useIsOverflowItemVisible,
  TabValue,
} from '@fluentui/react-components';
import { MoreHorizontal20Filled } from '@fluentui/react-icons';
import { Keytips } from './Keytips';
import type { KeytipsProps } from './Keytips.types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    overflow: 'hidden',
  },

  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '8px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  resizableArea: {
    minWidth: '200px',
    maxWidth: '800px',
    border: `2px solid ${tokens.colorBrandBackground}`,
    padding: '20px 10px 10px 10px',
    position: 'relative',
    resize: 'horizontal',
    '::after': {
      content: `'Resizable Area'`,
      position: 'absolute',
      padding: '1px 4px 1px',
      top: '-2px',
      left: '-2px',
      fontFamily: 'monospace',
      fontSize: '15px',
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '1px',
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});

export const KeytipsBasicExample = (props: KeytipsProps) => {
  const onExecute: ExecuteKeytipEventHandler = (_, { targetElement }) => {
    if (targetElement) targetElement.click();
  };

  const ref = useKeytipRef({
    keySequences: ['a'],
    content: 'A1',
    onExecute,
  });

  return (
    <FluentProvider>
      <Keytips {...props} />
      <Button ref={ref}>Button with Keytip</Button>
    </FluentProvider>
  );
};

export const KeytipsDisabledTargetExample = (props: KeytipsProps) => {
  const onExecute: ExecuteKeytipEventHandler = (_, { targetElement }) => {
    if (targetElement) targetElement.click();
  };

  const disabledKeytipTarget = useKeytipRef({
    keySequences: ['a'],
    content: 'A',
    onExecute,
  });

  const keytipTarget = useKeytipRef({
    keySequences: ['b'],
    content: 'B',
    onExecute,
  });

  return (
    <>
      <Keytips {...props} />
      <Button ref={disabledKeytipTarget} disabled>
        Disabled Button
      </Button>
      <Button ref={keytipTarget}>Normal Button</Button>
    </>
  );
};

export const KeytipsDisabledMenuTargetExample = (props: KeytipsProps) => {
  const onExecute: ExecuteKeytipEventHandler = (_, { targetElement }) => {
    if (targetElement) targetElement.click();
  };

  const keytipMenu = useKeytipRef({
    keySequences: ['a'],
    content: 'A',
    onExecute,
  });

  const keytipMenuDisabled = useKeytipRef<HTMLDivElement>({
    keySequences: ['a', 'b'],
    content: 'B',
    onExecute,
  });

  const keytipMenuEnabled = useKeytipRef<HTMLDivElement>({
    keySequences: ['a', 'c'],
    content: 'C',
    onExecute,
  });

  return (
    <>
      <Keytips {...props} />
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button ref={keytipMenu}>Toggle menu</Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem ref={keytipMenuEnabled}>New </MenuItem>
            <MenuItem disabled ref={keytipMenuDisabled}>
              Open Folder
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

export const KeytipsTabsExample = (props: KeytipsProps) => {
  const [selectedValue, setSelectedValue] = React.useState<TabValue>('1');

  const btnExecute: ExecuteKeytipEventHandler = (_, el) => {
    el.targetElement?.click();
  };

  const onTabSelect = (_: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const refFirstTab = useKeytipRef({
    keySequences: ['a'],
    content: 'A',
    onExecute: btnExecute,
  });

  const refSecondTab = useKeytipRef({
    keySequences: ['b'],
    content: 'B',
    onExecute: btnExecute,
  });

  const checkBoxRef = useKeytipRef<HTMLInputElement>({
    keySequences: ['a', '1'],
    content: '1',
    onExecute: btnExecute,
  });

  const switchRef = useKeytipRef<HTMLInputElement>({
    keySequences: ['a', '2'],
    content: '2',
    onExecute: btnExecute,
  });

  const linkRef = useKeytipRef<HTMLAnchorElement | HTMLSpanElement>({
    keySequences: ['a', '3'],
    content: '3',
    onExecute: btnExecute,
  });

  const btnRef = useKeytipRef({
    keySequences: ['b', '1'],
    content: 'B1',
    onExecute: btnExecute,
  });

  return (
    <>
      <Keytips {...props} />
      <TabList onTabSelect={onTabSelect}>
        <Tab id="1" ref={refFirstTab} value="1">
          First Tab
        </Tab>
        <Tab id="2" ref={refSecondTab} value="2">
          Second Tab
        </Tab>
      </TabList>
      <>
        {selectedValue === '1' && (
          <div role="tabpanel">
            <Checkbox ref={checkBoxRef} label="Checkbox" />
            <Switch ref={switchRef} label="This is a switch" />
            <Text>
              Go to{' '}
              <Link href="https://bing.com" ref={linkRef} target="_blank">
                Bing
              </Link>
            </Text>
          </div>
        )}
        {selectedValue === '2' && (
          <div role="tabpanel">
            <Button ref={btnRef}>Button 2</Button>
          </div>
        )}
      </>
    </>
  );
};

type MenuItemType = KeytipProps & {
  id: string;
  overflowMenuItems?: Array<KeytipProps & { id: string }>;
};

const onExecute: ExecuteKeytipEventHandler = (_, { targetElement }) => {
  if (targetElement) {
    console.info(targetElement);
    targetElement.focus();
    targetElement.click();
  }
};

const menuItems = [
  {
    id: '1',
    keySequences: ['q'],
    content: 'Q',
    onExecute,
  },
  {
    id: '2',
    keySequences: ['w'],
    content: 'W',
    onExecute,
  },
  {
    id: '3',
    keySequences: ['e'],
    content: 'E',
    onExecute,
  },
  {
    id: '4',
    keySequences: ['t'],
    content: 'T',
    onExecute,
  },
  {
    id: '5',
    keySequences: ['y'],
    content: 'Y',
    hasMenu: true,
    onExecute,
    overflowMenuItems: [
      {
        id: '6',
        keySequences: ['y', 'h'],
        content: 'H',
        onExecute,
      },
      { id: '7', keySequences: ['y', 'z'], content: 'Z' },
    ],
  },
] satisfies MenuItemType[];

const OverflowItemWrapper = React.forwardRef<HTMLDivElement, MenuItemType>(
  (keytipProps, ref) => {
    const isVisible = useIsOverflowItemVisible(keytipProps.id);
    const keytipRef = useKeytipRef<HTMLElement>({
      ...keytipProps,
      overflowSequence: !isVisible ? ['r'] : [],
    });
    const mergedRefs = useMergedRefs(ref, keytipRef);

    return (
      <OverflowItem id={keytipProps.id}>
        <ToolbarButton ref={mergedRefs}>Item {keytipProps.id}</ToolbarButton>
      </OverflowItem>
    );
  }
);

const OverflowMenuItemWrapper = React.forwardRef<HTMLDivElement, MenuItemType>(
  ({ overflowMenuItems, ...keytipProps }, ref) => {
    const isVisible = useIsOverflowItemVisible(keytipProps.id);

    const keytipRef = useKeytipRef<HTMLDivElement>({
      ...keytipProps,
      keySequences: !isVisible
        ? ['r', ...keytipProps.keySequences]
        : keytipProps.keySequences,
    });

    const mergedRefs = useMergedRefs(ref, keytipRef);

    if (isVisible) {
      return null;
    }

    return overflowMenuItems && overflowMenuItems.length > 0 ? (
      <Menu key={keytipProps.id}>
        <MenuTrigger disableButtonEnhancement>
          <MenuItem ref={mergedRefs}>Item {keytipProps.id}</MenuItem>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            {overflowMenuItems.map((item) => (
              <OverflowMenuItemWrapper key={item.id} {...item} />
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>
    ) : (
      <MenuItem id={keytipProps.id} ref={mergedRefs}>
        Item {keytipProps.id}
      </MenuItem>
    );
  }
);

const OverflowMenu = ({ menuItems }: { menuItems: MenuItemType[] }) => {
  const { ref, isOverflowing } = useOverflowMenu();

  const menuRef = useKeytipRef<HTMLElement>({
    hasMenu: true,
    keySequences: ['r'],
    content: 'R',
    onExecute,
  });

  const mergedRefs = useMergedRefs(ref, menuRef);

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button
          ref={mergedRefs}
          icon={<MoreHorizontal20Filled />}
          aria-label="More items"
          appearance="subtle"
        />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {menuItems.map(({ id, ...props }) => (
            <OverflowMenuItemWrapper key={id} id={id} {...props} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const KeytipsOverflowMenuExample = (props: KeytipsProps) => {
  return (
    <>
      <Keytips {...props} />
      <div
        style={{
          resize: 'horizontal',
          overflow: 'hidden',
        }}
      >
        <Overflow>
          <Toolbar>
            {menuItems.map(({ id, ...props }) => (
              <OverflowItemWrapper key={id} id={id} {...props} />
            ))}
            <OverflowMenu menuItems={menuItems} />
          </Toolbar>
        </Overflow>
      </div>
    </>
  );
};

export const KeytipsDynamicExample = (props: KeytipsProps) => {
  const classes = useStyles();

  const [currentButton, setCurrentButton] = React.useState('Button 1');
  const startSequence = currentButton === 'Button 1' ? 'A' : 'B';

  const onExecute: ExecuteKeytipEventHandler = (_, { targetElement }) => {
    if (targetElement) targetElement?.click();
  };

  const firstButton = useKeytipRef({
    keySequences: ['a'],
    content: 'A',
    dynamic: true,
    onExecute,
  });

  const secondButton = useKeytipRef({
    keySequences: ['b'],
    content: 'B',
    dynamic: true,
    onExecute,
  });

  const thirdButton = useKeytipRef({
    content: 'C',
    keySequences: [startSequence, 'c'],
  });

  return (
    <>
      <Keytips {...props} />
      <div className={classes.column}>
        <div className={classes.row}>
          <Button
            ref={firstButton}
            onClick={() => {
              setCurrentButton('Button 1');
            }}
          >
            Button 1
          </Button>
          <Button
            ref={secondButton}
            onClick={() => {
              setCurrentButton('Button 2');
            }}
          >
            Button 2
          </Button>
        </div>
        <Button ref={thirdButton}>active button is {currentButton}</Button>
      </div>
    </>
  );
};
