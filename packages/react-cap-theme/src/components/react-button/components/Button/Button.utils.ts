import type { ButtonProps as BaseButtonProps } from '@fluentui/react-button';
import type {
  ButtonAppearance,
  ButtonProps,
} from '../../../../customStyleHooks/react-button';

export const baseAppearanceMap: Record<
  ButtonAppearance,
  BaseButtonProps['appearance']
> = {
  secondary: 'secondary',
  primary: 'primary',
  outline: 'outline',
  subtle: 'subtle',
  transparent: 'transparent',
  tint: 'primary',
};

export const toBaseProps = (props: ButtonProps): BaseButtonProps => ({
  ...props,
  appearance: props.appearance && baseAppearanceMap[props.appearance],
});
