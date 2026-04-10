import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';

import { renderToggleButton } from './renderToggleButton';
import type { ToggleButtonProps } from './ToggleButton.types';
import { useToggleButton } from './useToggleButton';
import { useToggleButtonStyles } from './useToggleButtonStyles.styles';

export const ToggleButton: ForwardRefComponent<ToggleButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useToggleButton(props, ref);
    useToggleButtonStyles(state);
    useCustomStyleHook_unstable('useToggleButtonStyles_unstable')(state);

    return renderToggleButton(state);
  }) as ForwardRefComponent<ToggleButtonProps>;

ToggleButton.displayName = 'ToggleButton';
