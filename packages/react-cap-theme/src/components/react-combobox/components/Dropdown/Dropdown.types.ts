import type {
  DropdownProps as BaseProps,
  DropdownSlots as BaseSlots,
  DropdownState as BaseState,
} from '@fluentui/react-combobox';
import type {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-utilities';

/**
 * Slot configuration for the Dropdown component.
 * @alpha
 */
export type DropdownSlots = BaseSlots & {
  /**
   * Element before the Dropdown text.
   */
  contentBefore?: Slot<'span'>;
};

/**
 * Properties for configuring the Dropdown component.
 * @alpha
 */
export type DropdownProps = ComponentProps<
  Pick<DropdownSlots, 'contentBefore'>
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
 * State used in rendering the Dropdown component.
 * @alpha
 */
export type DropdownState = ComponentState<DropdownSlots> &
  Omit<BaseState, 'components'> &
  Required<Pick<DropdownProps, 'color'>>;
