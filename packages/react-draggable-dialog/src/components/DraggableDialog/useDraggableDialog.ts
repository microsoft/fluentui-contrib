import * as React from 'react';
import { useFluent, useEventCallback } from '@fluentui/react-components';

function roundByDPR(value: number, document?: Document) {
  const win = document?.defaultView;

  if (!win) {
    return value;
  }

  const dpr = win.devicePixelRatio || 1;

  return Math.round(value * dpr) / dpr;
}

type DraggableMarginAxis = {
  mainAxis?: number;
  crossAxis?: number;
};
type DraggableMarginViewport = {
  top?: number;
  end?: number;
  bottom?: number;
  start?: number;
};
type DraggableDialogOptions = {
  keepInViewport?: boolean;
  margin?: number | DraggableMarginAxis | DraggableMarginViewport;
};

const getDraggableMargin = (
  margin: DraggableDialogOptions['margin']
): Required<DraggableMarginViewport> => {
  const defaultMargin = {
    top: 0,
    end: 0,
    bottom: 0,
    start: 0,
  };

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

export const useDraggableDialog = (_opts: DraggableDialogOptions) => {
  const { targetDocument } = useFluent();
  const { margin, keepInViewport } = {
    keepInViewport: true,
    ..._opts,
    margin: getDraggableMargin(_opts.margin),
  };
  const [dragging, setDragging] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const currentPosition = React.useRef({ x: 0, y: 0 });

  const getInBoundsPosition = useEventCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const {
        currentTarget: { offsetLeft, offsetTop },
      } = event;

      let { x, y } = {
        x: event.clientX - currentPosition.current.x,
        y: event.clientY - currentPosition.current.y,
      };

      if (!keepInViewport) {
        return { x, y };
      }

      if (x - margin.start + offsetLeft < 0) {
        x = -offsetLeft + margin.start;
      }

      if (y - margin.top + offsetTop < 0) {
        y = -offsetTop + margin.top;
      }

      if (offsetLeft - margin.end - x < 0) {
        x = offsetLeft - margin.end;
      }

      if (offsetTop - margin.bottom - y < 0) {
        y = offsetTop - margin.bottom;
      }

      return { x, y };
    }
  );

  const applyPosition = useEventCallback(
    (el: HTMLDivElement, x: number, y: number) => {
      const transformX = roundByDPR(x, targetDocument);
      const transformY = roundByDPR(y, targetDocument);

      Object.assign(el.style, {
        transform: `translate3D(${transformX}px, ${transformY}px, 0px)`,
      });
    }
  );

  const onMouseDown = useEventCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { x, y } = currentPosition.current;

      currentPosition.current = {
        x: event.clientX - x,
        y: event.clientY - y,
      };
      setDragging(true);
    }
  );

  const onMouseUp = useEventCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { x, y } = getInBoundsPosition(event);

      currentPosition.current = { x, y };
      applyPosition(event.currentTarget, x, y);
      setDragging(false);
    }
  );

  const onMouseMove = useEventCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { x, y } = currentPosition.current;

      applyPosition(event.currentTarget, event.clientX - x, event.clientY - y);
    }
  );

  const onMouseLeave = onMouseUp;

  return React.useMemo(() => {
    if (!dragging) {
      return {
        ref,
        onMouseDown,
      };
    }

    return {
      ref,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onMouseMove,
    };
  }, [dragging]);
};
