import {
  Announcements,
  DragEndEvent,
  Modifier,
  SensorDescriptor,
  SensorOptions,
} from '@dnd-kit/core';
import { DialogProps } from '@fluentui/react-components';
import { DraggableDialogContextValue } from '../../contexts/DraggableDialogContext';

export type DraggableMarginAxis = {
  mainAxis?: number;
  crossAxis?: number;
};

export type DraggableMarginViewport = {
  top?: number;
  end?: number;
  bottom?: number;
  start?: number;
};

export type DraggableMargin =
  | number
  | DraggableMarginAxis
  | DraggableMarginViewport;

export type DraggableDialogProps = DialogProps & {
  /**
   * Unique identifier for the draggable dialog.
   */
  id?: string;

  /**
   * Whether the element should remain in the viewport when dragged.
   * @default true
   */
  keepInViewport?: boolean;

  /**
   * The margin from the viewport to keep the element in when dragged. Only used when keepInViewport is true.
   * @default 0
   */
  margin?: DraggableMargin;

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
  accessibilityProps?: {
    announcements: Partial<Announcements>;
  };

  /**
   * Event triggered when drag movement starts.
   */
  onDragStart: () => void;

  /**
   * Event triggered when drag movement finishes.
   */
  onDragEnd: (event: DragEndEvent) => void;

  /**
   * The context value to provide to child components.
   */
  contextValue: DraggableDialogContextValue;

  /**
   * The props to apply to the dialog.
   */
  dialogProps: DialogProps;
};
