import type {
  CardContextValue as BaseContextValue,
  CardProps as BaseProps,
  CardState as BaseState,
} from '@fluentui/react-card';

/**
 * SP specific data shared between card components
 * @internal
 */
export type CardContextValueInternal = Pick<
  CardState,
  'disabled' | 'orientation' | 'size'
>;

/**
 * Data shared between card components
 * @internal
 */
export type CardContextValue = CardContextValueInternal & BaseContextValue;

/**
 * Combined Fluent and SP context values for Card and its underlying components.
 * @internal
 */
export type CardContextValues = {
  /** Fluent's context values from the Card component */
  base: BaseContextValue;
  /** Local context values specific to this SP implementation */
  local: CardContextValueInternal;
};

/**
 * Props for the Card component.
 * @alpha
 */
export type CardProps = Omit<BaseProps, 'appearance'> & {
  /**
   * Sets the appearance of the card.
   *
   * `filled`
   * The card will have a shadow, border and background color.
   *
   * `subtle`
   * This appearance shows no background or shadow on rest.
   *
   * @default 'filled'
   */
  appearance?: 'filled' | 'subtle';
};

/**
 * State for rendering the Card.
 * @alpha
 */
export type CardState = Omit<BaseState, 'appearance'> &
  Required<Pick<CardProps, 'appearance'>>;
