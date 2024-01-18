import * as React from 'react';

export type DraggableDialogHandleProps = React.HTMLAttributes<HTMLElement> & {
  /**
   * The element that will act as the handle for dragging the dialog.
   * Only one child is allowed.
   * @required
   */
  children: JSX.Element;
};
