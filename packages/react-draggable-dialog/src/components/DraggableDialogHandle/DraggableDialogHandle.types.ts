import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners';
import * as React from 'react';

export type DraggableDialogHandleProps = React.HTMLAttributes<HTMLElement> & {
  /**
   * The element that will act as the handle for dragging the dialog.
   * Only one child is allowed.
   * @required
   */
  children: React.ReactElement;
};

export type DraggableDialogHandleState = {
  /**
   * The ref to the activator node.
   */
  setActivatorNodeRef: React.RefCallback<HTMLElement>;

  /**
   * The attributes to apply to the activator node.
   */
  attributes: React.HTMLAttributes<HTMLElement>;

  /**
   * The event listeners to apply to the activator node.
   */
  listeners?: SyntheticListenerMap;
};
