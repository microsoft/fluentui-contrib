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

export enum KeyPressState {
  Down = 1,
  Up = 0,
  Reset = -1,
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
    Keyboard Keys
*/

export enum KeyboardKey {
  Enter = 'Enter',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  Escape = 'Escape',
  None = 'None',
}
