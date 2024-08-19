import type {
  ComponentProps,
  ComponentState,
  Slot,
  EventData,
  EventHandler,
} from '@fluentui/react-utilities';
import * as React from 'react';

export type KeytipsSlots = {
  root: Slot<'div'>;
};

type OnExitKeytipsModeData = EventData<'keydown', KeyboardEvent>;
type OnEnterKeytipsModeData = EventData<'keydown', KeyboardEvent>;

/**
 * Keytips Props
 */
export type KeytipsProps = ComponentProps<KeytipsSlots> & {
  /**
   * List of key sequences that will start keytips mode
   */
  startSequence?: string;
  /**
   * List of key sequences that execute the return functionality in keytips
   * (going back to the previous level of keytips)
   */
  returnSequence?: string;
  /**
   * List of key sequences that will exit keytips mode
   */
  exitSequence?: string;
  /**
   * Callback function triggered when keytip mode is exited.
   * ev is the Mouse or Keyboard Event that triggered the exit, if any.
   */
  onExitKeytipsMode?: EventHandler<OnExitKeytipsModeData>;
  /**
   * Callback function triggered when keytip mode is entered
   * @param transitionKey - The key sequence that triggered keytip mode, if any.
   */
  onEnterKeytipsMode?: EventHandler<OnEnterKeytipsModeData>;
};

/**
 * State used in renderingKeytipsProvider
 */
export type KeytipsState = ComponentState<KeytipsSlots> & {
  keytips: React.ReactElement[];
};
