import type {
  ComponentProps,
  ComponentState,
  Slot,
  TabSlots,
  TabProps,
  TabState,
} from '@fluentui/react-components';

export type InteractiveTabSlots = {
  /**
   * Root of the component.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The button that represents the tab.
   * This is the element that will be focused when the tab is selected.
   **/
  button: NonNullable<TabSlots['root']>;

  /**
   * Element before the button, within the tab
   **/
  contentBefore?: Slot<'span'>;

  /**
   * Element after the button, within the tab
   **/
  contentAfter?: Slot<'span'>;
} & Omit<TabSlots, 'root'>;

type TabInternalProps = Pick<TabProps, 'value' | 'disabled'>;

export type InteractiveTabProps = ComponentProps<
  Partial<InteractiveTabSlots>,
  'button'
> &
  TabInternalProps;

type TabInternalSlots = TabSlots & {
  contentReservedSpace?: Slot<'span'>;
};

export type InteractiveTabInternalSlots = InteractiveTabSlots &
  Omit<TabInternalSlots, 'root'>;

type TabInternalState = Pick<
  TabState,
  | 'value'
  | 'disabled'
  | 'appearance'
  | 'iconOnly'
  | 'selected'
  | 'size'
  | 'vertical'
>;

/**
 * State used in rendering InteractiveTab
 */
export type InteractiveTabState = ComponentState<InteractiveTabInternalSlots> &
  TabInternalState;
