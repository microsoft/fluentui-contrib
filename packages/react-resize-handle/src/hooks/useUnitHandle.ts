import { useFluent } from '@fluentui/react-components';
import * as React from 'react';

import type { CSSUnit, CSSUnitName, GrowDirection } from '../types';

export type UnitHandle = {
  elementDimension: (element: HTMLElement | null) => number;
  fromPxToValue: (px: number) => number;
  getOffsetStep: () => number;
  roundValue: (value: number) => number;
  name: CSSUnitName;
};

const DEFAULT_OFFSET_STEP = 20;

export function useUnitHandle(
  growDirection: GrowDirection,
  unit: CSSUnit
): UnitHandle {
  const { targetDocument } = useFluent();

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

  return React.useMemo(() => {
    const name: CSSUnitName =
      unit === 'px'
        ? 'px'
        : growDirection === 'end' || growDirection === 'start'
        ? 'vw'
        : 'vh';

    function fromPxToValue(px: number) {
      if (unit === 'px') {
        return px;
      }

      if (unit === 'viewport') {
        if (growDirection === 'end' || growDirection === 'start') {
          return (px / windowDimensionsRef.current.width) * 100;
        }

        return (px / windowDimensionsRef.current.height) * 100;
      }

      return px;
    }

    function roundValue(value: number): number {
      if (unit === 'px') {
        return Math.round(value);
      }

      return Math.round((value + Number.EPSILON) * 1e5) / 1e5;
    }

    function getOffsetStep(): number {
      return fromPxToValue(DEFAULT_OFFSET_STEP);
    }

    function elementDimension(element: HTMLElement | null): number {
      if (element === null) {
        return 0;
      }

      const key =
        growDirection === 'end' || growDirection === 'start'
          ? 'width'
          : 'height';
      const rect = element.getBoundingClientRect();

      return fromPxToValue(rect[key]);
    }

    return {
      elementDimension,
      fromPxToValue,
      getOffsetStep,
      roundValue,
      name,
    };
  }, [growDirection, unit]);
}
