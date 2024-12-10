import * as React from 'react';
import {
  ExecuteKeytipEventHandler,
  useKeytipRef,
  useMenuShortcut,
} from '@fluentui-contrib/react-keytips';
import {
  makeStyles,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuButton,
  tokens,
  mergeClasses,
  Overflow,
  OverflowItemProps,
  OverflowItem,
  useIsOverflowItemVisible,
  useOverflowMenu,
  useMergedRefs,
} from '@fluentui/react-components';
import description from './OverflowMenu.md';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    overflow: 'hidden',
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

const onExecute: ExecuteKeytipEventHandler = (_, el) => {
  el.targetElement?.click();
};

const SubMenuSecond = () => {
  const subMenuRef = useKeytipRef<HTMLDivElement>({
    keySequences: ['d', 'bb', 'cc'],
    content: 'CC',
    dynamic: true,
    onExecute,
  });

  const subMenuItemRef = useKeytipRef<HTMLDivElement>({
    keySequences: ['d', 'bb', 'cc', 'cz'],
    content: 'CZ',
    onExecute,
  });

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem ref={subMenuRef}>Sub Menu</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem ref={subMenuItemRef}>11</MenuItem>
          <MenuItem>12</MenuItem>
          <MenuItem>13</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const SubMenu = () => {
  const subMenuRef = useKeytipRef<HTMLDivElement>({
    keySequences: ['d', 'bb'],
    content: 'BB',
    dynamic: true,
    onExecute,
  });

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem ref={subMenuRef}>Sub Menu</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>8</MenuItem>
          <MenuItem>9</MenuItem>
          <MenuItem>10</MenuItem>
          <SubMenuSecond />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const OverflowMenuItem = (props: Pick<OverflowItemProps, 'id'>) => {
  const { id } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  return <MenuItem>Item {id}</MenuItem>;
};

const OverflowMenu = ({ itemIds }: { itemIds: string[] }) => {
  const { ref, overflowCount, isOverflowing } =
    useOverflowMenu<HTMLButtonElement>();

  useMenuShortcut({
    shortcut: 'bb',
    dependentKeys: ['d'],
  });

  useMenuShortcut({
    shortcut: 'cc',
    dependentKeys: ['d', 'bb'],
  });

  const menuRef = useKeytipRef({
    keySequences: ['d'],
    content: 'D',
    dynamic: true,
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
          <SubMenu />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const OverflowStory = () => {
  const styles = useStyles();

  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());

  return (
    <>
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

OverflowStory.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
