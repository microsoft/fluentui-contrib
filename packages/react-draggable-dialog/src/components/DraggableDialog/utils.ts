import { Modifier } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
  DraggableDialogProps,
  DraggableMargin,
  DraggableMarginViewport,
} from './DraggableDialog.types';

type RestrictToMarginModifierOptions = {
  margin: Required<DraggableMarginViewport>;
} & Pick<DraggableDialogProps, 'keepInViewport'>;

type RestrictToMarginModifier = (
  options: RestrictToMarginModifierOptions
) => Modifier;

export const restrictToMarginModifier: RestrictToMarginModifier =
  ({ margin, keepInViewport }) =>
  ({ windowRect, transform, ...modifier }) => {
    if (!keepInViewport || !windowRect) {
      return transform;
    }

    return restrictToWindowEdges({
      ...modifier,
      transform,
      windowRect: {
        width: windowRect.width - margin.start - margin.end,
        height: windowRect.height - margin.top - margin.bottom,
        top: windowRect.top + margin.top,
        right: windowRect.right + margin.end,
        bottom: windowRect.bottom + margin.bottom,
        left: windowRect.left + margin.start,
      },
    });
  };

const defaultMargin = {
  top: 0,
  end: 0,
  bottom: 0,
  start: 0,
};

export const getParsedDraggableMargin = (
  margin: DraggableMargin | undefined
): Required<DraggableMarginViewport> => {
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
