import { ClientRect, Modifier } from '@dnd-kit/core';
import { restrictToWindowEdges as restrictToEdges } from '@dnd-kit/modifiers';

import {
  DraggableDialogProps,
  DraggableDialogMarginViewport,
} from '../DraggableDialog.types';

type RestrictToMarginModifierOptions = {
  margin: Required<DraggableDialogMarginViewport>;
} & Pick<DraggableDialogProps, 'boundary'>;

type RestrictToMarginModifier = (
  options: RestrictToMarginModifierOptions
) => Modifier;

const getRectWithMargin = (
  rect: ClientRect,
  margin: Required<DraggableDialogMarginViewport>
): ClientRect => ({
  width: rect.width - margin.start - margin.end,
  height: rect.height - margin.top - margin.bottom,
  top: rect.top + margin.top,
  right: rect.right + margin.end,
  bottom: rect.bottom + margin.bottom,
  left: rect.left + margin.start,
});

export const restrictToMarginModifier: RestrictToMarginModifier =
  ({ margin, boundary }) =>
  ({ windowRect, containerNodeRect, transform, ...modifier }) => {
    if (!boundary) {
      return transform;
    }

    if (boundary === 'viewport' && windowRect) {
      return restrictToEdges({
        ...modifier,
        containerNodeRect,
        transform,
        windowRect: getRectWithMargin(windowRect, margin),
      });
    }

    const boundaryEl = (boundary as React.RefObject<HTMLElement>).current;

    if (!boundaryEl) {
      return transform;
    }

    const virtualRect = {
      width: boundaryEl.offsetWidth,
      height: boundaryEl.offsetHeight,
      top: boundaryEl.offsetTop,
      right: boundaryEl.offsetLeft + boundaryEl.offsetWidth,
      bottom: boundaryEl.offsetTop + boundaryEl.offsetHeight,
      left: boundaryEl.offsetLeft,
    };

    return restrictToEdges({
      ...modifier,
      transform,
      containerNodeRect,
      windowRect: getRectWithMargin(virtualRect, margin),
    });
  };
