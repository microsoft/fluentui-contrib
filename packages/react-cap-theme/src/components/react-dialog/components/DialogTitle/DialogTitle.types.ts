import type { DialogTitleProps as FluentDialogTitleProps } from '@fluentui/react-dialog';
import type { ButtonProps } from '../../../react-button';

export type DialogTitleProps = FluentDialogTitleProps & {
  closeButton?: ButtonProps;
};
