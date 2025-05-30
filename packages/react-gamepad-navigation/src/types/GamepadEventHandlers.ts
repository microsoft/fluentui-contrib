export type GamepadEventHandlers = {
  onTouchStart: (e: TouchEvent) => void;
  onMouseDown: (e: MouseEvent) => void;
  onGamepadConnected: (e: GamepadEvent) => void;
  onGamepadDisconnected: (e: GamepadEvent) => void;
  onTargetWindowBlur: () => void;
  onTargetWindowFocus: () => void;
};
