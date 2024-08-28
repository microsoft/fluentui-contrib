import { EVENTS } from '../hooks/useResizeHandle';
import type {
  ResizeHandleChangeEvent,
  ResizeHandleUpdateEventData,
} from '../hooks/useResizeHandle';

export function getUpdateEventData(
  event: null,
  value: number
): { value: number };
export function getUpdateEventData(
  event: ResizeHandleChangeEvent,
  value: number
): ResizeHandleUpdateEventData;
export function getUpdateEventData(
  event: ResizeHandleChangeEvent | null,
  value: number
): ResizeHandleUpdateEventData | { value: number } {
  if (event) {
    if ('touches' in event) {
      return {
        type: EVENTS.touch,
        value,
        event: event as TouchEvent,
      };
    }

    if ('key' in event) {
      return {
        type: EVENTS.keyboard,
        value,
        event: event as KeyboardEvent,
      };
    }

    if ('buttons' in event) {
      return {
        type: EVENTS.mouse,
        value,
        event: event as MouseEvent,
      };
    }
  }

  return { value };
}
