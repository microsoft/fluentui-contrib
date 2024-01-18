import { DialogSurfaceProps } from '@fluentui/react-components';

export type DraggableDialogSurfaceProps = DialogSurfaceProps & {
  /**
   * The element that will be draggable.
   * Only one child is allowed.
   * @required
   */
  children: JSX.Element;
};
