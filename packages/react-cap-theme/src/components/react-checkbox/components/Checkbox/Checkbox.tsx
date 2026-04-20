import { renderCheckbox_unstable } from '@fluentui/react-checkbox';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { useCheckbox } from './useCheckbox';
import { useCheckboxStyles_unstable } from '@fluentui/react-components';
import { useCheckboxStyles as useCAPCheckboxStyles } from '../../../../customStyleHooks/react-checkbox';
import type { CheckboxProps } from '../../../../customStyleHooks/react-checkbox';
/**
 * Experimental Checkbox component that provides enhanced styling and behavior for SharePoint.
 *
 * @param props - The checkbox configuration and event handlers
 * @param ref - Reference to the checkbox input element
 * @returns The rendered checkbox component
 * @alpha
 */
export const Checkbox: ForwardRefComponent<CheckboxProps> = React.forwardRef(
  (props, ref) => {
    const state = useCheckbox(props, ref);

    useCheckboxStyles_unstable(state);
    useCAPCheckboxStyles(state);

    return renderCheckbox_unstable(state);
  }
);

Checkbox.displayName = 'Checkbox';
