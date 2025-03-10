export const DirectionalSource = {
  Dpad: 'Dpad',
  LeftStick: 'LeftStick',
  ArrowKey: 'ArrowKey',
} as const;

export type DirectionalSource =
  (typeof DirectionalSource)[keyof typeof DirectionalSource];
