import * as React from 'react';
import {
  Keytips,
  ExecuteKeytipEventHandler,
  useKeytipRef,
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
  OverflowItem,
  OverflowItemProps,
  useIsOverflowItemVisible,
  useOverflowMenu,
  useMergedRefs,
} from '@fluentui/react-components';

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
  el.targetElement.click();
};

const SubMenu = () => {
  const menuRef = useKeytipRef<HTMLDivElement>({
    keySequences: ['a', 'b'],
    content: 'B',
    onExecute,
  });

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem ref={menuRef}>Sub Menu</MenuItem>
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
};

const OverflowMenuItem: React.FC<Pick<OverflowItemProps, 'id'>> = (props) => {
  const { id } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  // As an union between button props and div props may be conflicting, casting is required
  return <MenuItem>Item {id}</MenuItem>;
};

const OverflowMenu: React.FC<{ itemIds: string[] }> = ({ itemIds }) => {
  const { ref, overflowCount, isOverflowing } =
    useOverflowMenu<HTMLButtonElement>();

  const menuRef = useKeytipRef({
    keySequences: ['a'],
    content: 'A',
    hasDynamicChildren: true,
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
      <Keytips />
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
