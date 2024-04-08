import * as React from 'react';

import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { disableNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/disable-native-drag-preview';
import { preventUnhandled } from '@atlaskit/pragmatic-drag-and-drop/prevent-unhandled';
import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  useIsomorphicLayoutEffect,
  Portal,
} from '@fluentui/react-components';
import { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import { usePrevious } from '@dnd-kit/utilities';

const useStyles = makeStyles({
  draggable: {
    ...shorthands.margin('auto'),
    ...shorthands.inset('0px'),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),

    width: '150px',
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    boxShadow: tokens.shadow8,
    backgroundColor: '#babaca',
    transitionDuration: tokens.durationNormal,
    transitionProperty: 'transform',
    transitionTimingFunction: tokens.curveEasyEase,
  },

  dragHandle: {
    position: 'absolute',
    top: '4px',
    right: '4px',
  },

  draggableBlue: {
    backgroundColor: 'lightblue',
  },

  draggableRed: {
    backgroundColor: '#ff9696',
  },

  draggablePurple: {
    backgroundColor: '#ff92fb',
  },

  draggableYellow: {
    backgroundColor: 'lightyellow',
  },

  draggableGreen: {
    backgroundColor: '#c0ffee',
    position: 'absolute',
  },

  boundary: {
    ...shorthands.borderRadius(tokens.borderRadiusLarge),

    height: '600px',
    width: '600px',
    backgroundColor: '#d0d0d0',
    position: 'relative',
  },
});

type DraggableProps = React.PropsWithChildren<{
  margin?: number;
  position?: { x: number; y: number };
  onPositionChange?: (position: { x: number; y: number }) => void;
  handle?: React.RefObject<HTMLElement> | Element | HTMLElement;
  boundary?:
    | React.RefObject<HTMLElement>
    | Element
    | HTMLElement
    | 'viewport'
    | null;
}>;

const getRoot = (boundary: DraggableProps['boundary']) => {
  if (boundary === null) {
    return null;
  }

  if (boundary === 'viewport') {
    return document;
  }

  if (boundary instanceof HTMLElement || boundary instanceof Element) {
    return boundary;
  }

  if (boundary?.current instanceof HTMLElement) {
    return boundary.current;
  }

  return document;
};

const getHandle = (handle: DraggableProps['handle']) => {
  if (handle instanceof HTMLElement || handle instanceof Element) {
    return handle;
  }

  if (handle?.current instanceof HTMLElement) {
    return handle.current;
  }

  return undefined;
};

