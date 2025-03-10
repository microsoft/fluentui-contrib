import { MoverKeys as TabsterMoverKeys } from '@fluentui/react-tabster';

/*
    Gamepad Buttons, State, & Actions
*/

export const GamepadButton = {
  A: 'A',
  B: 'B',
  X: 'X',
  Y: 'Y',
  LB: 'LB',
  RB: 'RB',
  DpadUp: 'DpadUp',
  DpadDown: 'DpadDown',
  DpadLeft: 'DpadLeft',
  DpadRight: 'DpadRight',
} as const;

export type GamepadButton = (typeof GamepadButton)[keyof typeof GamepadButton];

export const KeyPressState = {
  Down: 1,
  Up: 0,
  Reset: -1,
} as const;

export type KeyPressState = (typeof KeyPressState)[keyof typeof KeyPressState];

export type GamepadState = {
  [key in GamepadButton]: KeyPressState;
} & {
  timestamp: number;
};

export const GamepadAction = {
  Down: 'gamepadDown',
  Up: 'gamepadUp',
} as const;

export type GamepadAction = (typeof GamepadAction)[keyof typeof GamepadAction];

/*
    Keyboard Keys
*/

export const KeyboardKey = {
  Enter: 'Enter',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Escape: 'Escape',
  None: 'None',
} as const;

export type KeyboardKey = (typeof KeyboardKey)[keyof typeof KeyboardKey];

export const MoverKeys = TabsterMoverKeys;

export type MoverKey = (typeof TabsterMoverKeys)[keyof typeof TabsterMoverKeys];
