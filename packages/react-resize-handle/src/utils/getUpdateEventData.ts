import { EVENTS } from '../hooks/useResizeHandle';
import type {
  ResizeHandleChangeEvent,
  ResizeHandleUpdateEventData,
} from '../hooks/useResizeHandle';

export const getUpdateEventData = (
  event: ResizeHandleChangeEvent,
  value: number
): ResizeHandleUpdateEventData => {
  if ('touches' in event) {
    return {
      type: EVENTS.touch,
      value,
      event: event as TouchEvent,
    };
  } else if ('key' in event) {
    return {
      type: EVENTS.keyboard,
      value,
      event: event as KeyboardEvent,
    };
  } else if ('buttons' in event) {
    return {
      type: EVENTS.mouse,
      value,
      event: event as MouseEvent,
    };
  } else if (event.type === EVENTS.setValue) {
    return {
      type: EVENTS.setValue,
      value,
      event: event as CustomEvent,
    };
  } else if (event.type === EVENTS.handleRef) {
    return {
      type: EVENTS.handleRef,
      value,
      event: event as CustomEvent,
    };
  } else if (event.type === EVENTS.wrapperRef) {
    return {
      type: EVENTS.wrapperRef,
      value,
      event: event as CustomEvent,
    };
  } else if (event.type === EVENTS.elementRef) {
    return {
      type: EVENTS.elementRef,
      value,
      event: event as CustomEvent,
    };
  } else if (process.env.NODE_ENV !== 'production') {
    console.error(
      "react-resize-handle: Event type doesn't match any of the expected types."
    );
  }

  return {
    type: EVENTS.unknown,
    value,
    event: event as CustomEvent,
  };
};
