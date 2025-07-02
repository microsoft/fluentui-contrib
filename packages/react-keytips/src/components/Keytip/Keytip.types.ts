import type { EventData, EventHandler } from '@fluentui/react-utilities';
import type {
  PositioningProps,
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-components';
import type { InvokeEvent } from '../Keytips/Keytips.types';

/**
 * Slot properties for Keytip
 */
export type KeytipSlots = {
  /**
   * The text or JSX content of the Keytip.
   */
  content: NonNullable<Slot<'div'>>;
};

export type ExecuteKeytipEventHandler<E = HTMLElement | null> = EventHandler<
  EventData<InvokeEvent, KeyboardEvent> & {
    targetElement: E;
  }
>;

export type ReturnKeytipEventHandler<E = HTMLElement | null> = EventHandler<
  EventData<InvokeEvent, KeyboardEvent> & {
    targetElement: E;
  }
>;

export type KeytipProps = ComponentProps<KeytipSlots> & {
  /**
   * Unique identifier for the Keytip.
   */
  uniqueId?: string;
  /**
   * Positioning props to be passed to Keytip.
   * @default { align: 'center', position: 'below' }
   */
  positioning?: PositioningProps;
  /**
   * Whether the keytip is visible.
   */
  visible?: boolean;
  /**
   * Function to call when this keytip is activated.
   */
  onExecute?: ExecuteKeytipEventHandler;
  /**
   * Function to call when the keytip is the currentKeytip and a return sequence is pressed.
   */
  onReturn?: ReturnKeytipEventHandler;
  /**
   * Array of KeySequences which is the full key sequence to trigger this keytip
   * Should not include initial 'start' key sequence.
   */
  keySequences: string[];
  /**
   * Whether or not this Keytip will have children keytips that are dynamically created (DOM is generated on * keytip activation).
   * Common cases are a Tabs or Modal. Or if the keytip opens a menu.
   */
  dynamic?: boolean;
  /**
   * Whether or not this Keytip belongs to a component that has a menu. Keytip mode will stay on when a menu is opened,
   * even if the items in that menu have no keytips.
   */
  hasMenu?: boolean;
  /**
   * If this keytip is inside OverflowMenu, you might need to add the overflowSequence to make shortcuts available.
   */
  overflowSequence?: string[];
  /**
   * If true, keytip content and each sequence length will be truncated to 3 chars.
   * @default true
   */
  truncated?: boolean;
};

export type KeytipState = ComponentState<KeytipSlots> &
  Required<Pick<KeytipProps, 'visible' | 'positioning' | 'content'>> & {
    /**
     * Whether the Keytip should be rendered to the DOM.
     */
    shouldRenderKeytip?: boolean;
  };
