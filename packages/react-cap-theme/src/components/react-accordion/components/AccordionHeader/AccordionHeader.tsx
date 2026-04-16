import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderAccordionHeader_unstable,
  useAccordionHeaderContextValues_unstable,
  type AccordionHeaderProps,
} from '@fluentui/react-accordion';
import { useAccordionHeader } from './useAccordionHeader';
import { useAccordionHeaderStyles_unstable } from '@fluentui/react-components';
import { useAccordionHeaderStyles as useCAPAccordionHeader } from '../../../../customStyleHooks/react-accordion';
/**
 * An accordion header is used as a button in the heading
 *
 * @param props - The accordion header configuration and event handlers
 * @param ref - Reference to the accordion header element
 * @returns The rendered accordion header component
 * @alpha
 */
export const AccordionHeader: ForwardRefComponent<AccordionHeaderProps> =
  React.forwardRef((props, ref) => {
    const state = useAccordionHeader(props, ref);

    useAccordionHeaderStyles_unstable(state);
    useCAPAccordionHeader(state);

    return renderAccordionHeader_unstable(
      state,
      useAccordionHeaderContextValues_unstable(state)
    );
  });
