import type { LabelProps as BaseLabelProps, LabelSlots as BaseLabelSlots } from '@fluentui/react-label';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * Label slots specific to SharePoint.
 * @alpha
 */
export type LabelSlots = BaseLabelSlots & {
  /** Optional icon rendered alongside the label text. */
  icon?: Slot<'span'>;
};

/**
 * Props for the Label component specific to SharePoint.
 * @alpha
 */
export type LabelProps = Omit<ComponentProps<LabelSlots>, 'required'> &
  Pick<BaseLabelProps, 'disabled' | 'required' | 'size' | 'weight'>;

/**
 * State for the Label component specific to SharePoint.
 * @alpha
 */
export type LabelState = ComponentState<LabelSlots> &
  Required<Pick<LabelProps, 'disabled' | 'size' | 'weight'>>;
