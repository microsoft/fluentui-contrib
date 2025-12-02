import type {
  ButtonProps as FluentButtonProps,
  ButtonState as FluentButtonState,
} from '@fluentui/react-components';

export type ButtonAppearance =
  | NonNullable<FluentButtonProps['appearance']>
  | 'tint';

type ButtonAsButtonProps = Omit<FluentButtonProps, 'appearance' | 'as'> & {
  as?: 'button' | undefined;
  appearance?: ButtonAppearance;
};

type ButtonAsAnchorProps = Omit<FluentButtonProps, 'appearance' | 'as'> & {
  as: 'a';
  appearance?: ButtonAppearance;
};

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

export type ButtonState = Omit<FluentButtonState, 'appearance'> & {
  appearance?: ButtonAppearance;
};
