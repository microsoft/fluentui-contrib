import {
  renderDialogTitle_unstable,
  useDialogTitleStyles_unstable,
} from '@fluentui/react-dialog';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { useDialogTitle } from './useDialogTitle';
import { useDialogTitleStyles as useCAPDialogTitleStyles } from '../../../../customStyleHooks/react-dialog';
import type { DialogTitleProps } from '../../../../customStyleHooks/react-dialog';

export const DialogTitle: ForwardRefComponent<DialogTitleProps> = forwardRef(
  (props, ref) => {
    const state = useDialogTitle(props, ref);

    useDialogTitleStyles_unstable(state);
    useCAPDialogTitleStyles(state);

    return renderDialogTitle_unstable(state);
  }
);

DialogTitle.displayName = 'DialogTitle';
