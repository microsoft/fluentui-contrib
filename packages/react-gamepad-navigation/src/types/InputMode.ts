export const InputMode = {
  /** @member {string} */
  /** The last input was from user touch */
  Touch: 'Touch',

  /** @member {string} */
  /** The last input was from mouse click */
  Mouse: 'Mouse',

  /** @member {string} */
  /** the last input was from a gamepad */
  Gamepad: 'Gamepad',

  /** @member {string} */
  /** the last input was from a keyboard press */
  Keyboard: 'Keyboard',
} as const;

export type InputMode = (typeof InputMode)[keyof typeof InputMode];

/**
 * Returns whether the given input mode is focus-driven, i.e. gamepad/keyboard.
 * @returns true if focus driven, otherwise false
 */
export const isFocusDriven = (inputMode: InputMode): boolean => {
  return inputMode === InputMode.Gamepad || inputMode === InputMode.Keyboard;
};
