/* eslint-disable no-restricted-globals */

import { InputMode, isFocusDriven } from '../types/InputMode';
import { GamepadAction, GamepadButton, KeyboardKey } from '../types/Keys';
import {
  consolePrefix,
  emitSyntheticKeyboardEvent,
  startGamepadPolling,
  stopGamepadPolling,
} from './GamepadNavigation';
import { resetGamepadState } from './InputProcessor';

/*
    General
*/

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
 * Getter for the current input mode
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
 *  @param changeFocus - whether we should change focus to the last known focused interactable
 */
export const setInputMode = (
  newInputMode: InputMode,
  changeFocus = true
): void => {
  if (inputMode === newInputMode) {
    return;
  }

  const actionRequired =
    isFocusDriven(inputMode) !== isFocusDriven(newInputMode);

  inputMode = newInputMode;
  // GamepadEventEmitter.emit(InputModeEvent.Change, inputMode);

  if (actionRequired) {
    if (!isFocusDriven(inputMode)) {
      document.body.classList.remove('gamepadmode');
      if (changeFocus) {
        // blurCurrentFocus();
      }
    } else {
      document.body.classList.add('gamepadmode');
      if (changeFocus && isPollingEnabled()) {
        // const currentlyFocusedInteractable = getCurrentlyFocusedInteractable();
        // if (currentlyFocusedInteractable) {
        //   if (isViewOnParentContainer(currentlyFocusedInteractable)) {
        //     currentlyFocusedInteractable.focus();
        //     return;
        //   } else {
        //     clearCurrentFocus();
        //     focusStartingPoint();
        //   }
        // } else {
        //   focusStartingPoint();
        // }
      }
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
 */
export const setPollingEnabled = (enabled: boolean): void => {
  if (pollingEnabled === enabled) {
    return;
  }
  pollingEnabled = enabled;

  if (pollingEnabled) {
    console.log(consolePrefix, 'Enabling controller navigation');

    resetGamepadState(GamepadButton.A);
    startGamepadPolling();
    if (isFocusDriven(defaultInputMode)) {
      setInputMode(defaultInputMode);
    }
  } else {
    console.log(consolePrefix, 'Disabling controller navigation');

    setInputMode(InputMode.Mouse);
    stopGamepadPolling();
  }
};

/*
    Buttons
*/

// Handles standard button input.
export const onButtonPress = (
  button: GamepadButton,
  action: GamepadAction,
  gamepadId: number
): void => {
  // const currentlyFocusedInteractable = getCurrentlyFocusedInteractable();

  // We are going from touch/mouse to keyboard/gamepad. Only return if the currentlyFocusedInteractable
  // is on-screen. We want the user to be able to immediately start scrolling
  if (inputMode !== InputMode.Gamepad) {
    setInputMode(InputMode.Gamepad, true);
    if (button === GamepadButton.A) {
      resetGamepadState(button, gamepadId);
    }
  }

  if (document.activeElement) {
    // emitSyntheticButtonEvent(button, action, document.activeElement);
  }

  switch (button) {
    case GamepadButton.A:
      switch (action) {
        case GamepadAction.Down: {
          emitSyntheticKeyboardEvent('keydown', KeyboardKey.Enter);
          break;
        }
        case GamepadAction.Up: {
          emitSyntheticKeyboardEvent('keyup', KeyboardKey.Enter);
          break;
        }
      }
      break;
    case GamepadButton.B:
      switch (action) {
        case GamepadAction.Down: {
          emitSyntheticKeyboardEvent('keydown', KeyboardKey.Escape);
          break;
        }
        case GamepadAction.Up: {
          emitSyntheticKeyboardEvent('keyup', KeyboardKey.Escape);
          break;
        }
      }
      break;
    case GamepadButton.DpadUp:
    case GamepadButton.DpadDown:
    case GamepadButton.DpadLeft:
    case GamepadButton.DpadRight: {
      let arrowDirection: KeyboardKey;
      switch (button) {
        case GamepadButton.DpadUp:
          arrowDirection = KeyboardKey.ArrowUp;
          break;
        case GamepadButton.DpadDown:
          arrowDirection = KeyboardKey.ArrowDown;
          break;
        case GamepadButton.DpadLeft:
          arrowDirection = KeyboardKey.ArrowLeft;
          break;
        case GamepadButton.DpadRight:
          arrowDirection = KeyboardKey.ArrowRight;
      }
      switch (action) {
        case GamepadAction.Down: {
          emitSyntheticKeyboardEvent('keydown', arrowDirection);
          break;
        }
        case GamepadAction.Up: {
          emitSyntheticKeyboardEvent('keyup', arrowDirection);
          break;
        }
      }
      return;
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
const leftStickDirections: Map<number, KeyboardKey> = new Map();

/**
 * Handles left stick navigation
 *
 *  @param xAxis - the x axis value, -1 to 1
 *  @param yAxis - the y axis value, -1 to 1
 *  @param gamepadId - the key of the gamepad whose input we're processing
 */
export const onLeftStickInput = (
  xAxis: number,
  yAxis: number,
  gamepadId: number
): void => {
  // Check if joysticks pass our threshold
  if (
    !leftStickLock.get(gamepadId) &&
    (Math.abs(xAxis) > 0.8 || Math.abs(yAxis) > 0.8)
  ) {
    let newLeftStickDirection: KeyboardKey;
    if (Math.abs(yAxis) >= Math.abs(xAxis)) {
      // y axis has greater strength, so lets use that value
      newLeftStickDirection =
        yAxis < 0 ? KeyboardKey.ArrowUp : KeyboardKey.ArrowDown;
    } else {
      newLeftStickDirection =
        xAxis < 0 ? KeyboardKey.ArrowLeft : KeyboardKey.ArrowRight;
    }
    const leftStickDirection = leftStickDirections.get(gamepadId);
    if (leftStickDirection !== newLeftStickDirection) {
      if (leftStickDirection) {
        emitSyntheticKeyboardEvent('keyup', leftStickDirection);
      }
      leftStickDirections.set(gamepadId, newLeftStickDirection);
    }
    emitSyntheticKeyboardEvent('keydown', newLeftStickDirection);
  } else {
    const leftStickDirection = leftStickDirections.get(gamepadId);
    if (leftStickDirection) {
      emitSyntheticKeyboardEvent('keyup', leftStickDirection);
    }
  }
  if (Math.abs(xAxis) < 0.8 && Math.abs(yAxis) < 0.8) {
    leftStickLock.set(gamepadId, false);
  }
};
