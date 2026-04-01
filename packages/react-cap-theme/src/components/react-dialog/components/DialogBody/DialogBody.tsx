import type { DialogBodyProps } from '@fluentui/react-dialog';
import {
  renderDialogBody_unstable,
  useDialogBody_unstable,
} from '@fluentui/react-dialog';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { useDialogBodyStyles } from './useDialogBodyStyles.styles';

export const DialogBody: ForwardRefComponent<DialogBodyProps> = forwardRef(
  (props, ref) => {
    const state = useDialogBody_unstable(props, ref);

    useDialogBodyStyles(state);
    useCustomStyleHook_unstable('useDialogBodyStyles_unstable')(state);

    return renderDialogBody_unstable(state);
  }
);

DialogBody.displayName = 'DialogBody';
