/* eslint-disable no-restricted-globals */

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
  } else {
    console.log(consolePrefix, 'Disabling controller navigation');
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
  if (button === GamepadButton.A) {
    resetGamepadState(button, gamepadId);
  }

  if (document.activeElement) {
    // emitSyntheticButtonEvent(button, action, document.activeElement);
  }

  let keyboardKey: KeyboardKey | undefined;
  switch (button) {
    case GamepadButton.A:
      keyboardKey = KeyboardKey.Enter;
      break;
    case GamepadButton.B:
      keyboardKey = KeyboardKey.Escape;
      break;
    case GamepadButton.DpadUp:
      keyboardKey = KeyboardKey.ArrowUp;
      break;
    case GamepadButton.DpadDown:
      keyboardKey = KeyboardKey.ArrowDown;
      break;
    case GamepadButton.DpadLeft:
      keyboardKey = KeyboardKey.ArrowLeft;
      break;
    case GamepadButton.DpadRight: {
      keyboardKey = KeyboardKey.ArrowRight;
      break;
    }
  }

  const actionType = action === GamepadAction.Down ? 'keydown' : 'keyup';
  if (keyboardKey) {
    emitSyntheticKeyboardEvent(actionType, keyboardKey);
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
