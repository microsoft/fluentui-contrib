import * as React from 'react';
import {
  Menu,
  useMergedRefs,
  MenuList,
  MenuItem,
  MenuPopover,
  MenuTrigger,
  SplitButton,
  type SplitButtonProps,
  type MenuButtonProps,
} from '@fluentui/react-components';
import { MailRegular } from '@fluentui/react-icons';
import { homeKeytips as keytipsMap } from '../keytipsMap';
import {
  useKeytipRef,
  type KeytipProps,
} from '@fluentui-contrib/react-keytips';

const menuItems = [
  'Event',
  'Group',
  'Storyline post',
  'Newsletter',
  'Document',
  'Spreadsheet',
  'Presentation',
];

const MenuItemWrapper = ({
  children,
  keytipProps,
}: React.PropsWithChildren<{ keytipProps: KeytipProps }>) => {
  const keytipRef = useKeytipRef<HTMLDivElement>(keytipProps);

  return <MenuItem ref={keytipRef}>{children}</MenuItem>;
};

export const EmailMenu = React.forwardRef<
  HTMLButtonElement,
  SplitButtonProps & { isOverflowing?: boolean }
>((props, ref) => {
  const keytipRef = useKeytipRef(keytipsMap.newMail);

  return (
    <Menu positioning="below-end">
      <MenuTrigger disableButtonEnhancement>
        {(
          triggerProps: MenuButtonProps & { ref: React.Ref<HTMLButtonElement> }
        ) => (
          <SplitButton
            ref={ref}
            appearance="primary"
            icon={<MailRegular />}
            menuButton={{
              ...triggerProps,
              ref: useMergedRefs(triggerProps.ref, keytipRef),
            }}
            {...props}
          >
            New mail
          </SplitButton>
        )}
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {menuItems.map((item, idx) => (
            <MenuItemWrapper
              keytipProps={keytipsMap.newMailMenu[idx]}
              key={idx}
            >
              {item}
            </MenuItemWrapper>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
});
