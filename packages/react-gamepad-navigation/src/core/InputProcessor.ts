import {
  GamepadAction,
  GamepadButton,
  GamepadState,
  KeyPressState,
} from '../types/Keys';
import {
  ControllerMapping,
  getControllerMappingKeyFromGamepadButton,
} from './GamepadMappings';
import { getGamepadStates } from '../hooks/useGamepadNavigation';
import { onButtonPress, onLeftStickInput } from './InputManager';

/*
    Analog State Keeping
*/

// Without this, we would accidentally clear the directionRepeatTimer if used for DPAD.
const leftStickPreviousX = new Map<number, number>();
const leftStickPreviousY = new Map<number, number>();

/*
    Gamepad Input Processors
*/

/**
 * Resets the gamepad state for the given gamepad button
 *
 * @param gamepadButton The button whose state we are resetting
 * @param gamepadId Optional, a specific gamepad to reset. If not supplied, all gamepads' state for the given button will be reset.
 */
export const resetGamepadState = (
  gamepadButton: GamepadButton,
  gamepadId?: number
): void => {
  const gamepadStates = getGamepadStates();

  if (gamepadId === undefined) {
    gamepadStates.forEach((gamepadState) => {
      gamepadState[gamepadButton] = KeyPressState.Reset;
    });
  } else {
    const gamepadState = gamepadStates.get(gamepadId);
    if (gamepadState) {
      gamepadState[gamepadButton] = KeyPressState.Reset;
    }
  }
};

const handleGamepadButton = (
  gamepadId: number,
  gamepadMappings: ControllerMapping,
  gamepadState: GamepadState,
  gamepadButton: GamepadButton,
  nextGamepadButtonState: KeyPressState,
  targetDocument: Document
) => {
  const controllerMappingKey =
    getControllerMappingKeyFromGamepadButton(gamepadButton);
  if (!controllerMappingKey) {
    return;
  }

  if (gamepadMappings[controllerMappingKey].isButton) {
    if (
      gamepadState[gamepadButton] === KeyPressState.Up &&
      nextGamepadButtonState === KeyPressState.Down
    ) {
      gamepadState[gamepadButton] = KeyPressState.Down;

      onButtonPress(
        gamepadButton,
        GamepadAction.Down,
        gamepadId,
        targetDocument
      );
    } else if (
      gamepadState[gamepadButton] === KeyPressState.Down &&
      nextGamepadButtonState === KeyPressState.Up
    ) {
      gamepadState[gamepadButton] = KeyPressState.Up;
      onButtonPress(gamepadButton, GamepadAction.Up, gamepadId, targetDocument);
    } else if (
      gamepadState[gamepadButton] === KeyPressState.Reset &&
      nextGamepadButtonState === KeyPressState.Up
    ) {
      gamepadState[gamepadButton] = KeyPressState.Up;
    }
  }
};

export const handleGamepadInput = (
  gamepad: Gamepad,
  gamepadId: number,
  gamepadMappings: ControllerMapping,
  gamepadState: GamepadState,
  targetDocument: Document
): void => {
  /*
        Buttons
    */

  for (
    let buttonIndex = 0;
    buttonIndex < gamepad.buttons.length;
    buttonIndex++
  ) {
    const nextGamepadButtonState = gamepad.buttons[buttonIndex].pressed
      ? KeyPressState.Down
      : KeyPressState.Up;

    let gamepadButton: GamepadButton | undefined;
    switch (buttonIndex) {
      case gamepadMappings.a.index:
        gamepadButton = GamepadButton.A;
        break;
      case gamepadMappings.b.index:
        gamepadButton = GamepadButton.B;
        break;
      case gamepadMappings.x.index:
        gamepadButton = GamepadButton.X;
        break;
      case gamepadMappings.y.index:
        gamepadButton = GamepadButton.Y;
        break;
      case gamepadMappings.lb.index:
        gamepadButton = GamepadButton.LB;
        break;
      case gamepadMappings.rb.index:
        gamepadButton = GamepadButton.RB;
        break;
      case gamepadMappings.dpadLeft.index:
        gamepadButton = GamepadButton.DpadLeft;
        break;
      case gamepadMappings.dpadRight.index:
        gamepadButton = GamepadButton.DpadRight;
        break;
      case gamepadMappings.dpadUp.index:
        gamepadButton = GamepadButton.DpadUp;
        break;
      case gamepadMappings.dpadDown.index:
        gamepadButton = GamepadButton.DpadDown;
        break;
    }

    if (gamepadButton) {
      handleGamepadButton(
        gamepadId,
        gamepadMappings,
        gamepadState,
        gamepadButton,
        nextGamepadButtonState,
        targetDocument
      );
    }
  }

  /*
        Left Stick
    */

  const leftStickX = gamepadMappings.leftStickX.isButton
    ? gamepad.buttons[gamepadMappings.leftStickX.index].value
    : gamepad.axes[gamepadMappings.leftStickX.index];

  let sameLeftStickX = false;
  if (!leftStickPreviousX.has(gamepadId)) {
    leftStickPreviousX.set(gamepadId, leftStickX);
  } else {
    if (leftStickPreviousX.get(gamepadId) === leftStickX) {
      sameLeftStickX = true;
    } else {
      leftStickPreviousX.set(gamepadId, leftStickX);
    }
  }

  const leftStickY = gamepadMappings.leftStickY.isButton
    ? gamepad.buttons[gamepadMappings.leftStickY.index].value
    : gamepad.axes[gamepadMappings.leftStickY.index];

  let sameLeftStickY = false;
  if (!leftStickPreviousY.has(gamepadId)) {
    leftStickPreviousY.set(gamepadId, leftStickY);
  } else {
    if (leftStickPreviousY.get(gamepadId) === leftStickY) {
      sameLeftStickY = true;
    } else {
      leftStickPreviousY.set(gamepadId, leftStickY);
    }
  }

  if (!sameLeftStickX || !sameLeftStickY) {
    onLeftStickInput(leftStickX, leftStickY, gamepadId, targetDocument);
  }
};
