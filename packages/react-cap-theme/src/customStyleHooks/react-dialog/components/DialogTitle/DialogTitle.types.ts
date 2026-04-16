import type { DialogTitleProps as FluentDialogTitleProps } from '@fluentui/react-dialog';
import type { ButtonProps } from '../../../react-button/components/Button/Button.types';

export type DialogTitleProps = FluentDialogTitleProps & {
  closeButton?: ButtonProps;
};
