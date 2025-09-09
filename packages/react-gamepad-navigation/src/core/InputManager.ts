import { GamepadAction, GamepadButton, KeyboardKey } from '../types/Keys';
import {
  startGamepadPolling,
  stopGamepadPolling,
} from '../hooks/useGamepadNavigation';
import { resetGamepadState } from './InputProcessor';
import { emitSyntheticGroupperMoveFocusEvent } from './GamepadEvents';
import { DirectionalSource } from '../types/DirectionalSource';
import { FocusDirection } from '../types/FocusDirection';
import { IntervalId, TimeoutId } from './GamepadUtils';
import { navigate } from './NavigationManager';
import { InputMode, isFocusDriven } from '../types/InputMode';
import { selectOptionsVisibleAttribute } from './Constants';

/*
    General
*/

const clearAllTimeouts = (targetDocument: Document) => {
  clearDirectionRepeats(targetDocument);
  clearDirectionalInputStack();
};

let defaultInputMode: InputMode = InputMode.Mouse;

export const getDefaultInputMode = (): InputMode => {
  return defaultInputMode;
};

export const setDefaultInputMode = (newDefaultInputMode: InputMode): void => {
  defaultInputMode = newDefaultInputMode;
};

// The last remembered input mode
let inputMode: InputMode = InputMode.Mouse;

/**
 * Getter for the last remembered input mode
 *
 *  @returns the current input mode
 */
export const getInputMode = (): InputMode => {
  return inputMode;
};

/**
 * Sets the next input mode, and focuses on the last focused interactable, if specified
 *
 *  @param inputMode - the input mode to set
 */
export const setInputMode = (
  newInputMode: InputMode,
  targetDocument: Document
): void => {
  if (inputMode === newInputMode) {
    return;
  }

  const actionRequired =
    isFocusDriven(inputMode) !== isFocusDriven(newInputMode);

  inputMode = newInputMode;

  if (actionRequired) {
    if (!isFocusDriven(inputMode)) {
      targetDocument.body.classList.remove('fui-gamepad-mode');
      Array.from(targetDocument.body.querySelectorAll('select')).map((e) =>
        e.removeAttribute(selectOptionsVisibleAttribute)
      );
    } else {
      targetDocument.body.classList.add('fui-gamepad-mode');
    }
  }
};

/*
    Polling Mode
*/

let pollingEnabled = false;

export const isPollingEnabled = (): boolean => {
  return pollingEnabled;
};

/**
 * Sets whether polling is enabled for the library
 *
 *  @param enabled - whether gamepad navigation polling should now be enabled
 * @param targetDocument - the document to dispatch the event to
 */
export const setPollingEnabled = (
  enabled: boolean,
  targetDocument: Document
): void => {
  if (pollingEnabled === enabled) {
    return;
  }
  pollingEnabled = enabled;

  if (pollingEnabled) {
    resetGamepadState(GamepadButton.A);
    startGamepadPolling(targetDocument);

    if (isFocusDriven(defaultInputMode)) {
      setInputMode(defaultInputMode, targetDocument);
    }
  } else {
    setInputMode(InputMode.Mouse, targetDocument);
    stopGamepadPolling(targetDocument);
    clearAllTimeouts(targetDocument);
  }
};

/*
    Buttons
*/

// Handles standard button input.
export const onButtonPress = (
  button: GamepadButton,
  action: GamepadAction,
  gamepadId: number,
  targetDocument: Document
): void => {
  const wasFocusDriven = isFocusDriven(inputMode);

  // We are going from touch/mouse to keyboard/gamepad. Only return if the currentlyFocusedInteractable
  // is on-screen. We want the user to be able to immediately start scrolling
  if (inputMode !== InputMode.Gamepad) {
    setInputMode(InputMode.Gamepad, targetDocument);
    if (button === GamepadButton.A) {
      resetGamepadState(button, gamepadId);
    }
  }

  if (!wasFocusDriven) {
    return;
  }

  let focusDirection: FocusDirection = FocusDirection.None;
  let focusAction: KeyboardKey | undefined;
  switch (button) {
    case GamepadButton.A:
      focusAction = KeyboardKey.Enter;
      break;
    case GamepadButton.B:
      focusAction = KeyboardKey.Escape;
      break;
    case GamepadButton.DpadUp:
      focusDirection = FocusDirection.Up;
      break;
    case GamepadButton.DpadDown:
      focusDirection = FocusDirection.Down;
      break;
    case GamepadButton.DpadLeft:
      focusDirection = FocusDirection.Left;
      break;
    case GamepadButton.DpadRight:
      focusDirection = FocusDirection.Right;
      break;
  }

  // only handle botton down events
  if (action === GamepadAction.Down && focusAction) {
    emitSyntheticGroupperMoveFocusEvent(focusAction, targetDocument);
  }
  if (focusDirection !== FocusDirection.None) {
    if (action === GamepadAction.Down) {
      registerDirectionalInput(
        targetDocument,
        focusDirection,
        DirectionalSource.Dpad,
        gamepadId
      );
    } else {
      unregisterDirectionalInput(
        targetDocument,
        focusDirection,
        DirectionalSource.Dpad,
        gamepadId
      );
    }
  }
};

