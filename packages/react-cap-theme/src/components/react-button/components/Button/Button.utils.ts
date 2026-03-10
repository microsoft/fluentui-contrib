import type {
  ButtonState as BaseButtonState,
  ButtonProps as BaseButtonProps,
} from '@fluentui/react-button';
import type {
  ButtonAppearance,
  ButtonProps,
  ButtonState,
} from './Button.types';

export const baseAppearanceMap: Record<
  ButtonAppearance,
  BaseButtonProps['appearance']
> = {
  secondary: 'secondary',
  primary: 'primary',
  outline: 'outline',
  outlineColor: 'outline',
  subtle: 'subtle',
  transparent: 'transparent',
  tint: 'primary',
};

export const toBaseProps = (props: ButtonProps): BaseButtonProps => ({
  ...props,
  appearance: props.appearance && baseAppearanceMap[props.appearance],
});

export const toBaseState = (state: ButtonState): BaseButtonState => ({
  ...state,
  appearance: baseAppearanceMap[state.appearance] ?? 'secondary',
});
