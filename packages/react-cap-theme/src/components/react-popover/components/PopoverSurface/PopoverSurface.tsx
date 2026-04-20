import type { PopoverSurfaceProps } from '@fluentui/react-popover';
import {
  renderPopoverSurface_unstable,
  usePopoverSurface_unstable,
} from '@fluentui/react-popover';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { usePopoverSurfaceStyles_unstable } from '@fluentui/react-components';
import { usePopoverSurfaceStyles } from '../../../../customStyleHooks/react-popover';

export const PopoverSurface: ForwardRefComponent<PopoverSurfaceProps> =
  React.forwardRef((props, ref) => {
    const state = usePopoverSurface_unstable(props, ref);
    usePopoverSurfaceStyles_unstable(state);
    usePopoverSurfaceStyles(state);

    return renderPopoverSurface_unstable(state);
  });

PopoverSurface.displayName = 'PopoverSurface';
