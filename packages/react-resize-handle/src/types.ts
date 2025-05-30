import type { EventData } from '@fluentui/react-utilities';

export type GrowDirection = 'end' | 'start' | 'up' | 'down';
export type SupportedKeys =
  | 'ArrowRight'
  | 'ArrowLeft'
  | 'ArrowUp'
  | 'ArrowDown';
export type CSSUnit = 'px' | 'viewport';
export type CSSUnitName = 'px' | 'vw' | 'vh';

export const UNMEASURED = -1;

export const EVENTS = {
  keyboard: 'keyboard',
  touch: 'touch',
  mouse: 'mouse',
  setValue: 'setValue',
  handleRef: 'handleRef',
  wrapperRef: 'wrapperRef',
  elementRef: 'elementRef',
} as const;

export type ResizeHandleUpdateEventData = (
  | EventData<typeof EVENTS.keyboard, KeyboardEvent>
  | EventData<typeof EVENTS.touch, TouchEvent>
  | EventData<typeof EVENTS.mouse, MouseEvent>
  | EventData<typeof EVENTS.setValue, CustomEvent>
  | EventData<typeof EVENTS.handleRef, CustomEvent>
  | EventData<typeof EVENTS.wrapperRef, CustomEvent>
  | EventData<typeof EVENTS.elementRef, CustomEvent>
) & { value: number; unit: CSSUnitName };
