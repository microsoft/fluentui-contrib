import { FocusFinderFunctions } from '../types/FocusFinders';
import { InputMode } from '../types/InputMode';
import { GamepadState } from '../types/Keys';
import { consolePrefix } from '../core/Constants';
import { isSyntheticMouseEvent } from '../core/GamepadEvents';
import { getGamepadMappings } from '../core/GamepadMappings';
import { IntervalId } from '../core/GamepadUtils';
import {
  isPollingEnabled,
  setDefaultInputMode,
  setInputMode,
  setPollingEnabled,
} from '../core/InputManager';
import { handleGamepadInput } from '../core/InputProcessor';
import { useEffect, useRef } from 'react';
import {
  useFluent,
  useFocusFinders,
  useTimeout,
} from '@fluentui/react-components';

/*
    Gamepad State & Polling
*/

// Gamepads & their state
const gamepads = new Map<number, Gamepad>();
let gamepadStates = new Map<number, GamepadState>();
export const getGamepadStates = (): Map<number, GamepadState> => gamepadStates;

// Gamepad polling
const updateGamepadState = () => {
  let nextGamepads: (Gamepad | null)[] = [];
  if (window.navigator && window.navigator.getGamepads) {
    nextGamepads = window.navigator.getGamepads();
  }
  const nextGamepadStates = new Map<number, GamepadState>();

  for (const gamepad of nextGamepads) {
    if (gamepad && gamepads.has(gamepad.index)) {
      gamepads.set(gamepad.index, gamepad);

      const previousState = gamepadStates.get(gamepad.index);
      if (previousState) {
        nextGamepadStates.set(gamepad.index, previousState);
      } else {
        nextGamepadStates.set(gamepad.index, {
          A: 0,
          B: 0,
          X: 0,
          Y: 0,
          LB: 0,
          RB: 0,
          DpadUp: 0,
          DpadDown: 0,
          DpadLeft: 0,
          DpadRight: 0,
          timestamp: gamepad.timestamp - 1,
        });
      }
    }
  }
  gamepadStates = nextGamepadStates;
};

let windowFocused = true;
export const shouldPollGamepads = () => windowFocused && isPollingEnabled();

let scanInterval: IntervalId;

const pollGamepads = () => {
  if (!shouldPollGamepads()) {
    stopGamepadPolling();
    return;
  }

  const gamepadMappings = getGamepadMappings();
  if (!gamepadMappings) {
    stopGamepadPolling();
    return;
  }

  updateGamepadState();

  if (gamepads.size === 0) {
    stopGamepadPolling();
    return;
  }

  for (const gamepadId of gamepads.keys()) {
    const gamepadState = gamepadStates.get(gamepadId);
    const gamepad = gamepads.get(gamepadId);

    if (!gamepad || !gamepadState) {
      continue;
    }

    if (gamepad.timestamp !== gamepadState.timestamp) {
      gamepadState.timestamp = gamepad.timestamp;

      handleGamepadInput(gamepad, gamepadId, gamepadMappings, gamepadState);
    }
  }
};

export const startGamepadPolling = (): void => {
  if (!scanInterval) {
    scanInterval = setInterval(pollGamepads, 50);
  }
};

export const stopGamepadPolling = (): void => {
  if (scanInterval) {
    clearInterval(scanInterval);
    scanInterval = undefined;
  }
};

const onGamepadConnect = (evt: GamepadEvent) => {
  gamepads.set(evt.gamepad.index, evt.gamepad);
  startGamepadPolling();
};

