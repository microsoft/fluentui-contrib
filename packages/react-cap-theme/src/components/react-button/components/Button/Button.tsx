import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { renderButton } from './renderButton';
import { useButton } from './useButton';
import { useButtonStyles_unstable } from '@fluentui/react-components';
import { useButtonStyles as useCAPButtonStyles } from '../../../../customStyleHooks/react-button';
import type { ButtonProps } from '../../../../customStyleHooks/react-button/';
import { toBaseState } from '../../utils/toBaseState';

export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef(
  (props, ref) => {
    const state = useButton(props, ref);

    useButtonStyles_unstable(toBaseState(state));
    useCAPButtonStyles(state);

    return renderButton(state);
    // Casting is required due to lack of distributive union to support unions on @types/react
  }
) as ForwardRefComponent<ButtonProps>;

Button.displayName = 'Button';
