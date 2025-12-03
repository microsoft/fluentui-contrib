import type {
  ButtonProps as FluentButtonProps,
  ButtonState as FluentButtonState,
} from '@fluentui/react-components';

export type ButtonAppearance =
  | NonNullable<FluentButtonProps['appearance']>
  | 'tint';

export type ButtonProps = Omit<FluentButtonProps, 'appearance'> & {
  appearance?: ButtonAppearance;
};

export type ButtonState = Omit<FluentButtonState, 'appearance'> & {
  appearance?: ButtonAppearance;
};
