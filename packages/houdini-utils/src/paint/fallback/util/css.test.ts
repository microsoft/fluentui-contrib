import {
  arrayToRgba,
  parseValue,
  stepValueToPercentage,
  timeToNumber,
} from './css';

describe('css', () => {
  describe('stepValueToPercentage', () => {
    it('should convert "to"', () => {
      expect(stepValueToPercentage('to')).toBe(1);
    });

    it('should convert "from"', () => {
      expect(stepValueToPercentage('from')).toBe(0);
    });

    it('should convert percentage strings ("33%")', () => {
      expect(stepValueToPercentage('33%')).toBe(0.33);
      expect(stepValueToPercentage('100%')).toBe(1);
      expect(stepValueToPercentage('0%')).toBe(0);
    });
  });

  describe('timeToNumber', () => {
    it('should convert times in seconds', () => {
      expect(timeToNumber('1s')).toBe(1);
      expect(timeToNumber('0.5s')).toBe(0.5);
    });

    it('should convert times in milliseconds', () => {
      expect(timeToNumber('100ms')).toBe(100);
      expect(timeToNumber('50ms')).toBe(50);
    });
  });

  describe('arrayToRgba', () => {
    it('should return rgba string', () => {
      expect(arrayToRgba([10, 20, 30, 1])).toBe('rgba(10, 20, 30, 1)');
    });
  });

  describe('parseValue', () => {
    let styles: Partial<CSSStyleDeclaration>;
    beforeEach(() => {
      styles = {
        getPropertyValue: (varName) => {
          if (varName === '--test-var') {
            return 'rgba(10, 20, 30, 1)';
          } else if (varName === '--test-hex-var') {
            return 'rgba(30, 40, 50, 1)';
          }

          return '';
        },
      };
    });

    it('should parse number values', () => {
      expect(parseValue('123', 'test-key', styles as CSSStyleDeclaration)).toBe(
        123
      );
    });

    it('should parse rgba values', () => {
      expect(
        parseValue(
          'rgba(1, 2, 3, 1)',
          'test-key',
          styles as CSSStyleDeclaration
        )
      ).toEqual([1, 2, 3, 1]);
      expect(
        parseValue(
          'rgba(1, 255, 33, 0.1)',
          'test-key',
          styles as CSSStyleDeclaration
        )
      ).toEqual([1, 255, 33, 0.1]);
    });

    it('should parse var values', () => {
      expect(
        parseValue('var(--test-var)', 'test-key', styles as CSSStyleDeclaration)
      ).toEqual([10, 20, 30, 1]);
      expect(
        parseValue(
          'var(--test-hex-var)',
          'test-key',
          styles as CSSStyleDeclaration
        )
      ).toEqual([30, 40, 50, 1]);
    });

    it('should parse hex values', () => {
      expect(
        parseValue('#f0fff0FF', 'test-key', styles as CSSStyleDeclaration)
      ).toEqual([240, 255, 240, 1]);
      expect(
        parseValue('#fF000000', 'test-key', styles as CSSStyleDeclaration)
      ).toEqual([255, 0, 0, 0]);
      expect(
        parseValue('#fff', 'test-key', styles as CSSStyleDeclaration)
      ).toEqual([255, 255, 255, 1]);
      expect(
        parseValue('#fff0', 'test-key', styles as CSSStyleDeclaration)
      ).toEqual([255, 255, 255, 0]);
      expect(
        parseValue('#00ff00', 'test-key', styles as CSSStyleDeclaration)
      ).toEqual([0, 255, 0, 1]);
    });
  });
});
