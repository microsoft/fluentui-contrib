import * as React from 'react';
import {
  mergeCallbacks,
  useMergedRefs,
  Button,
  SplitButton,
  Menu,
  MenuList,
  MenuPopover,
  MenuItem,
  MenuTrigger,
  type MenuButtonProps,
} from '@fluentui/react-components';
import {
  useKeytipRef,
  type KeytipProps,
} from '@fluentui-contrib/react-keytips';
import type { MenuItemType } from './shared.types';

const MenuItemWrapper = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{
    keytipProps: KeytipProps;
    id: string;
  }>
>(({ keytipProps, id, children, ...props }, ref) => {
  const keytipRef = useKeytipRef<HTMLDivElement>(keytipProps);

  const mergedRefs = useMergedRefs(ref, keytipRef);

  return (
    <MenuItem id={id} ref={mergedRefs} {...props}>
      {children}
    </MenuItem>
  );
});

export const OverflowItemCustom = React.forwardRef<
  HTMLButtonElement,
  MenuItemType
>(
  (
    { id, menuItems, renderName = true, keytipProps, icon, name, ...props },
    ref
  ) => {
    const keytipRef = useKeytipRef(keytipProps);
    const mergedRefs = useMergedRefs(ref, keytipRef);

    if (menuItems && menuItems.length > 0)
      return (
        <Menu positioning="below-end">
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps: MenuButtonProps) => (
              <SplitButton
                ref={mergedRefs}
                icon={icon}
                menuButton={{
                  ...triggerProps,
                  // @ts-expect-error ref does not exist on triggerProps type
                  ref: mergeCallbacks(triggerProps.ref, keytipRef),
                }}
                {...props}
              >
                {name}
              </SplitButton>
            )}
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {menuItems.map(({ name, ...props }, idx) => (
                <MenuItemWrapper key={idx} icon={icon} {...props}>
                  {name}
                </MenuItemWrapper>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      );

    return (
      <Button
        id={id}
        icon={icon}
        ref={mergedRefs}
        {...props}
        appearance="subtle"
      >
        {renderName ? name : ''}
      </Button>
    );
  }
);
