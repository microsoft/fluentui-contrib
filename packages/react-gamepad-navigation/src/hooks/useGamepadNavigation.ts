import { InputMode } from '../types/InputMode';
import { GamepadState } from '../types/Keys';
import { consolePrefix } from '../core/Constants';
import { isSyntheticMouseEvent } from '../core/GamepadEvents';
import { getGamepadMappings } from '../core/GamepadMappings';
import { getShadowDOMAPI, IntervalId } from '../core/GamepadUtils';
import {
  isPollingEnabled,
  setDefaultInputMode,
  setInputMode,
  setPollingEnabled,
} from '../core/InputManager';
import { handleGamepadInput } from '../core/InputProcessor';
import { GamepadEventHandlers } from '../types/GamepadEventJHandlers';
import { useFluent, useId } from '@fluentui/react-components';
import { WindowWithFluentGPNShadowDOMAPI } from '../types/FluentGPNShadowDOMAPI';

/*
    Gamepad State & Polling
*/

// Gamepads & their state
const gamepads = new Map<number, Gamepad>();
let gamepadStates = new Map<number, GamepadState>();
export const getGamepadStates = (): Map<number, GamepadState> => gamepadStates;

// Gamepad polling
const updateGamepadState = (targetDocument: Document) => {
  const targetView = targetDocument.defaultView;
  let nextGamepads: (Gamepad | null)[] = [];
  if (targetView?.navigator && targetView.navigator.getGamepads) {
    nextGamepads = targetView.navigator.getGamepads();
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

const pollGamepads = (targetDocument: Document) => {
  if (!shouldPollGamepads()) {
    stopGamepadPolling(targetDocument);
    return;
  }

  const gamepadMappings = getGamepadMappings();
  if (!gamepadMappings) {
    stopGamepadPolling(targetDocument);
    return;
  }

  updateGamepadState(targetDocument);

  if (gamepads.size === 0) {
    stopGamepadPolling(targetDocument);
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

      handleGamepadInput(
        gamepad,
        gamepadId,
        gamepadMappings,
        gamepadState,
        targetDocument
      );
    }
  }
};

export const startGamepadPolling = (targetDocument: Document): void => {
  if (!scanInterval) {
    scanInterval = targetDocument.defaultView?.setInterval(
      () => pollGamepads(targetDocument),
      50
    );
  }
};

export const stopGamepadPolling = (targetDocument: Document): void => {
  if (scanInterval) {
    targetDocument.defaultView?.clearInterval(scanInterval);
    scanInterval = undefined;
  }
};

const onGamepadConnect = (evt: GamepadEvent, targetDocument: Document) => {
  gamepads.set(evt.gamepad.index, evt.gamepad);
  startGamepadPolling(targetDocument);
};

const onGamepadDisconnect = (evt: GamepadEvent, targetDocument: Document) => {
  gamepads.delete(evt.gamepad.index);
  if (gamepads.size === 0) {
    stopGamepadPolling(targetDocument);
  }
};

const onTouchInput = (_: TouchEvent, targetDocument: Document) => {
  setInputMode(InputMode.Touch, targetDocument);
};

const onMouseInput = (evt: MouseEvent, targetDocument: Document) => {
  // Make sure this isn't the fake event we triggered on button a press
  if (!isSyntheticMouseEvent(evt)) {
    setInputMode(InputMode.Mouse, targetDocument);
  }
};

/*
    General Events
*/
const onWindowBlur = (targetDocument: Document): void => {
  windowFocused = false;
  stopGamepadPolling(targetDocument);
};

const onWindowFocus = (targetDocument: Document): void => {
  windowFocused = true;
  if (isPollingEnabled()) {
    startGamepadPolling(targetDocument);
  }
};

// let gamepadInitialized = false;
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
   * @defaultValue true
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
  options: GamepadNavigationOptions = {}
) => {
  const { targetDocument } = useFluent();
  const defaultView = targetDocument?.defaultView;
  if (
    typeof targetDocument === 'undefined' ||
    typeof defaultView === 'undefined'
  ) {
    console.warn(
      consolePrefix,
      'Unable to initialize gamepad navigation in a non-browser environment'
    );
    return () => undefined;
  }

  const onMouseDown = (e: MouseEvent) => onMouseInput(e, targetDocument);
  const onTouchStart = (e: TouchEvent) => onTouchInput(e, targetDocument);
  const onGamepadConnected = (e: GamepadEvent) =>
    onGamepadConnect(e, targetDocument);
  const onGamepadDisconnected = (e: GamepadEvent) =>
    onGamepadDisconnect(e, targetDocument);
  const onTargetWindowBlur = () => onWindowBlur(targetDocument);
  const onTargetWindowFocus = () => onWindowFocus(targetDocument);
  const eventHandlers: GamepadEventHandlers = {
    onTouchStart,
    onMouseDown,
    onGamepadConnected,
    onGamepadDisconnected,
    onTargetWindowBlur,
    onTargetWindowFocus,
  };
  const removeEventListener = () =>
    removeGamepadNavigationEventListener(targetDocument, eventHandlers);

  let shadowDOMAPI = getShadowDOMAPI(targetDocument);
  if (!shadowDOMAPI) {
    shadowDOMAPI = {
      gamepadInitialized: false,
      windowId: useId('window'),
      eventHandlers,
    };
    (defaultView as WindowWithFluentGPNShadowDOMAPI).__FluentGPNShadowDOMAPI =
      shadowDOMAPI;
  }
  console.log('shadowDOMAPI', shadowDOMAPI);
  // Don't try to initialize multiple times
  if (shadowDOMAPI.gamepadInitialized) {
    return removeEventListener;
  }

  try {
    shadowDOMAPI.gamepadInitialized = true;

    if (options.defaultInputMode) {
      setDefaultInputMode(options.defaultInputMode);
      setInputMode(options.defaultInputMode, targetDocument);
    }

    /**
     * Add an initial list of gamepads. For platforms like smart TV,
     * if the user connects their controller before they open the Xbox app and
     * gamepad navigation is initialized, we never see a 'gamepadconnected' event in the app
     * and we never add the gamepad to our list. To fix this, on gamepad navigation initialization,
     * we look through the window.navigator's current gamepads and add those to our list to start.
     */
    const targetView: Window | null = targetDocument.defaultView;
    if (targetView?.navigator && targetView.navigator.getGamepads) {
      const gamepadsList = targetView.navigator.getGamepads();

      for (const gamepad of gamepadsList) {
        // Make sure the gamepad is connected and matches our provided filter before adding it
        if (gamepad && gamepad.connected) {
          gamepads.set(gamepad.index, gamepad);
        }
      }

      if (gamepads.size) {
        startGamepadPolling(targetDocument);
      }
    }
    targetDocument.addEventListener('touchstart', onTouchStart, {
      passive: false,
    });
    targetDocument.addEventListener('mousedown', onMouseDown, {
      passive: false,
    });

    const haveEvents = targetView && 'GamepadEvent' in targetView;
    const haveWebkitEvents = targetView && 'WebKitGamepadEvent' in targetView;

    if (haveEvents) {
      targetView.addEventListener('gamepadconnected', onGamepadConnected);
      targetView.addEventListener('gamepaddisconnected', onGamepadDisconnected);
    } else if (haveWebkitEvents) {
      targetView.addEventListener(
        'webkitgamepadconnected',
        onGamepadConnected as EventListener
      );
      targetView.addEventListener(
        'webkitgamepaddisconnected',
        onGamepadDisconnected as EventListener
      );
    }

    targetView?.addEventListener('blur', onTargetWindowBlur);
    targetView?.addEventListener('focus', onTargetWindowFocus);

    setPollingEnabled(options?.pollingEnabled ?? true, targetDocument);
    // console.log(consolePrefix, 'Initializing gamepad navigation');

    return removeEventListener;
  } catch (error) {
    console.error(
      consolePrefix,
      'Encountered error while initializing gamepad navigation',
      error
    );
    return removeEventListener;
  }
};