const onGamepadDisconnect = (evt: GamepadEvent) => {
  gamepads.delete(evt.gamepad.index);
  if (gamepads.size === 0) {
    stopGamepadPolling();
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onTouchInput = (_: TouchEvent) => {
  setInputMode(InputMode.Touch);
};

const onMouseInput = (evt: MouseEvent) => {
  // Make sure this isn't the fake event we triggered on button a press
  if (!isSyntheticMouseEvent(evt)) {
    setInputMode(InputMode.Mouse);
  }
};

/*
    General Events
*/
const onWindowBlur = (): void => {
  windowFocused = false;
  stopGamepadPolling();
};

const onWindowFocus = (): void => {
  windowFocused = true;
  if (isPollingEnabled()) {
    startGamepadPolling();
  }
};

// let focusFinderFns: FocusFinderFunctions;
// let targetDocument: Document = document;
// let gamepadInitialized = false;

// export const getFocusFinderFns = (): FocusFinderFunctions => {
//   return focusFinderFns;
// };

// export const getTargetDocument = (): Document => {
//   return targetDocument ?? document;
// };

// export const getCurrentActiveElement = (): Element | null | undefined => {
//   return targetDocument?.activeElement;
// };

/*
    Library Initialization/Deinitialization
*/

export type GamepadNavigationOptions = {
  /**
   * The default input mode to use when lib is initialized
   * @defaultValue InputMode.Mouse
   * */
  defaultInputMode?: InputMode;

  /**
   * Whether to enable polling for gamepad input. If false, the library will not poll for gamepad input
   */
  pollingEnabled?: boolean;
};

/**
 * @internal
 * Initialize gamepad navigation
 * @param options {GamepadNavigationOptions} - The options to use for gamepad navigation
 * @returns cleanup function
 */
export const useGamepadNavigation = (
  options: GamepadNavigationOptions
): (() => void) => {
  const { targetDocument } = useFluent();
  const targetDocRef = useRef(targetDocument);
  const defaultView = targetDocument?.defaultView || undefined;
  const focusFinderFns = useFocusFinders();
  const [setGPNTimeout, clearGPNTimeout] = useTimeout();
  const gamepadInitialized = useRef(false);

  if (
    typeof targetDocument === 'undefined' ||
    typeof defaultView === 'undefined'
  ) {
    throw new Error(
      'Unable to initialize gamepad navigation in a non-browser environment'
    );
  } else {
    targetDocRef.current = targetDocument;
  }

  if (options.defaultInputMode) {
    setDefaultInputMode(options.defaultInputMode);
    setInputMode(options.defaultInputMode);
  }

  try {
    console.log(consolePrefix, 'Initializing gamepad navigation');
  } catch (error) {
    console.error(
      consolePrefix,
      'Encountered error while initializing gamepad navigation',
      error
    );
  }

  // Don't try to initialize multiple times
  if (gamepadInitialized.current) {
    return () => null;
  } else {
    gamepadInitialized.current = true;
  }

  useEffect(() => {
    /**
     * Add an initial list of gamepads. For platforms like smart TV,
     * if the user connects their controller before they open the Xbox app and
     * gamepad navigation is initialized, we never see a 'gamepadconnected' event in the app
     * and we never add the gamepad to our list. To fix this, on gamepad navigation initialization,
     * we look through the window.navigator's current gamepads and add those to our list to start.
     */
    if (
      targetDocRef.current?.defaultView?.navigator &&
      targetDocRef.current?.defaultView?.navigator.getGamepads
    ) {
      const gamepadsList =
        targetDocRef.current?.defaultView?.navigator.getGamepads();

      for (const gamepad of gamepadsList) {
        // Make sure the gamepad is connected and matches our provided filter before adding it
        if (gamepad && gamepad.connected) {
          gamepads.set(gamepad.index, gamepad);
        }
      }

      if (gamepads.size) {
        startGamepadPolling();
      }
    }

    targetDocRef.current?.addEventListener('touchstart', onTouchInput, {
      passive: false,
    });
    targetDocRef.current?.addEventListener('mousedown', onMouseInput, {
      passive: false,
    });

    const haveEvents =
      targetDocRef.current?.defaultView &&
      targetDocRef.current.defaultView &&
      'GamepadEvent' in targetDocRef.current.defaultView;
    const haveWebkitEvents =
      targetDocRef.current?.defaultView &&
      'WebKitGamepadEvent' in targetDocRef.current.defaultView;

    if (haveEvents) {
      targetDocRef.current?.defaultView?.addEventListener(
        'gamepadconnected',
        onGamepadConnect
      );
      targetDocRef.current?.defaultView?.addEventListener(
        'gamepaddisconnected',
        onGamepadDisconnect
      );
    } else if (haveWebkitEvents) {
      targetDocRef.current?.defaultView?.addEventListener(
        'webkitgamepadconnected',
        onGamepadConnect as EventListener
      );
      targetDocRef.current?.defaultView?.addEventListener(
        'webkitgamepaddisconnected',
        onGamepadDisconnect as EventListener
      );
    }

    targetDocRef.current?.defaultView?.addEventListener('blur', onWindowBlur);
    targetDocRef.current?.defaultView?.addEventListener('focus', onWindowFocus);

    setPollingEnabled(options?.pollingEnabled ?? true);
  }, [defaultView]);

  return () =>
    cleanupGamepadNavigation(targetDocRef.current, gamepadInitialized.current);
};

export const cleanupGamepadNavigation = (
  targetDocument: Document | undefined | null,
  gamepadInitialized: boolean
): void => {
  if (!gamepadInitialized) {
    return;
  }
  gamepadInitialized = false;

  console.log(consolePrefix, 'Deinitializing gamepad navigation');

  setPollingEnabled(false);

  targetDocument?.removeEventListener('touchstart', onTouchInput);
  targetDocument?.removeEventListener('mousedown', onMouseInput);

  targetDocument?.defaultView?.removeEventListener(
    'webkitgamepadconnected',
    onGamepadConnect as EventListener
  );
  targetDocument?.defaultView?.removeEventListener(
    'webkitgamepaddisconnected',
    onGamepadDisconnect as EventListener
  );
  targetDocument?.defaultView?.removeEventListener(
    'gamepadconnected',
    onGamepadConnect
  );
  targetDocument?.defaultView?.removeEventListener(
    'gamepaddisconnected',
    onGamepadDisconnect
  );
  targetDocument?.defaultView?.removeEventListener('blur', onWindowBlur);
  targetDocument?.defaultView?.removeEventListener('focus', onWindowFocus);
};
