import type { DialogSurfaceProps } from '@fluentui/react-dialog';
import {
  renderDialogSurface_unstable,
  useDialogSurface_unstable,
  useDialogSurfaceContextValues_unstable,
} from '@fluentui/react-dialog';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { forwardRef } from 'react';
import { useDialogSurfaceStyles } from './useDialogSurfaceStyles.styles';

export const DialogSurface: ForwardRefComponent<DialogSurfaceProps> =
  forwardRef((props, ref) => {
    const state = useDialogSurface_unstable(props, ref);
    const contextValues = useDialogSurfaceContextValues_unstable(state);

    useDialogSurfaceStyles(state);
    useCustomStyleHook_unstable('useDialogSurfaceStyles_unstable')(state);

    return renderDialogSurface_unstable(state, contextValues);
  });

DialogSurface.displayName = 'DialogSurface';
