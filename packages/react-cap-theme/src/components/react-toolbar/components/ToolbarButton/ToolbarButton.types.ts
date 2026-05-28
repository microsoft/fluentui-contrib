import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type {
  ButtonProps,
  ButtonSlots,
  ButtonState,
} from '../../../react-button';

/**
 * Props for the ToolbarButton component.
 * @alpha
 */
export type ToolbarButtonProps = ComponentProps<ButtonSlots> &
  Partial<
    Pick<ButtonProps, 'appearance' | 'disabled' | 'disabledFocusable'>
  > & {
    vertical?: boolean;
  };

/**
 * State for the ToolbarButton component.
 * @alpha
 */
export type ToolbarButtonState = ComponentState<Partial<ButtonSlots>> &
  ButtonState &
  Required<Pick<ToolbarButtonProps, 'vertical'>>;
