import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { useLabelStyles_unstable } from '@fluentui/react-components';
import { renderLabel } from './renderLabel';
import { useLabel } from './useLabel';
import type { LabelProps } from '../../../../customStyleHooks/react-label';
import { useLabelStyles as useCAPLabelStyles } from '../../../../customStyleHooks/react-label';

/**
 * Label component for SharePoint Design System with SP-specific typography and theming.
 * @param props - The label configuration and event handlers
 * @param ref - React ref for the label element
 * @returns JSX.Element representing the rendered label
 * @alpha
 */
export const Label: ForwardRefComponent<LabelProps> = React.forwardRef(
  (props, ref) => {
    const state = useLabel(props, ref);

    useLabelStyles_unstable(state);
    useCAPLabelStyles(state);

    return renderLabel(state);
  }
);

Label.displayName = 'Label';
