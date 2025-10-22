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
    it.each([
      {
        input: 10,
        expected: { top: 10, end: 10, bottom: 10, start: 10 },
        description: 'positive number',
      },
      {
        input: 0,
        expected: defaultMargin,
        description: 'zero',
      },
      {
        input: -5,
        expected: { top: -5, end: -5, bottom: -5, start: -5 },
        description: 'negative number',
      },
      {
        input: 12.5,
        expected: { top: 12.5, end: 12.5, bottom: 12.5, start: 12.5 },
        description: 'decimal number',
      },
    ])(
      'should return uniform margins for $description',
      ({ input, expected }) => {
        expect(getParsedDraggableMargin(input)).toEqual(expected);
      }
    );
  });

  describe('when margin has mainAxis and crossAxis properties', () => {
    it.each([
      {
        input: { mainAxis: 15, crossAxis: 20 },
        expected: { top: 20, end: 15, bottom: 20, start: 15 },
        description: 'mainAxis to horizontal and crossAxis to vertical',
      },
      {
        input: { mainAxis: 10 },
        expected: { top: 0, end: 10, bottom: 0, start: 10 },
        description: 'only mainAxis',
      },
      {
        input: { crossAxis: 8 },
        expected: { top: 8, end: 0, bottom: 8, start: 0 },
        description: 'only crossAxis',
      },
      {
        input: { mainAxis: 0, crossAxis: 0 },
        expected: defaultMargin,
        description: 'zero values',
      },
      {
        input: { mainAxis: -5, crossAxis: 12.3 },
        expected: { top: 12.3, end: -5, bottom: 12.3, start: -5 },
        description: 'negative and decimal values',
      },
    ])('should handle $description', ({ input, expected }) => {
      expect(getParsedDraggableMargin(input)).toEqual(expected);
    });
  });

  describe('when margin has viewport properties', () => {
    it.each([
      {
        input: { top: 5, end: 10, bottom: 15, start: 20 },
        expected: { top: 5, end: 10, bottom: 15, start: 20 },
        description: 'all properties provided',
      },
      {
        input: { top: 10, end: 15 },
        expected: { top: 10, end: 15, bottom: 0, start: 0 },
        description: 'partial properties',
      },
      {
        input: { bottom: 25 },
        expected: { top: 0, end: 0, bottom: 25, start: 0 },
        description: 'single property',
      },
    ])('should handle $description', ({ input, expected }) => {
      expect(getParsedDraggableMargin(input)).toEqual(expected);
    });

    it.each([
      {
        input: { top: 0, end: 0, bottom: 0, start: 0 },
        expected: defaultMargin,
        description: 'zero values',
      },
      {
        input: { top: -5, end: 10.5, bottom: -3, start: 8.2 },
        expected: { top: -5, end: 10.5, bottom: -3, start: 8.2 },
        description: 'mixed positive/negative and decimal values',
      },
    ])(
      'should handle $description in viewport properties',
      ({ input, expected }) => {
        expect(getParsedDraggableMargin(input)).toEqual(expected);
      }
    );
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
