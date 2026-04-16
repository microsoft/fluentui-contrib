import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { renderSplitButton } from './renderSplitButton';
import type { SplitButtonProps } from '../../../../customStyleHooks/react-button/components/SplitButton/SplitButton.types';
import { useSplitButton } from './useSplitButton';
import { useSplitButtonStyles as useCAPSplitButtonStyles } from '../../../../customStyleHooks/react-button/components/SplitButton/useSplitButtonStyles.styles';
import { useSplitButtonStyles_unstable } from '@fluentui/react-components';
import { toBaseState } from '../../utils/toBaseState';

export const SplitButton: ForwardRefComponent<SplitButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useSplitButton(props, ref);
    useSplitButtonStyles_unstable(toBaseState(state));
    useCAPSplitButtonStyles(state);

    return renderSplitButton(state);
  });

SplitButton.displayName = 'SplitButton';
