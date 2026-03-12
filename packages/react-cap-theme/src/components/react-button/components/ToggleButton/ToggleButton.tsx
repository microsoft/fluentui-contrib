import {
  useButtonStyles_unstable,
  useToggleButtonStyles_unstable,
} from '@fluentui/react-button';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';

import { toBaseState } from '../Button/Button.utils';
import { renderToggleButton } from './renderToggleButton';
import type { ToggleButtonProps } from './ToggleButton.types';
import { useToggleButton } from './useToggleButton';
import { useToggleButtonStyles } from './useToggleButtonStyles.styles';

export const ToggleButton: ForwardRefComponent<ToggleButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useToggleButton(props, ref);
    const baseState = toBaseState(state);
    useButtonStyles_unstable(baseState);
    useToggleButtonStyles_unstable({
      ...baseState,
      checked: state.checked,
    });
    useToggleButtonStyles(state);
    return renderToggleButton(state);
  }) as ForwardRefComponent<ToggleButtonProps>;
ToggleButton.displayName = 'ToggleButton';
