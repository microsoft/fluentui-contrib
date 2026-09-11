import type {
  ToggleButtonProps as BaseToggleButtonProps,
  ToggleButtonState as BaseToggleButtonState,
} from '@fluentui/react-button';
import type { ButtonProps } from '../../Button';

export type ToggleButtonProps = ButtonProps &
  Omit<BaseToggleButtonProps, 'appearance'>;

export type ToggleButtonState = BaseToggleButtonState &
  Required<Pick<ToggleButtonProps, 'checked'>>;
