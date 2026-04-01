import type { DialogActionsProps } from '@fluentui/react-dialog';
import {
  renderDialogActions_unstable,
  useDialogActions_unstable,
} from '@fluentui/react-dialog';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { useDialogActionsStyles } from './useDialogActionsStyles.styles';

export const DialogActions: ForwardRefComponent<DialogActionsProps> =
  forwardRef((props, ref) => {
    const state = useDialogActions_unstable(props, ref);

    useDialogActionsStyles(state);
    useCustomStyleHook_unstable('useDialogActionsStyles_unstable')(state);

    return renderDialogActions_unstable(state);
  });

DialogActions.displayName = 'DialogActions';
