import type {
  LabelProps as BaseLabelProps,
  LabelSlots as BaseLabelSlots,
} from '@fluentui/react-label';
import type { ComponentState, Slot } from '@fluentui/react-utilities';

export type LabelSlots = BaseLabelSlots & {
  /** Optional icon rendered alongside the label text. */
  icon?: Slot<'span'>;
};

export type LabelState = ComponentState<LabelSlots> & BaseLabelProps;
