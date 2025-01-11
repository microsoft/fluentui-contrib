export enum KeyPressState {
  Down = 1,
  Up = 0,
  Reset = -1,
}

/*
    Gamepad Buttons, State, & Actions
*/

export enum GamepadButton {
  A = 'A',
  B = 'B',
  X = 'X',
  Y = 'Y',
  LB = 'LB',
  RB = 'RB',
  DpadUp = 'DpadUp',
  DpadDown = 'DpadDown',
  DpadLeft = 'DpadLeft',
  DpadRight = 'DpadRight',
}

export type GamepadState = {
  [key in GamepadButton]: KeyPressState;
} & {
  timestamp: number;
};

export enum GamepadAction {
  Down = 'gamepadDown',
  Up = 'gamepadUp',
}

/*
    Keyboard Keys, State, & Actions
*/

export enum KeyboardKey {
  Enter = 'Enter',
  Escape = 'Escape',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
}

const NamedKeys = Object.values(KeyboardKey);

export const getIsNamedKey = (key: string): boolean =>
  NamedKeys.includes(key as KeyboardKey);

export type KeyboardState = Record<string, KeyPressState>;

export enum KeyboardAction {
  Down = 'keyboardDown',
  Up = 'keyboardUp',
  Repeat = 'keyboardRepeat',
}
