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
     * @default 'Alt+Meta'
     */
    content?: string;
    /**
     * Key sequence that will start keytips mode
     * @default 'alt+meta'.
     */
    startSequence?: string;
    /**
     * Key sequences that execute the return functionality in keytips
     * (going back to the previous level of keytips).
     * @default 'escape'
     */
    returnSequence?: string;
    /**
     * Key sequences that will exit keytips mode.
     */
    exitSequence?: string;
    /**
     * Timeout in milliseconds for keytips enter mode to be on,
     * use if you'd like to have a more clear intent that keytips need to be shown.
     * Values < 0 disable the feature.
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
  Pick<KeytipsProps, 'mountNode' | 'content'> & {
    visibleKeytips: React.ReactElement[];
    keytips: React.ReactElement[];
  };
