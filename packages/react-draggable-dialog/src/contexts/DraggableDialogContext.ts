import * as React from 'react';
import {
  DraggableDialogProps,
  DraggableDialogMarginViewport,
} from '../components/DraggableDialog/DraggableDialog.types';

type DraggablePosition = {
  x: number;
  y: number;
};
export type DraggableDialogContextValue = {
  hasDraggableParent: boolean;
  id: string;
  boundary: DraggableDialogProps['boundary'];
  margin: Required<DraggableDialogMarginViewport>;
  /**
   * @deprecated
   * This function has no effect and will be removed in a future version.
   */
  setDropPosition?: (position: DraggablePosition) => void;
  onPositionChange?: DraggableDialogProps['onPositionChange'];
  position?: DraggablePosition | null;
  dropPosition: DraggablePosition;
  hasBeenDragged: boolean;
};

export const draggableDialogContextDefaultValue: DraggableDialogContextValue = {
  hasDraggableParent: false,
  id: '',
  boundary: 'viewport',
  margin: {
    top: 0,
    end: 0,
    bottom: 0,
    start: 0,
  },
  /**
   * @deprecated
   * This function has no effect and will be removed in a future version.
   */
  setDropPosition: () => undefined,
  onPositionChange: () => undefined,
  position: {
    x: 0,
    y: 0,
  },
  dropPosition: {
    x: 0,
    y: 0,
  },
  hasBeenDragged: false,
};

const draggableDialogContext = React.createContext<DraggableDialogContextValue>(
  draggableDialogContextDefaultValue
);

export const useDraggableDialogContext = () => {
  return (
    React.useContext(draggableDialogContext) ??
    draggableDialogContextDefaultValue
  );
};

export const DraggableDialogContextProvider = draggableDialogContext.Provider;
