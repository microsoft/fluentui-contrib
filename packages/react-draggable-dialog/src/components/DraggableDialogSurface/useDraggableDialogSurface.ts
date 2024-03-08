import * as React from 'react';
import { ClientRect, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useFluent, useMergedRefs } from '@fluentui/react-components';

import { assertDialogParent } from '../../utils/assertDialogParent';
import { useDraggableDialogContext } from '../../contexts/DraggableDialogContext';
import {
  DraggableDialogSurfaceProps,
  DraggableDialogSurfaceState,
} from './DraggableDialogSurface.types';

/**
 * Returns the state needed to make a draggable dialog surface.
 */
export const useDraggableDialogSurface = (
  props: DraggableDialogSurfaceProps
): DraggableDialogSurfaceState => {
  const { targetDocument } = useFluent();
  const {
    id,
    boundary,
    margin,
    hasDraggableParent,
    hasBeenDragged,
    position,
    dropPosition,
    setDropPosition,
  } = useDraggableDialogContext();
  const { setNodeRef, transform, isDragging } = useDraggable({
    id,
  });
  const [currentEl, setCurrentEl] = React.useState<HTMLElement | null>(null);
  const doc = targetDocument?.documentElement;
  const mountNode =
    boundary === 'viewport' ? props.mountNode : boundary?.current;

  const ref: React.RefCallback<HTMLDivElement> = React.useCallback((node) => {
    if (!node) {
      return;
    }

    setNodeRef(node);
    setCurrentEl(node);
  }, []);

  const boundaryRect = React.useMemo<ClientRect | undefined>(() => {
    if (!boundary || boundary === 'viewport') {
      if (!doc) {
        return undefined;
      }

      return {
        width: doc.clientWidth - margin.start - margin.end,
        height: doc.clientHeight - margin.top - margin.bottom,
        top: margin.top,
        right: margin.end,
        bottom: margin.bottom,
        left: margin.start,
      };
    }

    const boundaryEl = boundary?.current;

    if (!boundaryEl) {
      return undefined;
    }

    return {
      width: boundaryEl.clientWidth - margin.start - margin.end,
      height: boundaryEl.clientHeight - margin.top - margin.bottom,
      top: boundaryEl.offsetTop + margin.top,
      right: boundaryEl.offsetLeft + boundaryEl.clientWidth - margin.end,
      bottom: boundaryEl.offsetTop + boundaryEl.clientHeight - margin.bottom,
      left: boundaryEl.offsetLeft + margin.start,
    };
  }, [boundary, doc, margin]);

  const style = React.useMemo(() => {
    if (!currentEl) {
      return;
    }

    if (position) {
      return {
        margin: 0,
        top: position.y,
        left: position.x,
      };
    }

    if (isDragging) {
      const baseStyles = {
        transform: CSS.Translate.toString(transform),
      };

      if (!hasBeenDragged) {
        return baseStyles;
      }

      return {
        ...baseStyles,
        margin: 0,
        top: dropPosition.y,
        left: dropPosition.x,
      };
    }

    if (!hasBeenDragged) {
      if (!boundaryRect) {
        return;
      }

      const boundaryTopReference = boundaryRect.top + boundaryRect.height / 2;
      const boundaryLeftReference = boundaryRect.left + boundaryRect.width / 2;
      const top = boundaryTopReference - Math.ceil(currentEl.clientHeight / 2);
      const left = boundaryLeftReference - Math.ceil(currentEl.clientWidth / 2);

      setDropPosition({
        x: left,
        y: top,
      });

      return {
        margin: 0,
        top,
        left,
      };
    }

    return {
      margin: 0,
      top: dropPosition.y,
      left: dropPosition.x,
    };
  }, [
    currentEl,
    position,
    isDragging,
    hasBeenDragged,
    boundaryRect,
    dropPosition,
    transform,
    setDropPosition,
  ]);

  assertDialogParent(hasDraggableParent, 'DraggableDialogSurface');

  return {
    ref: useMergedRefs(setNodeRef as React.Ref<HTMLDivElement>, ref),
    mountNode,
    style,
  };
};
