import {
  useAccordionHeader_unstable,
  useAccordionItemContext_unstable,
} from '@fluentui/react-accordion';
import type {
  AccordionHeaderProps,
  AccordionHeaderState,
} from '@fluentui/react-accordion';
import {
  bundleIcon,
  ChevronRightRegular,
  ChevronRightFilled,
} from '@fluentui/react-icons';
import { motionTokens } from '@fluentui/react-motion';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { slot } from '@fluentui/react-utilities';
import * as React from 'react';

const ChevronRightIcon = bundleIcon(ChevronRightFilled, ChevronRightRegular);
export const useAccordionHeader = (
  props: AccordionHeaderProps,
  ref: React.Ref<HTMLDivElement>
): AccordionHeaderState => {
  const baseState = useAccordionHeader_unstable(props, ref);

  const { open } = useAccordionItemContext_unstable();
  const { dir } = useFluent_unstable();
  const expandIconPosition: string = props.expandIconPosition ?? 'start';

  let expandIconRotation: 0 | 90 | -90 | 180;
  if (expandIconPosition === 'end') {
    expandIconRotation = open ? -90 : 90;
  } else {
    expandIconRotation = open ? 90 : dir !== 'rtl' ? 0 : 180;
  }

  const expandIconStyle = {
    transform: `rotate(${expandIconRotation}deg)`,
    transition: `transform ${motionTokens.durationNormal}ms ease-out`,
  };

  return {
    ...baseState,
    expandIcon: slot.optional(props.expandIcon, {
      renderByDefault: true,
      defaultProps: {
        children: <ChevronRightIcon style={expandIconStyle} />,
        'aria-hidden': true,
      },
      elementType: 'span',
    }),
  };
};
