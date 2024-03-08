import {
  Announcements,
  DragEndEvent,
  DragMoveEvent,
  Modifier,
  SensorDescriptor,
  SensorOptions,
} from '@dnd-kit/core';
import { DialogProps } from '@fluentui/react-components';
import { DraggableDialogContextValue } from '../../contexts/DraggableDialogContext';

export type DraggableDialogMarginAxis = {
  mainAxis?: number;
  crossAxis?: number;
};

export type DraggableDialogMarginViewport = {
  top?: number;
  end?: number;
  bottom?: number;
  start?: number;
};

export type DraggableDialogMargin =
  | number
  | DraggableDialogMarginAxis
  | DraggableDialogMarginViewport;

export type DraggableDialogPosition = {
  x: number;
  y: number;
};

export type DraggableDialogProps = DialogProps & {
  /**
   * Unique identifier for the draggable dialog.
   */
  id?: string;

  /**
   * Element to be used as a boundary when dragging the dialog.
   * @default viewport
   */
  boundary?: React.RefObject<HTMLElement> | 'viewport' | null;

  /**
   * The margin from the boundary to keep the element in when dragged. Only used when boundary is set.
   * @default 0
   */
  margin?: DraggableDialogMargin;

  /**
   * Initial position of the dialog.
   * - Only works when boundary is set.
   * - If not set, the dialog will be centered within the boundary.
   * - If set, the dialog will be positioned at the specified coordinates, relative to the boundary.
   * @default null
   */
  position?: DraggableDialogPosition;

  /**
   * Event triggered when the dialog is dragged.
   */
  onPositionChange?: (position: { x: number; y: number }) => void;

  /**
   * Text to be announced by screen readers when the dialog is dragged.
   */
  announcements?: {
    /**
     * Announces the start of a drag action.
     */
    start?: string;

    /**
     * Announces the end of a drag action.
     */
    end?: string;
  };
};

/**
 * Represents the state of a draggable dialog component.
 */
export type DraggableDialogState = {
  /**
   * Sensors used for the DndKit drag and drop system.
   */
  sensors: SensorDescriptor<SensorOptions>[];

  /**
   * The modifiers to apply to the draggable dialog.
   */
  modifiers: Modifier[];

  /**
   * Accessibility props to apply to the draggable dialog.
   * Currently only used for screen reader announcements.
   */
  accessibility?: {
    announcements: Partial<Announcements>;
  };

  /**
   * Event triggered when drag movement finishes.
   */
  onDragEnd: (event: DragEndEvent) => void;

  /**
   * Event triggered when drag movement occurs.
   */
  onDragMove: (event: DragMoveEvent) => void;

  /**
   * The context value to provide to child components.
   */
  contextValue: DraggableDialogContextValue;

  /**
   * The props to apply to the dialog.
   */
  dialogProps: DialogProps;
};
