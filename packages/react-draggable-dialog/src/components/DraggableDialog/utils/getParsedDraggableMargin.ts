import {
  DraggableDialogMargin,
  DraggableDialogMarginViewport,
} from '../DraggableDialog.types';

const defaultMargin = {
  top: 0,
  end: 0,
  bottom: 0,
  start: 0,
};

export const getParsedDraggableMargin = (
  margin: DraggableDialogMargin | undefined
): Required<DraggableDialogMarginViewport> => {
  if (!margin) {
    return defaultMargin;
  }

  if (typeof margin === 'number') {
    return {
      top: margin,
      end: margin,
      bottom: margin,
      start: margin,
    };
  }

  if ('mainAxis' in margin || 'crossAxis' in margin) {
    const x = margin.mainAxis || 0;
    const y = margin.crossAxis || 0;

    return {
      top: y,
      end: x,
      bottom: y,
      start: x,
    };
  }

  return {
    ...defaultMargin,
    ...margin,
  };
};
