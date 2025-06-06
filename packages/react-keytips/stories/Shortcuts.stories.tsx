import * as React from 'react';
import {
  ExecuteKeytipEventHandler,
  useKeytipRef,
  KeytipProps,
} from '@fluentui-contrib/react-keytips';
import {
  Toolbar,
  ToolbarButton,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Overflow,
  OverflowItem,
  useOverflowMenu,
  useMergedRefs,
  useIsOverflowItemVisible,
} from '@fluentui/react-components';
import description from './Shortcuts.md';
import { MoreHorizontal20Filled } from '@fluentui/react-icons';

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

export const ShortcutStory = () => {
  return (
    <React.StrictMode>
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
    </React.StrictMode>
  );
};

ShortcutStory.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
