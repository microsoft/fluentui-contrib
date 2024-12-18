import { type KeytipProps } from '@fluentui-contrib/react-keytips';

export type MenuItemType = {
  id: string;
  name: string;
  icon?: JSX.Element;
  menuItems?: MenuItemType[];
  keytipProps: KeytipProps;
  disabled?: boolean;
  renderName?: boolean;
};
