import {
  renderAccordionHeader_unstable,
  useAccordionHeaderContextValues_unstable,
  type AccordionHeaderProps,
} from '@fluentui/react-accordion';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import * as React from 'react';
import { useAccordionHeader } from './useAccordionHeader';
import { useAccordionHeaderStyles } from './useAccordionHeaderStyles.styles';

export const AccordionHeader: ForwardRefComponent<AccordionHeaderProps> =
  React.forwardRef((props, ref) => {
    const state = useAccordionHeader(props, ref);

    useAccordionHeaderStyles(state);
    useCustomStyleHook_unstable('useAccordionHeaderStyles_unstable')(state);
    return renderAccordionHeader_unstable(
      state,
      useAccordionHeaderContextValues_unstable(state)
    );
  });
