import type { Eases } from '../../../types';
import { hexToRgba } from './color';

export const stepValueToPercentage = (stepKey: string): number => {
  const [, percentage] = stepKey.match(/(\d+)%/) ?? [];
  if (percentage === undefined) {
    if (stepKey === 'to') {
      return 1;
    }
    return 0;
  }

  return parseFloat(percentage) / 100;
};

export const timeToNumber = (time: string): number => {
  return parseFloat(time.trim().replace(/m?s/, ''));
};

export const processTimingFunction = (): Eases => {
  return 'linear';
};

const matchColor = (color: string): number | number[] | undefined => {
  let matches = color.match(/rgba\((\d+),\s?(\d+),\s?(\d+),\s(\d*\.?\d+)\)/);
  if (matches) {
    // Parse rgba() syntax
    return matches?.slice(1, 5).map(parseFloat); // [ r, g, b, a ]
  } else {
    // Is it a hex color?
    matches = color.match(/#([0-9a-fA-F]{3,8})/);
    if (matches) {
      return hexToRgba(matches[1]);
    }
  }

  return undefined;
};

export const parseValue = (
  value: string,
  key: string,
  styles: CSSStyleDeclaration
): number | number[] | undefined => {
  const floatValue = parseFloat(value);

  if (!Number.isNaN(floatValue)) {
    return floatValue;
  }

  const rgba = matchColor(value);

  if (rgba) {
    return rgba;
  }

  const matches = value.match(/var\(([-a-zA-Z0-9]+)\)/);
  if (!matches) {
    console.error('Could not parse value', value, 'key', key);
    return;
  }
  const [, varName] = matches;
  const styleValue = styles.getPropertyValue(varName);
  if (!styleValue) {
    console.error('Could not parse value', value, 'varName', varName);
  }

  return matchColor(styleValue);
};

export const arrayToRgba = ([r, g, b, a]: number[]): string => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
