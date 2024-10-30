import * as React from 'react';
import {
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
  Overflow,
  OverflowItem,
  useOverflowMenu,
  useMergedRefs,
  useIsOverflowItemVisible,
  OverflowItemProps,
} from '@fluentui/react-components';
import description from './OverflowMenu.md';

type ItemIds = Array<[string, ReturnType<typeof useKeytipRef>]>;

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    maxWidth: '400px',
    overflow: 'hidden',
  },
});

const onExecute: ExecuteKeytipEventHandler = (_, { targetElement }) => {
  if (targetElement) {
    targetElement?.focus();
    targetElement?.click();
  }
};

const OverflowMenuItem = React.forwardRef<
  HTMLDivElement,
  Pick<OverflowItemProps, 'id'>
>((props, ref) => {
  const { id } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  return <MenuItem ref={ref}>Item {id}</MenuItem>;
});

const SubMenu = React.forwardRef<HTMLDivElement>((_, ref) => {
  const menuRefItem = useKeytipRef<HTMLDivElement>({
    keySequences: ['d', 'y', 'h'],
    content: 'H',
    onExecute,
  });

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem ref={ref}>Overflow Item</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem ref={menuRefItem}>Overflow SubMenu Item</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
});

const OverflowMenu = ({ itemIds }: { itemIds: ItemIds }) => {
  const { ref, overflowCount, isOverflowing } =
    useOverflowMenu<HTMLButtonElement>();

  const menuRefItem = useKeytipRef<HTMLDivElement>({
    keySequences: ['d', 't'],
    content: 'T',
    shortcut: true,
    onExecute: () => {
      console.info('overflow item T');
    },
  });

  const subMenuRef = useKeytipRef<HTMLDivElement>({
    keySequences: ['d', 'y'],
    content: 'Y',
    shortcut: true,
    hasMenu: true,
    onExecute,
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
          {itemIds.map(([id, ref], idx) => {
            return (
              <OverflowMenuItem
                key={id}
                id={id}
                ref={idx === itemIds.length - 1 ? menuRefItem : ref}
              />
            );
          })}
          <SubMenu ref={subMenuRef} />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const OverflowStory = () => {
  const styles = useStyles();

  const firstItemRef = useKeytipRef({
    keySequences: ['q'],
    content: 'Q',
    onExecute,
  });

  const secondItemRef = useKeytipRef({
    keySequences: ['w'],
    content: 'W',
    onExecute,
  });

  const thirdItemRef = useKeytipRef({
    keySequences: ['e'],
    content: 'E',
    onExecute,
  });

  const refs = [firstItemRef, secondItemRef, thirdItemRef];

  const itemIds = new Array(5)
    .fill(0)
    .map((_, i) => [i.toString(), refs[i]]) as ItemIds;

  return (
    <>
      <Overflow>
        <div className={styles.container}>
          {itemIds.map(([i, ref]) => (
            <OverflowItem key={i} id={i}>
              <Button ref={ref}>Item {i}</Button>
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
