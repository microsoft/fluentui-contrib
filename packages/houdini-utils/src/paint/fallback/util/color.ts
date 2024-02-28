export type HexToRgba = (hex: string) => [number, number, number, number];

const parseRgba: HexToRgba = (rgbaHex) => {
  const color = parseInt(rgbaHex, 16);

  const r = (color >> 24) & 255;
  const g = (color >> 16) & 255;
  const b = (color >> 8) & 255;
  const a = color & 255;

  return [r, g, b, Math.trunc((a / 255) * 100) / 100];
};

export const hexToRgba: HexToRgba = (hex) => {
  let color = hex.charAt(0) === '#' ? hex.substring(1) : hex;
  const len = color.length;

  // See: https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color
  if (len === 8) {
    // RGBA
  } else if (len === 6) {
    // RGB
    color = `${color}ff`;
  } else if (len === 3) {
    // RGB shorthand
    color = `${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}ff`;
  } else if (len === 4) {
    // RGBA shorthand
    color = `${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
  }

  return parseRgba(color);
};
