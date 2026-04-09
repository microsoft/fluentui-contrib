import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import type { ButtonProps } from './Button.types';
import { renderButton } from './renderButton';
import { useButton } from './useButton';
import { useButtonStyles } from './useButtonStyles.styles';

export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef(
  (props, ref) => {
    const state = useButton(props, ref);

    useButtonStyles(state);

    useCustomStyleHook_unstable('useButtonStyles_unstable')(state);

    return renderButton(state);
    // Casting is required due to lack of distributive union to support unions on @types/react
  }
) as ForwardRefComponent<ButtonProps>;

Button.displayName = 'Button';
