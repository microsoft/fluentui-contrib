'use client';

import * as React from 'react';
import {
  renderButton_unstable,
  useButtonStyles_unstable,
  useButton_unstable,
  type ButtonProps as FluentButtonProps,
  type ButtonState as FluentButtonState,
} from '@fluentui/react-components';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type {
  ButtonAppearance,
  ButtonProps,
  ButtonState,
} from './Button.types';


/**
 * Buttons give people a way to trigger an action.
 */
export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef(
  (props, ref) => {
    const state = useButton_unstable(
      props as FluentButtonProps,
      ref
    ) as ButtonState;

    useButtonStyles_unstable(state as FluentButtonState);
    useCustomStyleHook_unstable('useButtonStyles_unstable')(
      state as FluentButtonState
    );

    return renderButton_unstable(state as FluentButtonState);
  }
) as ForwardRefComponent<ButtonProps>;

Button.displayName = 'Button';

export type {
  ButtonAppearance,
  ButtonProps,
  ButtonState,
} from './Button.types';

export { BUTTON_APPEARANCES } from './Button.types';