/*
    Left Stick
*/

// Lock for stick input so we don't navigate right away after receiving first gamepad input
// If we don't have this set up, we would navigate first without a focus border present to show
// the user what is happening
const leftStickLock = new Map<number, boolean>();
const leftStickDirections: Map<number, FocusDirection> = new Map();

/**
 * Handles left stick navigation
 *
 *  @param xAxis - the x axis value, -1 to 1
 *  @param yAxis - the y axis value, -1 to 1
 *  @param gamepadId - the key of the gamepad whose input we're processing
 * @param targetDocument - the document to dispatch the event to
 */
export const onLeftStickInput = (
  xAxis: number,
  yAxis: number,
  gamepadId: number,
  targetDocument: Document
): void => {
  // Check if joysticks pass our threshold
  if (
    !leftStickLock.get(gamepadId) &&
    (Math.abs(xAxis) > 0.8 || Math.abs(yAxis) > 0.8)
  ) {
    const wasFocusDriven = isFocusDriven(inputMode);

    setInputMode(InputMode.Gamepad, targetDocument);

    if (!wasFocusDriven) {
      return;
    }

    let newLeftStickDirection: FocusDirection;
    if (Math.abs(yAxis) >= Math.abs(xAxis)) {
      // y axis has greater strength, so lets use that value
      newLeftStickDirection =
        yAxis < 0 ? FocusDirection.Up : FocusDirection.Down;
    } else {
      newLeftStickDirection =
        xAxis < 0 ? FocusDirection.Left : FocusDirection.Right;
    }

    const leftStickDirection = leftStickDirections.get(gamepadId);
    if (leftStickDirection !== newLeftStickDirection) {
      if (leftStickDirection) {
        unregisterDirectionalInput(
          targetDocument,
          leftStickDirection,
          DirectionalSource.LeftStick,
          gamepadId
        );
      }
      leftStickDirections.set(gamepadId, newLeftStickDirection);
    }

    registerDirectionalInput(
      targetDocument,
      newLeftStickDirection,
      DirectionalSource.LeftStick,
      gamepadId
    );
  } else {
    const leftStickDirection = leftStickDirections.get(gamepadId);
    if (leftStickDirection) {
      unregisterDirectionalInput(
        targetDocument,
        leftStickDirection,
        DirectionalSource.LeftStick,
        gamepadId
      );
    }
  }
  if (Math.abs(xAxis) < 0.8 && Math.abs(yAxis) < 0.8) {
    leftStickLock.set(gamepadId, false);
  }
};

/*
    Directional Input
*/

// Faster delay between key repeats after the user has held the key enough for directionRepeatThreshold
const REPEAT_KEY_DELAY_FAST_MS_DEFAULT = 300;
const REPEAT_KEY_DELAY_FAST_MS_HORIZONTAL = 100;

// Initial delay before repeating the same key if button is still held down
const REPEAT_KEY_DELAY_SLOW_MS_DEFAULT = 400;
const REPEAT_KEY_DELAY_SLOW_MS_HORIZONTAL = 200;

// The number of direction repeats before we speed up the key repeat to fast
const DIRECTION_REPEAT_THRESHOLD = 3;

// Delay before starting key repeat
const DELAY_UNTIL_KEY_REPEAT_MS = 50;

// Timers for repeating direction input when it's held down
let directionDelayTimer: TimeoutId;
let directionRepeatInterval: IntervalId;

// The number of direction repeats during the slow speed
let directionRepeatCount = 0;

// Type representing an item in the input stack.
// It is marked as Readonly to ensure immutability.
type InputStackItem = Readonly<{
  direction: FocusDirection; // The navigation direction of the input
  source: DirectionalSource; // The source of the input (e.g., stick, dpad, keyboard)
  gamepadId?: number; // Optional gamepad identifier for the input source
}>;

// Stack to keep track of input directions and sources.
let inputStack: InputStackItem[] = [];

/**
 * Clears any ongoing input direction repetitions.
 * This is typically used to reset the state of repeated navigations.
 */
export const clearDirectionRepeats = (targetDocument: Document): void => {
  targetDocument.defaultView?.clearTimeout(directionDelayTimer);
  targetDocument.defaultView?.clearInterval(directionRepeatInterval);
  directionRepeatCount = 0;
};

export const clearDirectionalInputStack = (): void => {
  inputStack.length = 0;
};

/**
 * Handles the disconnection of a gamepad.
 * Removes all inputs associated with the disconnected gamepad from the input stack.
 * @param targetDocument - The document to dispatch the event to.
 * @param gamepadId - The identifier of the disconnected gamepad.
 */
