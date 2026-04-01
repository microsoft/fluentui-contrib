import type {
  CheckboxProps as BaseCheckboxProps,
  CheckboxState as BaseCheckboxState,
} from '@fluentui/react-checkbox';

export type { CheckboxSlots } from '@fluentui/react-checkbox';

export type CheckboxProps = BaseCheckboxProps & {
  color?: 'brand' | 'neutral';
};

export type CheckboxState = BaseCheckboxState &
  Required<Pick<CheckboxProps, 'color'>>;
