import * as React from 'react';
import {
  ExecuteKeytipEventHandler,
  useKeytipRef,
  KeytipProps,
} from '@fluentui-contrib/react-keytips';
import {
  makeStyles,
  mergeClasses,
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
  tokens,
  useIsOverflowItemVisible,
} from '@fluentui/react-components';
import description from './Shortcuts.md';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    maxWidth: '300px',
    overflow: 'hidden',
  },
});

const onExecute: ExecuteKeytipEventHandler = (_, { targetElement }) => {
  if (targetElement) {
    console.info(targetElement);
    targetElement.focus();
    targetElement.click();
  }
};

const menuItems = {
  Q: { id: '1', keySequences: ['q'], content: 'Q', onExecute },
  W: { id: '2', keySequences: ['w'], content: 'W', onExecute },
  E: { id: '3', keySequences: ['e'], content: 'E', onExecute },
  R: { id: '4', keySequences: ['r'], content: 'R', onExecute },
  T: { id: '5', keySequences: ['t'], content: 'T', onExecute },
};

const OverflowItemWrapper = React.forwardRef<
  HTMLDivElement,
  { keytipProps: KeytipProps & { id: string } }
>(({ keytipProps }, ref) => {
  const keytipRef = useKeytipRef<HTMLElement>(keytipProps);

  const mergedRefs = useMergedRefs(ref, keytipRef);

  return (
    <OverflowItem id={keytipProps.id}>
      <Button ref={mergedRefs}>Item {keytipProps.id}</Button>
    </OverflowItem>
  );
});

const OverflowMenuItemWrapper = React.forwardRef<
  HTMLDivElement,
  { keytipProps: KeytipProps & { id: string } }
>(({ keytipProps }, ref) => {
  const isVisible = useIsOverflowItemVisible(keytipProps.id);

  const keytipRef = useKeytipRef<HTMLDivElement>({
    ...keytipProps,
    isShortcut: !isVisible,
    keySequences: !isVisible
      ? ['d', ...keytipProps.keySequences]
      : keytipProps.keySequences,
  });

  const mergedRefs = useMergedRefs(ref, keytipRef);

  if (isVisible) {
    return null;
  }

  return (
    <MenuItem id={keytipProps.id} ref={mergedRefs}>
      Item {keytipProps.id}
    </MenuItem>
  );
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

const OverflowMenu = ({
  menuItems,
}: {
  menuItems: Record<string, KeytipProps & { id: string }>;
}) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu();

  const menuRef = useKeytipRef<HTMLElement>({
    keySequences: ['d'],
    content: 'D',
    onExecute,
  });

  const subMenuRef = useKeytipRef<HTMLDivElement>({
    keySequences: ['d', 'y'],
    content: 'Y',
    isShortcut: true,
    hasMenu: true,
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
          {Object.values(menuItems).map((keytipProps) => (
            <OverflowMenuItemWrapper
              key={keytipProps.id}
              keytipProps={keytipProps}
            />
          ))}
          <SubMenu ref={subMenuRef} />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const ShortcutStory = () => {
  const styles = useStyles();

  return (
    <Overflow minimumVisible={2}>
      <div className={styles.container}>
        {Object.entries(menuItems).map(([, props]) => (
          <OverflowItemWrapper key={props.id} keytipProps={props} />
        ))}
        <OverflowMenu menuItems={menuItems} />
      </div>
    </Overflow>
  );
};

ShortcutStory.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
