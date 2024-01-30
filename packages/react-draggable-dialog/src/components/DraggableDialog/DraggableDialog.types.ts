import { DialogProps } from '@fluentui/react-components';

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
