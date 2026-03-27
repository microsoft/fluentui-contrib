import {
  type AccordionPanelProps,
  renderAccordionPanel_unstable,
  useAccordionPanel_unstable,
} from '@fluentui/react-accordion';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { useAccordionPanelStyles } from './useAccordionPanelStyles.styles';

export const AccordionPanel: ForwardRefComponent<AccordionPanelProps> =
  React.forwardRef((props, ref) => {
    const state = useAccordionPanel_unstable(props, ref);

    useAccordionPanelStyles(state);
    useCustomStyleHook_unstable('useAccordionPanelStyles_unstable')(state);

    return renderAccordionPanel_unstable(state);
  });

AccordionPanel.displayName = 'AccordionPanel';
