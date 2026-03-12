import type { MenuButtonSlots } from '@fluentui/react-button';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonState, ButtonSlots } from '../../Button';

export type { MenuButtonSlots } from '@fluentui/react-button';

export type MenuButtonProps = ComponentProps<MenuButtonSlots> &
  Pick<ButtonProps, 'appearance' | 'disabled' | 'disabledFocusable' | 'size'>;

export type MenuButtonState = ComponentState<MenuButtonSlots> &
  Omit<ButtonState, keyof ButtonSlots | 'components'>;
