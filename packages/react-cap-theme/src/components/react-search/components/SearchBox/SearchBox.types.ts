import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type {
  SearchBoxProps as BaseSearchBoxProps,
  SearchBoxSlots as BaseSearchBoxSlots,
  SearchBoxState as BaseSearchBoxState,
} from '@fluentui/react-search';

/**
 * Internal slots for SearchBox.
 * @internal
 */
export type SearchBoxInternalSlots = {
  separator?: Slot<'span'>;
};

/**
 * Properties for configuring the SearchBox component.
 * @alpha
 */
export type SearchBoxProps = BaseSearchBoxProps & {
  /**
   * The color variant.
   *
   * - 'brand' (default): Primary emphasis using brand colors.
   * - 'neutral': Secondary emphasis using neutral colors.
   *
   * @default 'brand'
   */
  color?: 'brand' | 'neutral';
};

/**
 * State used in rendering the SearchBox component.
 * @alpha
 */
export type SearchBoxState = BaseSearchBoxState &
  ComponentState<SearchBoxInternalSlots> &
  Required<Pick<SearchBoxProps, 'color'>>;
