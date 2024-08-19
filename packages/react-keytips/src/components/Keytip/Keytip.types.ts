import type {
  ComponentProps,
  ComponentState,
  EventData,
  EventHandler,
} from '@fluentui/react-utilities';
import type { PositioningProps } from '@fluentui/react-components';
import type { TooltipProps } from '@fluentui/react-tooltip';
import type { Slot } from '@fluentui/react-utilities';

export type KeytipSlots = {
  content: NonNullable<Slot<'div'>>;
};

export type ExecuteKeytipEventHandler<E = HTMLElement> = EventHandler<
  EventData<'keydown', KeyboardEvent> & {
    targetElement: E;
  }
>;

export type ReturnKeytipEventHandler<E = HTMLElement> = EventHandler<
  EventData<'keydown', KeyboardEvent> & {
    targetElement: E;
  }
>;

/**
 * Keytip Props
 */
export type KeytipProps = ComponentProps<KeytipSlots> &
  Pick<TooltipProps, 'appearance' | 'visible'> & {
    /**
     * Positioning props to be passed to Keytip Tooltip
     */
    positioning?: PositioningProps;
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
    /** * Whether or not this keytip will have children keytips that are dynamically created (DOM is generated on * keytip activation). Common cases are a Tabs or Modal.
     */
    hasDynamicChildren?: boolean;
  };
/**
 * State used in rendering Keytip
 *
 */
export type KeytipState = ComponentState<KeytipSlots> &
  Required<Pick<KeytipProps, 'visible' | 'positioning' | 'appearance'>>;
