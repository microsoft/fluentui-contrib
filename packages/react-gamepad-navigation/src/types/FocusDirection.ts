import { MoverKeys } from './Keys';

export const FocusDirection = {
  None: 0,
  Up: MoverKeys.ArrowUp,
  Down: MoverKeys.ArrowDown,
  Left: MoverKeys.ArrowLeft,
  Right: MoverKeys.ArrowRight,
} as const;

export type FocusDirection =
  (typeof FocusDirection)[keyof typeof FocusDirection];
