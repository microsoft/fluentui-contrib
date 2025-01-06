import * as React from 'react';
import { useKeytipRef } from '../../hooks/useKeytipRef';
import type { ExecuteKeytipEventHandler } from '../Keytip/Keytip.types';
import {
  Button,
  FluentProvider,
  Overflow,
  OverflowItem,
  OverflowItemProps,
  useMergedRefs,
  mergeClasses,
  useOverflowMenu,
  Menu,
  MenuItem,
  MenuTrigger,
  MenuButton,
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

const SubMenu = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem ref={ref}>Sub Menu</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>8</MenuItem>
          <MenuItem>9</MenuItem>
          <MenuItem>10</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
});

const OverflowMenuItem: React.FC<Pick<OverflowItemProps, 'id'>> = (props) => {
  const { id } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  return <MenuItem>Item {id}</MenuItem>;
};

const OverflowMenu: React.FC<{ itemIds: string[] }> = ({ itemIds }) => {
  const { ref, overflowCount, isOverflowing } =
    useOverflowMenu<HTMLButtonElement>();

  const onExecute: ExecuteKeytipEventHandler = (_, el) => {
    el.targetElement?.click();
  };

  const menuRef = useKeytipRef({
    keySequences: ['a'],
    content: 'A',
    dynamic: true,
    onExecute,
  });

  const subMenuRef = useKeytipRef<HTMLDivElement>({
    keySequences: ['a', 'b'],
    content: 'B',
    hasMenu: true,
    isShortcut: true,
    onExecute,
  });

  const mergedRefs = useMergedRefs(ref, menuRef);

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton ref={mergedRefs}>+{overflowCount} items</MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {itemIds.map((i) => {
            return <OverflowMenuItem key={i} id={i} />;
          })}
          <SubMenu ref={subMenuRef} />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const KeytipsOverflowMenuExample = (props: KeytipsProps) => {
  const styles = useStyles();

  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());

  return (
    <>
      <Keytips {...props} />
      <Overflow>
        <div className={mergeClasses(styles.container, styles.resizableArea)}>
          {itemIds.map((i) => (
            <OverflowItem key={i} id={i}>
              <Button>Item {i}</Button>
            </OverflowItem>
          ))}
          <OverflowMenu itemIds={itemIds} />
        </div>
      </Overflow>
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
