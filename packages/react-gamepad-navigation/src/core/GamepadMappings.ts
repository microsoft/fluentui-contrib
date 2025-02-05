import { GamepadButton, KeyboardKey, MoverKey, MoverKeys } from '../types/Keys';
import { consolePrefix } from './Constants';

type ControllerIndex = {
  index: number;
  isButton: boolean;
};

export type ControllerMapping = {
  a: ControllerIndex;
  b: ControllerIndex;
  x: ControllerIndex;
  y: ControllerIndex;
  lb: ControllerIndex;
  rb: ControllerIndex;
  dpadUp: ControllerIndex;
  dpadDown: ControllerIndex;
  dpadLeft: ControllerIndex;
  dpadRight: ControllerIndex;
  leftStickX: ControllerIndex;
  leftStickY: ControllerIndex;
  leftTrigger: ControllerIndex;
  rightTrigger: ControllerIndex;
};

const gamepadButtonToControllerMappingKey: Map<
  GamepadButton,
  keyof ControllerMapping
> = new Map([
  [GamepadButton.A, 'a'],
  [GamepadButton.B, 'b'],
  [GamepadButton.X, 'x'],
  [GamepadButton.Y, 'y'],
  [GamepadButton.LB, 'lb'],
  [GamepadButton.RB, 'rb'],
  [GamepadButton.DpadUp, 'dpadUp'],
  [GamepadButton.DpadDown, 'dpadDown'],
  [GamepadButton.DpadLeft, 'dpadLeft'],
  [GamepadButton.DpadRight, 'dpadRight'],
]);

export const getControllerMappingKeyFromGamepadButton = (
  button: GamepadButton
) => gamepadButtonToControllerMappingKey.get(button);

export const defaultMapping: ControllerMapping = {
  a: { index: 0, isButton: true },
  b: { index: 1, isButton: true },
  x: { index: 2, isButton: true },
  y: { index: 3, isButton: true },
  lb: { index: 4, isButton: true },
  rb: { index: 5, isButton: true },
  dpadLeft: { index: 14, isButton: true },
  dpadRight: { index: 15, isButton: true },
  dpadUp: { index: 12, isButton: true },
  dpadDown: { index: 13, isButton: true },
  leftTrigger: { index: 6, isButton: true },
  rightTrigger: { index: 7, isButton: true },
  leftStickX: { index: 0, isButton: false },
  leftStickY: { index: 1, isButton: false },
};

let gamepadMappings: ControllerMapping | undefined;

export const getGamepadMappings = () => {
  if (gamepadMappings) {
    return gamepadMappings;
  }

  console.log(consolePrefix, 'Using default mappings for gamepad navigation');
  gamepadMappings = defaultMapping;

  return gamepadMappings;
};

const moverKeyToKeyboardKeyMapping: Map<MoverKey, KeyboardKey> = new Map([
  [MoverKeys.ArrowLeft, KeyboardKey.ArrowLeft],
  [MoverKeys.ArrowRight, KeyboardKey.ArrowRight],
  [MoverKeys.ArrowUp, KeyboardKey.ArrowUp],
  [MoverKeys.ArrowDown, KeyboardKey.ArrowDown],
]);

export const getMoverKeyToKeyboardKeyMapping = (key: MoverKey) =>
  moverKeyToKeyboardKeyMapping.get(key) ?? KeyboardKey.None;
