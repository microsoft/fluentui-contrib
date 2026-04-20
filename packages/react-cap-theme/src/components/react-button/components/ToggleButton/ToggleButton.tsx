import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { renderToggleButton } from './renderToggleButton';
import { useToggleButton } from './useToggleButton';
import { useToggleButtonStyles_unstable } from '@fluentui/react-components';
import { useToggleButtonStyles as useCAPToggleButton } from '../../../../customStyleHooks/react-button';
import type { ToggleButtonProps } from '../../../../customStyleHooks/react-button';
import { toBaseState } from '../../utils/toBaseState';

export const ToggleButton: ForwardRefComponent<ToggleButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useToggleButton(props, ref);

    useToggleButtonStyles_unstable(toBaseState(state));
    useCAPToggleButton(state);

    return renderToggleButton(state);
  }) as ForwardRefComponent<ToggleButtonProps>;

ToggleButton.displayName = 'ToggleButton';
