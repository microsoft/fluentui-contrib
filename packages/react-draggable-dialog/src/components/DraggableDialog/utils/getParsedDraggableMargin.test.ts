import { getParsedDraggableMargin } from './getParsedDraggableMargin';
import {
  DraggableDialogMargin,
  DraggableDialogMarginAxis,
  DraggableDialogMarginViewport,
} from '../DraggableDialog.types';

describe('getParsedDraggableMargin', () => {
  const defaultMargin = {
    top: 0,
    end: 0,
    bottom: 0,
    start: 0,
  };

  describe('when margin is undefined', () => {
    it('should return default margin', () => {
      const result = getParsedDraggableMargin(undefined);
      expect(result).toEqual(defaultMargin);
    });
  });

  describe('when margin is a number', () => {
    it('should return uniform margins for various number types', () => {
      // Test positive number
      expect(getParsedDraggableMargin(10)).toEqual({
        top: 10,
        end: 10,
        bottom: 10,
        start: 10,
      });

      // Test zero
      expect(getParsedDraggableMargin(0)).toEqual(defaultMargin);

      // Test negative and decimal numbers
      expect(getParsedDraggableMargin(-5)).toEqual({
        top: -5,
        end: -5,
        bottom: -5,
        start: -5,
      });

      expect(getParsedDraggableMargin(12.5)).toEqual({
        top: 12.5,
        end: 12.5,
        bottom: 12.5,
        start: 12.5,
      });
    });
  });

  describe('when margin has mainAxis and crossAxis properties', () => {
    it('should map mainAxis to horizontal and crossAxis to vertical', () => {
      const margin: DraggableDialogMarginAxis = {
        mainAxis: 15,
        crossAxis: 20,
      };
      const result = getParsedDraggableMargin(margin);

      expect(result).toEqual({
        top: 20,
        end: 15,
        bottom: 20,
        start: 15,
      });
    });

    it('should handle partial axis properties and various value types', () => {
      // Only mainAxis
      expect(getParsedDraggableMargin({ mainAxis: 10 })).toEqual({
        top: 0,
        end: 10,
        bottom: 0,
        start: 10,
      });

      // Only crossAxis
      expect(getParsedDraggableMargin({ crossAxis: 8 })).toEqual({
        top: 8,
        end: 0,
        bottom: 8,
        start: 0,
      });

      // Zero values
      expect(getParsedDraggableMargin({ mainAxis: 0, crossAxis: 0 })).toEqual(
        defaultMargin
      );

      // Negative and decimal values
      expect(
        getParsedDraggableMargin({ mainAxis: -5, crossAxis: 12.3 })
      ).toEqual({
        top: 12.3,
        end: -5,
        bottom: 12.3,
        start: -5,
      });
    });
  });

  describe('when margin has viewport properties', () => {
    it('should handle complete and partial viewport margins', () => {
      // All properties provided
      const fullMargin: DraggableDialogMarginViewport = {
        top: 5,
        end: 10,
        bottom: 15,
        start: 20,
      };
      expect(getParsedDraggableMargin(fullMargin)).toEqual({
        top: 5,
        end: 10,
        bottom: 15,
        start: 20,
      });

      // Partial properties
      expect(getParsedDraggableMargin({ top: 10, end: 15 })).toEqual({
        top: 10,
        end: 15,
        bottom: 0,
        start: 0,
      });

      // Single property
      expect(getParsedDraggableMargin({ bottom: 25 })).toEqual({
        top: 0,
        end: 0,
        bottom: 25,
        start: 0,
      });
    });

    it('should handle various value types in viewport properties', () => {
      // Zero values
      expect(
        getParsedDraggableMargin({
          top: 0,
          end: 0,
          bottom: 0,
          start: 0,
        })
      ).toEqual(defaultMargin);

      // Mixed positive/negative and decimal values
      expect(
        getParsedDraggableMargin({
          top: -5,
          end: 10.5,
          bottom: -3,
          start: 8.2,
        })
      ).toEqual({
        top: -5,
        end: 10.5,
        bottom: -3,
        start: 8.2,
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty viewport object', () => {
      const margin: DraggableDialogMarginViewport = {};
      const result = getParsedDraggableMargin(margin);

      expect(result).toEqual(defaultMargin);
    });

    it('should handle empty axis object', () => {
      const margin: DraggableDialogMarginAxis = {};
      const result = getParsedDraggableMargin(margin);

      expect(result).toEqual(defaultMargin);
    });

    it('should prioritize axis format when both mainAxis and viewport properties are present', () => {
      // This tests the type discrimination logic - if mainAxis is present, it should be treated as axis format
      const margin = {
        mainAxis: 10,
        crossAxis: 5,
        top: 100, // These should be ignored
        end: 200,
      } as DraggableDialogMargin;

      const result = getParsedDraggableMargin(margin);

      expect(result).toEqual({
        top: 5,
        end: 10,
        bottom: 5,
        start: 10,
      });
    });

    it('should prioritize axis format when only mainAxis and viewport properties are present', () => {
      const margin = {
        mainAxis: 15,
        bottom: 100, // This should be ignored
        start: 200,
      } as DraggableDialogMargin;

      const result = getParsedDraggableMargin(margin);

      expect(result).toEqual({
        top: 0,
        end: 15,
        bottom: 0,
        start: 15,
      });
    });

    it('should prioritize axis format when only crossAxis and viewport properties are present', () => {
      const margin = {
        crossAxis: 12,
        end: 100, // This should be ignored
        start: 200,
      } as DraggableDialogMargin;

      const result = getParsedDraggableMargin(margin);

      expect(result).toEqual({
        top: 12,
        end: 0,
        bottom: 12,
        start: 0,
      });
    });
  });
});