export const removeGamepadNavigationEventListener = (
  targetDocument: Document | undefined,
  handlers: GamepadEventHandlers
): void => {
  const shadowDOMAPI = getShadowDOMAPI(targetDocument);
  if (!shadowDOMAPI?.gamepadInitialized) {
    return;
  }
  shadowDOMAPI.gamepadInitialized = false;
  const targetView = targetDocument?.defaultView;
  if (!targetDocument || !targetView) {
    return;
  }

  // console.log(consolePrefix, 'Deinitializing gamepad navigation');

  setPollingEnabled(false, targetDocument);

  targetDocument.removeEventListener('touchstart', handlers.onTouchStart);
  targetDocument.removeEventListener('mousedown', handlers.onMouseDown);

  targetView?.removeEventListener(
    'webkitgamepadconnected',
    handlers.onGamepadConnected as EventListener
  );
  targetView?.removeEventListener(
    'webkitgamepaddisconnected',
    handlers.onGamepadDisconnected as EventListener
  );
  targetView?.removeEventListener(
    'gamepadconnected',
    handlers.onGamepadConnected
  );
  targetView?.removeEventListener(
    'gamepaddisconnected',
    handlers.onGamepadDisconnected
  );
  targetView?.removeEventListener('blur', handlers.onTargetWindowBlur);
  targetView?.removeEventListener('focus', handlers.onTargetWindowFocus);
};
