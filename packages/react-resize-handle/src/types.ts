import { EventData } from '@fluentui/react-utilities';

export type GrowDirection = 'end' | 'start' | 'up' | 'down';
export type SupportedKeys =
  | 'ArrowRight'
  | 'ArrowLeft'
  | 'ArrowUp'
  | 'ArrowDown';

export const UNMEASURED = -1;

export const EVENTS = {
  keyboard: 'onChange_keyboard',
  touch: 'onChange_touch',
  mouse: 'onChange_mouse',
  setValue: 'onChange_setValue',
  handleRef: 'onChange_handleRef',
  wrapperRef: 'onChange_wrapperRef',
  elementRef: 'onChange_elementRef',
} as const;

export type ResizeHandleUpdateEventData = (
  | EventData<typeof EVENTS.keyboard, KeyboardEvent>
  | EventData<typeof EVENTS.touch, TouchEvent>
  | EventData<typeof EVENTS.mouse, MouseEvent>
  | EventData<typeof EVENTS.setValue, CustomEvent>
  | EventData<typeof EVENTS.handleRef, CustomEvent>
  | EventData<typeof EVENTS.wrapperRef, CustomEvent>
  | EventData<typeof EVENTS.elementRef, CustomEvent>
) & { value: number };
