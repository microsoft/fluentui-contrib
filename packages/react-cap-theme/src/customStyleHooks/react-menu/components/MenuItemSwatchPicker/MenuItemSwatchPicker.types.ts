import type { MenuItemSelectableProps } from '@fluentui/react-menu';
import type { SwatchPickerProps } from '@fluentui/react-swatch-picker';

export type MenuItemSwatchPickerProps = Pick<MenuItemSelectableProps, 'name'> &
  SwatchPickerProps;
