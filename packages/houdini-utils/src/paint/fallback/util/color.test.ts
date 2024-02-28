import { hexToRgba } from './color';

type TestColor = [string, number[]];

const rgbaColor: TestColor[] = [
  // Fully opaque
  ['#ff0000FF', [255, 0, 0, 1]],
  ['#00Ff00ff', [0, 255, 0, 1]],
  ['#0000FFff', [0, 0, 255, 1]],
  ['#f0FFf0fF', [240, 255, 240, 1]],

  // Fully transparent
  ['#ff000000', [255, 0, 0, 0]],
  ['#00fF0000', [0, 255, 0, 0]],
  ['#0000fF00', [0, 0, 255, 0]],
  ['#f0FFF000', [240, 255, 240, 0]],

  // Partially transparent
  ['#43ff64D9', [67, 255, 100, 0.85]],
  ['#f0f8FfF0', [240, 248, 255, 0.94]],
  ['#Ff69b4Ae', [255, 105, 180, 0.68]],
];

const rgbaShorthandColor: TestColor[] = [
  // Fully opaque
  ['#f00F', [255, 0, 0, 1]],
  ['#0F0f', [0, 255, 0, 1]],
  ['#00Ff', [0, 0, 255, 1]],

  // Fully transparent
  ['#f000', [255, 0, 0, 0]],
  ['#0f00', [0, 255, 0, 0]],
  ['#00f0', [0, 0, 255, 0]],

  // Partially transparent
  ['#f00a', [255, 0, 0, 0.66]],
  ['#0f0d', [0, 255, 0, 0.86]],
  ['#00f8', [0, 0, 255, 0.53]],
];

const rgbColor: TestColor[] = [
  ['#ff0000', [255, 0, 0, 1]],
  ['#00Ff00', [0, 255, 0, 1]],
  ['#0000FF', [0, 0, 255, 1]],
  ['#f0FFf0', [240, 255, 240, 1]],

  ['#43ff64', [67, 255, 100, 1]],
  ['#f0f8Ff', [240, 248, 255, 1]],
  ['#Ff69b4', [255, 105, 180, 1]],
];

const rgbShorthandColor: TestColor[] = [
  ['#f00', [255, 0, 0, 1]],
  ['#0F0', [0, 255, 0, 1]],
  ['#00F', [0, 0, 255, 1]],
];

describe('color', () => {
  describe('#RGBA', () => {
    describe('all lower case', () => {
      it.each(
        rgbaColor.map((color: TestColor) => {
          return [color[0].toLowerCase(), color[1]];
        })
      )('should convert %s to %s', (hex, rgba) => {
        expect(hexToRgba(hex)).toEqual(rgba);
      });
    });

    describe('all upper case', () => {
      it.each(
        rgbaColor.map((color: TestColor) => {
          return [color[0].toUpperCase(), color[1]];
        })
      )('should convert %s to %s', (hex, rgba) => {
        expect(hexToRgba(hex)).toEqual(rgba);
      });
    });

    describe('mixed case', () => {
      it.each(rgbaColor)('should convert %s to %s', (hex, rgba) => {
        expect(hexToRgba(hex)).toEqual(rgba);
      });
    });
  });

  describe('#RGB', () => {
    describe('all lower case', () => {
      it.each(
        rgbColor.map((color: TestColor) => {
          return [color[0].toLowerCase(), color[1]];
        })
      )('should convert %s to %s', (hex, rgba) => {
        expect(hexToRgba(hex)).toEqual(rgba);
      });
    });

    describe('all upper case', () => {
      it.each(
        rgbColor.map((color: TestColor) => {
          return [color[0].toUpperCase(), color[1]];
        })
      )('should convert %s to %s', (hex, rgba) => {
        expect(hexToRgba(hex)).toEqual(rgba);
      });
    });

    describe('mixed case', () => {
      it.each(rgbColor)('should convert %s to %s', (hex, rgba) => {
        expect(hexToRgba(hex)).toEqual(rgba);
      });
    });
  });

  describe('#RGBA shorthand', () => {
    describe('all lower case', () => {
      it.each(
        rgbaShorthandColor.map((color: TestColor) => {
          return [color[0].toLowerCase(), color[1]];
        })
      )('should convert %s to %s', (hex, rgba) => {
        expect(hexToRgba(hex)).toEqual(rgba);
      });
    });

    describe('all upper case', () => {
      it.each(
        rgbaShorthandColor.map((color: TestColor) => {
          return [color[0].toUpperCase(), color[1]];
        })
      )('should convert %s to %s', (hex, rgba) => {
        expect(hexToRgba(hex)).toEqual(rgba);
      });
    });

    describe('mixed case', () => {
      it.each(rgbaShorthandColor)('should convert %s to %s', (hex, rgba) => {
        expect(hexToRgba(hex)).toEqual(rgba);
      });
    });
  });

  describe('#RGB shorthand', () => {
    describe('all lower case', () => {
      it.each(
        rgbShorthandColor.map((color: TestColor) => {
          return [color[0].toLowerCase(), color[1]];
        })
      )('should convert %s to %s', (hex, rgba) => {
        expect(hexToRgba(hex)).toEqual(rgba);
      });
    });

    describe('all upper case', () => {
      it.each(
        rgbShorthandColor.map((color: TestColor) => {
          return [color[0].toUpperCase(), color[1]];
        })
      )('should convert %s to %s', (hex, rgba) => {
        expect(hexToRgba(hex)).toEqual(rgba);
      });
    });

    describe('mixed case', () => {
      it.each(rgbShorthandColor)('should convert %s to %s', (hex, rgba) => {
        expect(hexToRgba(hex)).toEqual(rgba);
      });
    });
  });
});