export const Draggable = ({
  children,
  margin,
  boundary = 'viewport',
  handle,
  onPositionChange,
}: DraggableProps) => {
  const [currentElement, setCurrentElement] =
    React.useState<HTMLElement | null>(null);
  const [coordinates, setCoordinates] = React.useState({
    x: 0,
    y: 0,
  });
  const [initialCoordinates, setInitialCoordinates] = React.useState({
    x: 0,
    y: 0,
  });
  const [intersectionData, setIntersectionData] =
    React.useState<IntersectionObserverEntry | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const intersectionObserver = React.useRef<IntersectionObserver | null>(null);

  const ref: React.RefCallback<HTMLElement> = React.useCallback(
    (node) => setCurrentElement(node),
    []
  );

  const measureElementRect = React.useCallback(async () => {
    return new Promise<DOMRect | null>((resolve) => {
      if (!currentElement) {
        resolve(null);
        return;
      }

      const observer = new IntersectionObserver(([{ boundingClientRect }]) => {
        resolve(boundingClientRect);
        observer.disconnect();
      });

      observer.observe(currentElement);
    });
  }, [currentElement]);

  const calculatePosition = React.useCallback(
    (location: DragLocationHistory) => {
      const current = location.current.input;
      const initial = location.initial.input;
      const diffX = current.clientX - initial.clientX;
      const diffY = current.clientY - initial.clientY;
      const position = {
        x: initialCoordinates.x + diffX,
        y: initialCoordinates.y + diffY,
      };

      return position;
    },
    [initialCoordinates]
  );

  const calculateInBoundsPosition = React.useCallback(
    async (position: { x: number; y: number }) => {
      const { rootBounds, isIntersecting } = intersectionData || {};
      const newPosition = { ...position };

      if (!rootBounds) {
        return newPosition;
      }

      if (!isIntersecting) {
        const rect = await measureElementRect();

        if (!rect) {
          return newPosition;
        }

        const diff = {
          x: rootBounds.x - rect?.x,
          y: rootBounds.y - rect?.y,
        };

        if (rootBounds.x > rect.x) {
          newPosition.x += diff.x;
        }

        if (rootBounds.y > rect.y) {
          newPosition.y += diff.y;
        }

        if (rootBounds.right < rect.right) {
          newPosition.x -= rect.right - rootBounds.right;
        }

        if (rootBounds.bottom < rect.bottom) {
          newPosition.y -= rect.bottom - rootBounds.bottom;
        }
      }

      return newPosition;
    },
    [intersectionData]
  );

  const onDragStart = React.useCallback(() => setIsDragging(true), []);

  const onDrag = React.useCallback(
    ({ location }: { location: DragLocationHistory }) => {
      const { x, y } = calculatePosition(location);

      setCoordinates((prev) => {
        if (prev.x === x && prev.y === y) {
          return prev;
        }

        return { x, y };
      });
    },
    [calculatePosition]
  );

  const onDrop = React.useCallback(
    async ({ location }: { location: DragLocationHistory }) => {
      const position = calculatePosition(location);
      const finalPosition = await calculateInBoundsPosition(position);

      setIsDragging(false);
      setCoordinates(finalPosition);
      setInitialCoordinates(finalPosition);
    },
    [calculatePosition, calculateInBoundsPosition]
  );

  useIsomorphicLayoutEffect(() => {
    if (!currentElement) {
      return;
    }

    return draggable({
      element: currentElement,
      onGenerateDragPreview({ nativeSetDragImage }) {
        disableNativeDragPreview({ nativeSetDragImage });
        preventUnhandled.start();
      },
      dragHandle: getHandle(handle),
      onDragStart,
      onDrag,
      onDrop,
    });
  }, [currentElement, onDragStart, onDrag, onDrop]);

  useIsomorphicLayoutEffect(() => {
    const root = getRoot(boundary);

    if (!currentElement || !root) {
      return;
    }

    intersectionObserver.current = new IntersectionObserver(
      ([entry]) => setIntersectionData(entry),
      {
        root,
        rootMargin: `${-(margin || 0)}px`,
        threshold: 1,
      }
    );

    intersectionObserver.current.observe(currentElement);

    return () => intersectionObserver.current?.disconnect();
  }, [boundary, currentElement, margin]);

  React.useEffect(() => {
    if (!onPositionChange) {
      return;
    }

    (async () => {
      const rect = await measureElementRect();

      if (!rect) {
        return;
      }

      onPositionChange?.({
        x: Math.round(rect.x),
        y: Math.round(rect.y),
      });
    })();
  }, [coordinates, onPositionChange, measureElementRect]);

  const computedStyles = React.useMemo(() => {
    if (!currentElement) {
      return;
    }

    return {
      transform: `translate(${coordinates.x}px, ${coordinates.y}px)`,
      ...(isDragging && {
        transition: 'none',
      }),
    };
  }, [coordinates, isDragging, currentElement]);

  return React.cloneElement(children as React.ReactElement, {
    ref,
    style: computedStyles,
  });
};

export const Pragmatic = () => {
  const styles = useStyles();
  const boundaryRef = React.useRef<HTMLDivElement>(null);
  const handleRef = React.useRef<HTMLButtonElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [customPosition, setCustomPosition] = React.useState({
    x: 100,
    y: 100,
  });

  const onPositionChange = React.useCallback(
    (position: { x: number; y: number }) => setPosition(position),
    []
  );

  const onCustomPositionChange = React.useCallback(
    (position: { x: number; y: number }) => setCustomPosition(position),
    []
  );

  return (
    <div className={styles.boundary} ref={boundaryRef}>
      <Portal>
        <Draggable>
          <div className={styles.draggable}>Draggable!</div>
        </Draggable>
      </Portal>

      <Portal>
        <Draggable margin={32}>
          <div className={mergeClasses(styles.draggable, styles.draggableBlue)}>
            With margin!
          </div>
        </Draggable>
      </Portal>

      <Portal>
        <Draggable boundary={null}>
          <div
            className={mergeClasses(styles.draggable, styles.draggableYellow)}
          >
            No boundary!
          </div>
        </Draggable>
      </Portal>

      <Portal>
        <Draggable handle={handleRef}>
          <div className={mergeClasses(styles.draggable, styles.draggableRed)}>
            <button type="button" ref={handleRef} className={styles.dragHandle}>
              Handle
            </button>
            With handle!
          </div>
        </Draggable>
      </Portal>

      <Portal>
        <Draggable onPositionChange={onPositionChange}>
          <div
            className={mergeClasses(styles.draggable, styles.draggablePurple)}
          >
            Tracking position!
            <div>
              {position.x}, {position.y}
            </div>
          </div>
        </Draggable>
      </Portal>

      <Portal>
        <Draggable
          onPositionChange={onCustomPositionChange}
          position={customPosition}
        >
          <div
            className={mergeClasses(styles.draggable, styles.draggablePurple)}
          >
            Custom position!
            <div>
              {customPosition.x}, {customPosition.y}
            </div>
          </div>
        </Draggable>
      </Portal>

      <Draggable margin={16} boundary={boundaryRef}>
        <div className={mergeClasses(styles.draggable, styles.draggableGreen)}>
          Custom Boundary
        </div>
      </Draggable>
    </div>
  );
};
