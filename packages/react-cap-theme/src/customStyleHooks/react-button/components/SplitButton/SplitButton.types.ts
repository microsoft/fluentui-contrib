import type { Button, MenuButton } from '@fluentui/react-button';
import type {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-utilities';
import type { ButtonProps, ButtonState } from '../../Button';
import type { MenuButtonProps, MenuButtonState } from '../../MenuButton';

export type SplitButtonSlots = {
  root: NonNullable<Slot<'div'>>;
  menuButton?: Slot<typeof MenuButton>;
  primaryActionButton?: Slot<typeof Button>;
};

export type SplitButtonProps = ComponentProps<SplitButtonSlots> &
  Omit<ButtonProps, 'root' | 'as'> &
  Omit<MenuButtonProps, 'root' | 'as'>;

export type SplitButtonState = ComponentState<SplitButtonSlots> &
  Omit<ButtonState, 'components' | 'iconOnly' | 'root'> &
  Omit<MenuButtonState, 'components' | 'iconOnly' | 'root'>;
