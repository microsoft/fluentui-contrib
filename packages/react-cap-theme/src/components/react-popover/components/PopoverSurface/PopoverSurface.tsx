import type { PopoverSurfaceProps } from '@fluentui/react-popover';
import {
  renderPopoverSurface_unstable,
  usePopoverSurface_unstable,
} from '@fluentui/react-popover';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { usePopoverSurfaceStyles_unstable } from './usePopoverSurfaceStyles.styles';

export const PopoverSurface: ForwardRefComponent<PopoverSurfaceProps> =
  React.forwardRef((props, ref) => {
    const state = usePopoverSurface_unstable(props, ref);

    usePopoverSurfaceStyles_unstable(state);
    useCustomStyleHook_unstable('usePopoverSurfaceStyles_unstable')(state);

    return renderPopoverSurface_unstable(state);
  });

PopoverSurface.displayName = 'PopoverSurface';
