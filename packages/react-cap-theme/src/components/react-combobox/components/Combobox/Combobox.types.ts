import type {
  ComboboxProps as BaseProps,
  ComboboxSlots as BaseSlots,
  ComboboxState as BaseState,
} from '@fluentui/react-combobox';
import type {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-utilities';

/**
 * Slot configuration for the Combobox component.
 * Adds the SP-specific contentBefore slot. The listbox slot is inherited
 * from Fluent and restyled in `useComboboxStyles`.
 * @alpha
 */
export type ComboboxSlots = BaseSlots & {
  /**
   * Element before the input text, e.g. an icon or avatar.
   */
  contentBefore?: Slot<'span'>;
};

/**
 * Properties for configuring the Combobox component.
 * @alpha
 */
export type ComboboxProps = ComponentProps<
  Pick<ComboboxSlots, 'contentBefore'>
> &
  Omit<BaseProps, 'color'> & {
    /**
     * The color variant.
     *
     * - 'brand' (default): Primary emphasis using brand colors.
     * - 'neutral': Secondary emphasis using neutral colors.
     *
     * @default 'brand'
     */
    // FIXME: Must not graduate to beta. Style implementation references Fluent tokens directly.
    // `color` and `NeutralThemeProvider` solve the same brand/neutral switching problem at different
    // levels of the stack with no defined interaction. Graduating locks in an API contract that may
    // need to change once a proper token-based theming approach is defined.
    color?: 'neutral' | 'brand';
  };

/**
 * State used in rendering the Combobox component.
 * @alpha
 */
export type ComboboxState = ComponentState<ComboboxSlots> &
  Omit<BaseState, 'components'> &
  Required<Pick<ComboboxProps, 'color'>>;
