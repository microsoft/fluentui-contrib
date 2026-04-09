import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { renderSplitButton } from './renderSplitButton';
import type { SplitButtonProps } from './SplitButton.types';
import { useSplitButton } from './useSplitButton';
import { useSplitButtonStyles } from './useSplitButtonStyles.styles';

export const SplitButton: ForwardRefComponent<SplitButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useSplitButton(props, ref);

    useSplitButtonStyles(state);
    useCustomStyleHook_unstable('useSplitButtonStyles_unstable')(state);

    return renderSplitButton(state);
  });

SplitButton.displayName = 'SplitButton';
