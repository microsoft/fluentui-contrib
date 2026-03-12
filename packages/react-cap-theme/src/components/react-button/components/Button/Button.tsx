import { useButtonStyles_unstable } from '@fluentui/react-button';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import type { ButtonProps } from './Button.types';
import { toBaseState } from './Button.utils';
import { renderButton } from './renderButton';
import { useButton } from './useButton';
import { useButtonStyles } from './useButtonStyles.styles';

export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef(
  (props, ref) => {
    const state = useButton(props, ref);
    useButtonStyles_unstable(toBaseState(state));
    useButtonStyles(state);
    return renderButton(state);
    // Casting is required due to lack of distributive union to support unions on @types/react
  }
) as ForwardRefComponent<ButtonProps>;

Button.displayName = 'Button';
