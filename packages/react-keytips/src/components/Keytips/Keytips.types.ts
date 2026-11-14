import * as React from 'react';
import type { EventData, EventHandler } from '@fluentui/react-utilities';
import {
  PortalProps,
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-components';

export type KeytipsSlots = {
  root: Slot<'div'>;
};

export type InvokeEvent = 'keydown' | 'keyup';

type OnExitKeytipsModeData = EventData<InvokeEvent, KeyboardEvent>;
type OnEnterKeytipsModeData = EventData<InvokeEvent, KeyboardEvent>;

export type KeytipsProps = ComponentProps<KeytipsSlots> &
  Pick<PortalProps, 'mountNode'> & {
    /**
     * String to put inside the Portal to be used for the aria-describedby
     * for the component with the keytip.
     * Should be one of the starting sequences.
     * @default 'Alt Meta' on Windows, 'Alt Control' on MacOS.
     */
    content?: string;
    /**
     * Key sequence that will start keytips mode. Should be a combination of modifier
     * or modifiers and a key. Defaults to `alt + ctrl` on Windows and `option + cmd` on macOS.
     * An array enables multiple entry aliases.
     * @default 'alt+meta'
     */
    startSequence?: string | string[];
    /**
     * Disabled when omitted. Set to 'alt' to opt into plain-Alt activation.
     * Opts into immediate entry on a plain modifier keydown, independently of
     * invokeEvent and startDelay. startSequence remains available as an entry alias.
     * The first press and release are consumed. A consecutive second press exits
     * without cancellation; after other input, a press exits and is consumed.
     * Keytip input is only executed after releasing the activation modifier.
     * @default undefined
     */
    activationModifier?: 'alt' | 'control' | 'meta' | 'shift';
    /**
     * Whether keytips may be entered. Disabling also dismisses active keytips.
     * This does not enable plain modifier activation; that requires activationModifier.
     * @default true
     */
    enabled?: boolean;
    /**
     * Key sequence that execute the return functionality in keytips
     * (going back to the previous level of keytips).
     * @default 'escape'.
     */
    returnSequence?: string;
    /**
     * Key sequences that will exit keytips mode.
     * @default 'alt+escape'.
     */
    exitSequence?: string;
    /**
     * Timeout in milliseconds for keytips enter mode to be on,
     * use if you'd like to have a more clear intent that keytips need to be shown.
     * Values < 0 disable the feature. Press and hold the start sequence.
     * @default 0
     */
    startDelay?: number;
    /**
     * Callback function triggered when keytip mode is exited.
     */
    onExitKeytipsMode?: EventHandler<OnExitKeytipsModeData>;
    /**
     * Callback function triggered when keytip mode is entered.
     */
    onEnterKeytipsMode?: EventHandler<OnEnterKeytipsModeData>;
    /**
     * Event responsible for invoking keytips.
     * @default 'keydown'
     * */
    invokeEvent?: InvokeEvent;
  };

/**
 * State used in renderingKeytipsProvider
 */
export type KeytipsState = ComponentState<KeytipsSlots> &
  Pick<KeytipsProps, 'mountNode' | 'content' | 'activationModifier'> & {
    keytips: React.ReactElement[];
  };
