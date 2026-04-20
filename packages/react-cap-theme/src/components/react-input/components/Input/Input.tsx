import { forwardRef } from 'react';
import {
  renderInput_unstable,
  useInputStyles_unstable,
} from '@fluentui/react-input';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useInput } from './useInput';
import type { InputProps } from '../../../../customStyleHooks/react-input';
import { useInputStyles as useCAPInputStyles } from '../../../../customStyleHooks/react-input';

/**
 * The Input component allows people to enter and edit text.
 *
 * @example
 * ```tsx
 * <Input placeholder='Your email address' value='JohnSmith' contentAfter='@outlook.com' />
 * ```
 *
 * @alpha
 */
export const Input: ForwardRefComponent<InputProps> = forwardRef(
  (props, ref) => {
    const state = useInput(props, ref);

    useInputStyles_unstable(state);
    useCAPInputStyles(state);

    return renderInput_unstable(state);
  }
);

Input.displayName = 'Input';
