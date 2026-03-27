import type {
  ButtonSlots,
  ButtonProps as BaseButtonProps,
  ButtonState as BaseButtonState,
} from '@fluentui/react-button';
import type { ComponentProps } from '@fluentui/react-utilities';

export type { ButtonSlots } from '@fluentui/react-button';

export type ButtonAppearance =
  | 'primary'
  | 'tint'
  | 'outline'
  | 'secondary'
  | 'subtle'
  | 'transparent';

export type ButtonProps = ComponentProps<ButtonSlots> &
  Pick<
    BaseButtonProps,
    'disabledFocusable' | 'disabled' | 'iconPosition' | 'size'
  > & {
    appearance?: ButtonAppearance;
  };

export type ButtonState = Omit<BaseButtonState, 'appearance'> &
  Required<Pick<ButtonProps, 'appearance'>>;
