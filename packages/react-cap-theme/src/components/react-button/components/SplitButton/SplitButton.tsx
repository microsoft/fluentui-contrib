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
    return renderSplitButton(state);
    // Casting is required due to lack of distributive union to support unions on @types/react
  }) as ForwardRefComponent<SplitButtonProps>;

SplitButton.displayName = 'SplitButton';
