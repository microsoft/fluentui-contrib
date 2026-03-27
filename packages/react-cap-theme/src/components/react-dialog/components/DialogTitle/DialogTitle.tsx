import { renderDialogTitle_unstable } from '@fluentui/react-dialog';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import type { DialogTitleProps } from './DialogTitle.types';
import { useDialogTitle } from './useDialogTitle';
import { useDialogTitleStyles } from './useDialogTitleStyles.styles';

export const DialogTitle: ForwardRefComponent<DialogTitleProps> = forwardRef(
  (props, ref) => {
    const state = useDialogTitle(props, ref);

    useDialogTitleStyles(state);
    useCustomStyleHook_unstable('useDialogTitleStyles_unstable')(state);

    return renderDialogTitle_unstable(state);
  }
);

DialogTitle.displayName = 'DialogTitle';
