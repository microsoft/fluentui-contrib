import { DialogSurfaceProps } from '@fluentui/react-components';

export type DraggableDialogSurfaceProps = DialogSurfaceProps;

export type DraggableDialogSurfaceState = {
  /**
   * Ref to the draggable dialog surface.
   */
  ref: React.RefObject<HTMLDivElement>;

  /**
   * Style to apply to the draggable dialog surface.
   */
  style: React.CSSProperties | undefined;
};
