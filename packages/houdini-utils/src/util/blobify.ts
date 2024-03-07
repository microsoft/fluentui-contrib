import { PaintWorklet } from '../types';

const stringify = (
  name: string,
  paintWorklet: typeof PaintWorklet | string,
  className?: string
) => {
  let clsStr = '';
  let clsName = className;

  if (typeof paintWorklet === 'string') {
    clsStr = paintWorklet;
    if (!clsName) {
      const nameFinder = /class\s([a-zA-Z0-9_]+)\s?\{/;
      const match = clsStr.match(nameFinder);

      if (!match) {
        throw new Error('Could not find class name in string');
      }

      clsName = match[1];
    }
  } else {
    clsStr = paintWorklet.toString();
    if (!clsName) {
      clsName = paintWorklet.name;
    }
  }

  let str = clsStr;
  str += '\n';
  str += `registerPaint('${name}', ${clsName})`;

  return str;
};

/**
 * Creates a Blob from a paint worklet.
 * @param name - name of the worklet
 * @param paintWorklet - either a class or javascript code
 * @param className - name of the class if `paintWorklet` is a string
 * @returns - a Blob
 */
export const blobify = (
  name: string,
  paintWorklet: typeof PaintWorklet | string,
  className?: string
): Blob => {
  const str = stringify(name, paintWorklet, className);
  return new Blob([str], { type: 'application/javascript' });
};
