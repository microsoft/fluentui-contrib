import type { Transform } from '@dnd-kit/utilities';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { restrictToBoundaryModifier } from './restrictToBoundaryModifier';
import { DraggableDialogMarginViewport } from '../DraggableDialog.types';

// Mock the restrictToWindowEdges function
jest.mock('@dnd-kit/modifiers', () => ({
  restrictToWindowEdges: jest.fn(),
}));

const mockedRestrictToWindowEdges =
  restrictToWindowEdges as jest.MockedFunction<typeof restrictToWindowEdges>;

describe('restrictToBoundaryModifier', () => {
  const mockTransform: Transform = { x: 10, y: 20, scaleX: 1, scaleY: 1 };
  const mockMargin: Required<DraggableDialogMarginViewport> = {
    top: 10,
    end: 15,
    bottom: 10,
    start: 15,
  };

  const mockWindowRect = {
    width: 1000,
    height: 800,
    top: 0,
    right: 1000,
    bottom: 800,
    left: 0,
  };

  const mockContainerNodeRect = {
    width: 300,
    height: 200,
    top: 100,
    right: 400,
    bottom: 300,
    left: 100,
  };

  const mockModifierArgs = {
    activatorEvent: null,
    active: null,
    activeNodeRect: null,
    containerNodeRect: mockContainerNodeRect,
    draggingNodeRect: null,
    over: null,
    overNodeRect: null,
    overlayNodeRect: null,
    scrollableAncestors: [],
    scrollableAncestorRects: [],
    transform: mockTransform,
    windowRect: mockWindowRect,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedRestrictToWindowEdges.mockReturnValue(mockTransform);
  });

  describe('when boundary is null', () => {
    it('should return the original transform without any modification', () => {
      const modifier = restrictToBoundaryModifier({
        margin: mockMargin,
        boundary: null,
      });

      const result = modifier(mockModifierArgs);

      expect(result).toBe(mockTransform);
      expect(mockedRestrictToWindowEdges).not.toHaveBeenCalled();
    });
  });

  describe('when boundary is undefined', () => {
    it('should return the original transform without any modification', () => {
      const modifier = restrictToBoundaryModifier({
        margin: mockMargin,
        boundary: undefined,
      });

      const result = modifier(mockModifierArgs);

      expect(result).toBe(mockTransform);
      expect(mockedRestrictToWindowEdges).not.toHaveBeenCalled();
    });
  });

  describe('when boundary is viewport', () => {
    it('should call restrictToWindowEdges with modified windowRect when windowRect is available', () => {
      const modifier = restrictToBoundaryModifier({
        margin: mockMargin,
        boundary: 'viewport',
      });

      modifier(mockModifierArgs);

      expect(mockedRestrictToWindowEdges).toHaveBeenCalledWith({
        ...mockModifierArgs,
        windowRect: {
          width: 970, // 1000 - 15 - 15
          height: 780, // 800 - 10 - 10
          top: 10, // 0 + 10
          right: 1015, // 1000 + 15
          bottom: 810, // 800 + 10
          left: 15, // 0 + 15
        },
      });
    });

    it('should return the original transform when windowRect is not available', () => {
      const modifier = restrictToBoundaryModifier({
        margin: mockMargin,
        boundary: 'viewport',
      });

      const result = modifier({
        ...mockModifierArgs,
        windowRect: null,
      });

      expect(result).toBe(mockTransform);
      expect(mockedRestrictToWindowEdges).not.toHaveBeenCalled();
    });
  });

  describe('when boundary is a React ref', () => {
    it('should call restrictToWindowEdges with virtualRect when ref has current element', () => {
      const mockElement = {
        offsetWidth: 600,
        offsetHeight: 400,
        offsetTop: 50,
        offsetLeft: 100,
      } as HTMLElement;

      const mockRef = { current: mockElement };
      const modifier = restrictToBoundaryModifier({
        margin: mockMargin,
        boundary: mockRef,
      });

      modifier(mockModifierArgs);

      expect(mockedRestrictToWindowEdges).toHaveBeenCalledWith({
        ...mockModifierArgs,
        windowRect: {
          width: 570, // 600 - 15 - 15
          height: 380, // 400 - 10 - 10
          top: 60, // 50 + 10
          right: 715, // 100 + 600 + 15
          bottom: 460, // 50 + 400 + 10
          left: 115, // 100 + 15
        },
      });
    });

    it('should return the original transform when ref.current is null or undefined', () => {
      const mockRef = { current: null };
      const modifier = restrictToBoundaryModifier({
        margin: mockMargin,
        boundary: mockRef,
      });

      const result = modifier(mockModifierArgs);

      expect(result).toBe(mockTransform);
      expect(mockedRestrictToWindowEdges).not.toHaveBeenCalled();
    });
  });

  describe('getRectWithMargin calculations', () => {
    it('should correctly calculate rect with different margin configurations', () => {
      // Test zero margins
      const zeroMargin: Required<DraggableDialogMarginViewport> = {
        top: 0,
        end: 0,
        bottom: 0,
        start: 0,
      };

      const zeroModifier = restrictToBoundaryModifier({
        margin: zeroMargin,
        boundary: 'viewport',
      });

      zeroModifier(mockModifierArgs);

      expect(mockedRestrictToWindowEdges).toHaveBeenCalledWith({
        ...mockModifierArgs,
        windowRect: mockWindowRect, // Should be unchanged with zero margins
      });

      // Test asymmetric margins
      const asymmetricMargin: Required<DraggableDialogMarginViewport> = {
        top: 5,
        end: 25,
        bottom: 15,
        start: 35,
      };

      const asymmetricModifier = restrictToBoundaryModifier({
        margin: asymmetricMargin,
        boundary: 'viewport',
      });

      asymmetricModifier(mockModifierArgs);

      expect(mockedRestrictToWindowEdges).toHaveBeenCalledWith({
        ...mockModifierArgs,
        windowRect: {
          width: 940, // 1000 - 35 - 25
          height: 780, // 800 - 5 - 15
          top: 5, // 0 + 5
          right: 1025, // 1000 + 25
          bottom: 815, // 800 + 15
          left: 35, // 0 + 35
        },
      });
    });
  });

  describe('return value', () => {
    it('should return the result from restrictToWindowEdges when boundary is viewport', () => {
      const expectedTransform: Transform = {
        x: 50,
        y: 60,
        scaleX: 1,
        scaleY: 1,
      };
      mockedRestrictToWindowEdges.mockReturnValue(expectedTransform);

      const modifier = restrictToBoundaryModifier({
        margin: mockMargin,
        boundary: 'viewport',
      });

      const result = modifier(mockModifierArgs);

      expect(result).toBe(expectedTransform);
    });

    it('should return the result from restrictToWindowEdges when boundary is a valid ref', () => {
      const expectedTransform: Transform = {
        x: 75,
        y: 85,
        scaleX: 1,
        scaleY: 1,
      };
      mockedRestrictToWindowEdges.mockReturnValue(expectedTransform);

      const mockElement = {
        offsetWidth: 600,
        offsetHeight: 400,
        offsetTop: 50,
        offsetLeft: 100,
      } as HTMLElement;

      const mockRef = { current: mockElement };
      const modifier = restrictToBoundaryModifier({
        margin: mockMargin,
        boundary: mockRef,
      });

      const result = modifier(mockModifierArgs);

      expect(result).toBe(expectedTransform);
    });
  });
});
