import { useCheckbox_unstable as useBaseState } from '@fluentui/react-checkbox';
import {
  CheckboxUncheckedRegular,
  CheckboxCheckedFilled,
  CheckboxCheckedRegular,
  CheckboxIndeterminateRegular,
  RadioButtonRegular,
  RadioButtonFilled,
  CheckmarkCircleFilled,
  CheckmarkCircleRegular,
  bundleIcon,
} from '@fluentui/react-icons';
import { slot } from '@fluentui/react-utilities';
import * as React from 'react';
import type { CheckboxProps, CheckboxState } from './Checkbox.types';

const CircleCheckmark = bundleIcon(CheckmarkCircleRegular, RadioButtonRegular);
const SquareCheckmark = bundleIcon(
  CheckboxCheckedRegular,
  CheckboxUncheckedRegular
);

export const useCheckbox = (
  props: CheckboxProps,
  ref: React.Ref<HTMLInputElement>
): CheckboxState => {
  const { color = 'brand', ...baseProps } = props;

  const baseState = useBaseState(baseProps, ref);
  const { checked, shape } = baseState;

  const isChecked = checked === true;
  const isMixed = checked === 'mixed';
  const isCircular = shape === 'circular';

  let checkmarkIcon;
  if (isMixed) {
    checkmarkIcon = isCircular ? (
      <RadioButtonFilled />
    ) : (
      <CheckboxIndeterminateRegular />
    );
  } else if (isCircular) {
    checkmarkIcon = isChecked ? <CheckmarkCircleFilled /> : <CircleCheckmark />;
  } else {
    checkmarkIcon = isChecked ? <CheckboxCheckedFilled /> : <SquareCheckmark />;
  }

  const indicator = slot.optional(props.indicator, {
    renderByDefault: true,
    elementType: 'div',
    defaultProps: {
      children: checkmarkIcon,
      'aria-hidden': 'true',
    },
  });

  return {
    ...baseState,
    indicator,
    color,
  };
};
