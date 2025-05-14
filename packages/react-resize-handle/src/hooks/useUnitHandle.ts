import { useFluent } from '@fluentui/react-components';
import * as React from 'react';

import type { CSSUnit, CSSUnitName, GrowDirection } from '../types';

type UnitHandleFactory = (params: {
  getWindowDimensions: () => { width: number; height: number };
  growDirection: GrowDirection;
}) => UnitHandle;

export type UnitHandle = {
  elementDimension: (element: HTMLElement | null) => number;
  fromPxToValue: (px: number) => number;
  getOffsetStep: () => number;
  roundValue: (value: number) => number;
  name: CSSUnitName;
};

const DEFAULT_OFFSET_STEP = 20;

function getElementDimensionInPx(
  element: HTMLElement | null,
  growDirection: GrowDirection
): number {
  if (element === null) {
    return 0;
  }

  const key =
    growDirection === 'end' || growDirection === 'start' ? 'width' : 'height';
  const rect = element.getBoundingClientRect();

  return rect[key];
}

const createPixelsHandle: UnitHandleFactory = ({ growDirection }) => {
  const name: CSSUnitName = 'px';

  function fromPxToValue(px: number) {
    return px;
  }

  function roundValue(value: number): number {
    return Math.round(value);
  }

  function getOffsetStep(): number {
    return DEFAULT_OFFSET_STEP;
  }

  function elementDimension(element: HTMLElement | null): number {
    return getElementDimensionInPx(element, growDirection);
  }

  return {
    elementDimension,
    fromPxToValue,
    getOffsetStep,
    roundValue,
    name,
  };
};

const createViewportHandle: UnitHandleFactory = ({
  getWindowDimensions,
  growDirection,
}) => {
  const name: CSSUnitName =
    growDirection === 'end' || growDirection === 'start' ? 'vw' : 'vh';

  function fromPxToValue(px: number) {
    if (growDirection === 'end' || growDirection === 'start') {
      return (px / getWindowDimensions().width) * 100;
    }

    return (px / getWindowDimensions().height) * 100;
  }

  function roundValue(value: number): number {
    return Math.round((value + Number.EPSILON) * 1e5) / 1e5;
  }

  function getOffsetStep(): number {
    return fromPxToValue(DEFAULT_OFFSET_STEP);
  }

  function elementDimension(element: HTMLElement | null): number {
    return fromPxToValue(getElementDimensionInPx(element, growDirection));
  }

  return {
    elementDimension,
    fromPxToValue,
    getOffsetStep,
    roundValue,
    name,
  };
};

export function useUnitHandle(
  growDirection: GrowDirection,
  unit: CSSUnit
): UnitHandle {
  const { targetDocument } = useFluent();
  const unitFactory = unit === 'px' ? createPixelsHandle : createViewportHandle;

  const windowDimensionsRef = React.useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const windowDimensionsRafId = React.useRef<number | null>(null);

  React.useEffect(() => {
    const targetWindow = targetDocument?.defaultView;

    if (targetWindow && unit === 'viewport') {
      windowDimensionsRef.current.width = targetWindow.innerWidth;
      windowDimensionsRef.current.height = targetWindow.innerHeight;

      const handleResize = () => {
        windowDimensionsRafId.current = targetWindow.requestAnimationFrame(
          () => {
            windowDimensionsRef.current.width = targetWindow.innerWidth;
            windowDimensionsRef.current.height = targetWindow.innerHeight;
          }
        );
      };

      targetWindow.addEventListener('resize', handleResize);

      return () => {
        targetWindow.removeEventListener('resize', handleResize);

        if (windowDimensionsRafId.current) {
          targetWindow.cancelAnimationFrame(windowDimensionsRafId.current);
          windowDimensionsRafId.current = null;
        }
      };
    }
  }, [targetDocument, unit]);

  return React.useMemo(
    () =>
      unitFactory({
        getWindowDimensions: () => windowDimensionsRef.current,
        growDirection,
      }),
    [growDirection, unit]
  );
}
