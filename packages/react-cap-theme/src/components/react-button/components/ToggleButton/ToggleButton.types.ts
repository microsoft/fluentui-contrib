import type { ToggleButtonProps as BaseToggleButtonProps } from '@fluentui/react-button';
import type { ButtonProps, ButtonState } from '../../Button';

export type ToggleButtonProps = ButtonProps &
  Pick<BaseToggleButtonProps, 'defaultChecked' | 'checked'>;

export type ToggleButtonState = ButtonState &
  Required<Pick<ToggleButtonProps, 'checked'>>;
