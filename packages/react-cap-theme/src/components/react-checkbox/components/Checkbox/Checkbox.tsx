import { renderCheckbox_unstable } from '@fluentui/react-checkbox';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import type { CheckboxProps } from './Checkbox.types';
import { useCheckbox } from './useCheckbox';
import { useCheckboxStyles } from './useCheckboxStyles.styles';

export const Checkbox: ForwardRefComponent<CheckboxProps> = React.forwardRef(
  (props, ref) => {
    const state = useCheckbox(props, ref);

    useCheckboxStyles(state);

    return renderCheckbox_unstable(state);
  }
);

Checkbox.displayName = 'Checkbox';