export const handleGamepadDisconnect = (
  targetDocument: Document,
  gamepadId: number
): void => {
  const previousDirection = getCurrentFocusDirection();

  // Filter out all entries with the disconnected gamepadId
  inputStack = inputStack.filter(
    (item) =>
      item.source === DirectionalSource.ArrowKey || item.gamepadId !== gamepadId
  );

  const currentDirection = getCurrentFocusDirection();

  // Trigger directional input action if the focus direction has changed
  if (previousDirection !== currentDirection) {
    onDirectionalInput(targetDocument, currentDirection);
  }
};

/**
 * Registers a directional input into the input stack.
 * Prevents adding duplicate inputs (same direction, source, and gamepadId) to the stack.
 * @param targetDocument - The document to dispatch the event to.
 * @param direction - The direction of the input.
 * @param source - The source of the input.
 * @param gamepadId - The gamepad identifier.
 */
const registerDirectionalInput = (
  targetDocument: Document,
  direction: FocusDirection,
  source: DirectionalSource,
  gamepadId = 0
): void => {
  const previousDirection = getCurrentFocusDirection();

  // Check if the same input already exists in the stack
  const alreadyExists = inputStack.some(
    (item) =>
      item.direction === direction &&
      item.source === source &&
      (source !== DirectionalSource.ArrowKey
        ? item.gamepadId === gamepadId
        : true)
  );

  if (alreadyExists) {
    return;
  }

  // Add the input to the stack if it's not already present
  const newItem: InputStackItem = {
    direction,
    source,
    ...(source !== DirectionalSource.ArrowKey && { gamepadId: gamepadId }),
  };
  inputStack.push(newItem);

  // Trigger directional input action if the focus direction has changed
  if (previousDirection !== direction) {
    onDirectionalInput(targetDocument, direction);
  }
};

/**
 * Unregisters a directional input from the input stack.
 * @param targetDocument - The document to dispatch the event to.
 * @param direction - The direction of the input to be removed.
 * @param source - The source of the input to be removed.
 * @param gamepadId - The gamepad identifier.
 */
const unregisterDirectionalInput = (
  targetDocument: Document,
  direction: FocusDirection,
  source: DirectionalSource,
  gamepadId = 0
): void => {
  const previousDirection = getCurrentFocusDirection();

  // Find and remove the specified input from the stack
  const index = inputStack.findIndex(
    (item) =>
      item.direction === direction &&
      item.source === source &&
      (item.source !== DirectionalSource.ArrowKey
        ? item.gamepadId === gamepadId
        : true)
  );

  if (index > -1) {
    inputStack.splice(index, 1);
  }

  // Trigger directional input action if the focus direction has changed
  const currentDirection = getCurrentFocusDirection();

  if (previousDirection !== currentDirection) {
    onDirectionalInput(targetDocument, currentDirection);
  }
};

/**
 * Retrieves the current focus direction based on the top of the input stack.
 * @returns The current focus direction or undefined if the stack is empty.
 */
const getCurrentFocusDirection = (): FocusDirection | undefined => {
  if (inputStack.length > 0) {
    return inputStack[inputStack.length - 1].direction;
  }
};

/**
 * Handles directional input actions and sets up repetition behavior.
 * @param direction - The current focus direction to navigate.
 */
const onDirectionalInput = (
  targetDocument: Document,
  direction?: FocusDirection
) => {
  clearDirectionRepeats(targetDocument);

  // If there's no direction, no further action is needed
  if (!direction) {
    return;
  }

  // Initial navigation in the specified direction
  navigate(direction, targetDocument);

  // Setting up repeating navigation based on the direction
  const isHorizontal =
    direction === FocusDirection.Left || direction === FocusDirection.Right;

  directionDelayTimer = targetDocument.defaultView?.setTimeout(() => {
    directionRepeatInterval = targetDocument.defaultView?.setInterval(
      () => {
        directionRepeatCount += 1;
        navigate(direction, targetDocument);

        // After reaching a threshold, increase the repeat rate
        if (directionRepeatCount >= DIRECTION_REPEAT_THRESHOLD) {
          targetDocument.defaultView?.clearInterval(directionRepeatInterval);
          directionRepeatInterval = targetDocument.defaultView?.setInterval(
            () => {
              navigate(direction, targetDocument);
            },
            isHorizontal
              ? REPEAT_KEY_DELAY_FAST_MS_HORIZONTAL
              : REPEAT_KEY_DELAY_FAST_MS_DEFAULT
          );
        }
      },
      isHorizontal
        ? REPEAT_KEY_DELAY_SLOW_MS_HORIZONTAL
        : REPEAT_KEY_DELAY_SLOW_MS_DEFAULT
    );
  }, DELAY_UNTIL_KEY_REPEAT_MS);
};
