import * as React from 'react';

export type DraggableDialogContextValue = {
  id: string;
  isDragging: boolean;
  hasBeenDragged: boolean;
  position: {
    x: number;
    y: number;
  };
};

export const draggableDialogContextDefaultValue = {
  id: '',
  isDragging: false,
  hasBeenDragged: false,
  position: {
    x: 0,
    y: 0,
  },
};

const draggableDialogContext = React.createContext<DraggableDialogContextValue>(
  draggableDialogContextDefaultValue
);

export const useDraggableDialogContext = () =>
  React.useContext(draggableDialogContext) ??
  draggableDialogContextDefaultValue;

export const DraggableDialogContextProvider = draggableDialogContext.Provider;
