import { type KeytipProps } from '@fluentui-contrib/react-keytips';
import type { JSXElement } from '@fluentui/react-components';

export type MenuItemType = {
  id: string;
  name: string;
  icon?: JSXElement;
  menuItems?: MenuItemType[];
  keytipProps: KeytipProps;
  disabled?: boolean;
  renderName?: boolean;
};
