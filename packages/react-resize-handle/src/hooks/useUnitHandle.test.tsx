import { Provider_unstable } from '@fluentui/react-shared-contexts';
import { renderHook } from '@testing-library/react';
import * as React from 'react';

import { useUnitHandle } from './useUnitHandle';

function createMockElement(width = 100, height = 100): HTMLElement {
  return {
    getBoundingClientRect: jest.fn(() => ({
      width,
      height,
    })),
  } as unknown as HTMLElement;
}

function createDocumentMock(windowWidth = 2000, windowHeight = 1000) {
  const getBoundingClientRectMock = jest.fn().mockReturnValue({
    width: windowWidth,
    height: windowHeight,
  });
  const windowMock = {
    document: {
      documentElement: {
        getBoundingClientRect: getBoundingClientRectMock,
      },
    },
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    requestAnimationFrame: jest.fn((cb) => {
      cb();
      return 0;
    }),
    cancelAnimationFrame: jest.fn(),
  };
  const document = {
    defaultView: windowMock,
  } as unknown as Document;

  function updateWindowDimensions(newWidth: number, newHeight: number) {
    getBoundingClientRectMock.mockReturnValue({
      width: newWidth,
      height: newHeight,
    });

    windowMock.addEventListener.mock.calls.forEach((call) => {
      const eventName = call[0];
      const callback = call[1];

      if (eventName === 'resize') {
        callback();
      }
    });
  }

  return {
    document,
    updateWindowDimensions,
  };
}

describe('useUnitHandle', () => {
  describe('px', () => {
    it('should return correct unit handle', () => {
      const elementMock = createMockElement(100);
      const { result } = renderHook(() => useUnitHandle('end', 'px'));

      expect(result.current.name).toBe('px');
      expect(result.current.elementDimension(elementMock)).toBe(100);
      expect(result.current.fromPxToValue(10)).toBe(10);
      expect(result.current.getOffsetStep()).toBe(20);
      expect(result.current.roundValue(10.5)).toBe(11);
    });
  });

  describe('viewport', () => {
    it('should return correct unit handle', () => {
      const elementMock = createMockElement(100);
      const { document } = createDocumentMock();
      const { result } = renderHook(() => useUnitHandle('end', 'viewport'), {
        wrapper: ({ children }) => (
          <Provider_unstable value={{ dir: 'ltr', targetDocument: document }}>
            {children}
          </Provider_unstable>
        ),
      });

      expect(result.current.name).toBe('vw');
      expect(result.current.elementDimension(elementMock)).toBe(5);
      expect(result.current.fromPxToValue(10)).toBe(0.5);
      expect(result.current.getOffsetStep()).toBe(1);
      expect(result.current.roundValue(10.52)).toBe(10.52);
    });

    it('should return "vh" unit for vertical direction', () => {
      const elementMock = createMockElement(100, 200);
      const { document } = createDocumentMock();
      const { result } = renderHook(() => useUnitHandle('up', 'viewport'), {
        wrapper: ({ children }) => {
          return (
            <Provider_unstable value={{ dir: 'ltr', targetDocument: document }}>
              {children}
            </Provider_unstable>
          );
        },
      });

      expect(result.current.name).toBe('vh');
      expect(result.current.elementDimension(elementMock)).toBe(20);
    });

    it('reacts to window resize', () => {
      const elementMock = createMockElement(100);
      const { document, updateWindowDimensions } = createDocumentMock(
        2000,
        1000
      );
      const { result } = renderHook(() => useUnitHandle('end', 'viewport'), {
        wrapper: ({ children }) => (
          <Provider_unstable value={{ dir: 'ltr', targetDocument: document }}>
            {children}
          </Provider_unstable>
        ),
      });

      expect(result.current.elementDimension(elementMock)).toBe(5);

      updateWindowDimensions(500, 250);
      expect(result.current.elementDimension(elementMock)).toBe(20);
    });
  });
});
