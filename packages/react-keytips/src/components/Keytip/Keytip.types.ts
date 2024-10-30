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
   * Should not include initial 'start' key sequence
   */
  keySequences: string[];
  /**
   * Whether or not this keytip will have children keytips that are dynamically created (DOM is generated on * keytip activation).
   * Common cases are a Tabs or Modal. Or if the keytip opens a menu.
   */
  dynamic?: boolean;
};

/** @internal */
export type KeytipWithId = KeytipProps & {
  uniqueId: string;
  isShortcut?: boolean;
  dependentKeys?: string[];
};

export type KeytipState = ComponentState<KeytipSlots> &
  Required<Pick<KeytipProps, 'visible' | 'positioning' | 'content'>> & {
    /**
     * Whether the Keytip should be rendered to the DOM.
     */
    shouldRenderKeytip?: boolean;
  };
