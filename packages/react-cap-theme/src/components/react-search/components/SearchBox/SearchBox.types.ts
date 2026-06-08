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
  /**
   * Separator element which is rendered between the input and dismiss.
   */
  separator?: Slot<'span'>; // TODO Remove and use "::after"
};

// FIXME Unresolved designs on buttons inside contentAfter
/**
 * Properties for configuring the SearchBox component.
 * @alpha
 */
export type SearchBoxProps = Omit<BaseSearchBoxProps, 'appearance'> & {
  /**
   * The appearance of the search box.
   *
   * Extends the base Fluent appearances with the CAP-specific 'filled-inset'
   * variant, which applies an inset shadow effect with circular corners.
   *
   * @default outline
   */
  appearance?: NonNullable<BaseSearchBoxProps['appearance']> | 'filled-inset';

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
export type SearchBoxState = Omit<
  BaseSearchBoxState,
  'components' | 'appearance'
> &
  ComponentState<SearchBoxInternalSlots & BaseSearchBoxSlots> &
  Required<Pick<SearchBoxProps, 'appearance' | 'color'>>;
