import type {
  ToggleButtonProps as BaseToggleButtonProps,
  ToggleButtonState as BaseToggleButtonState,
} from '@fluentui/react-button';
import type { ButtonProps } from '../../Button';

export type ToggleButtonProps = ButtonProps &
  Pick<BaseToggleButtonProps, 'defaultChecked' | 'checked'>;

export type ToggleButtonState = BaseToggleButtonState &
  Required<Pick<ToggleButtonProps, 'checked'>>;
