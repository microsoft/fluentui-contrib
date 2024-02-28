import type { PaintWorkletBase } from '../types';

type BlobifyFn = (str: string) => Blob;
type StringifyFn = (
  name: string,
  classRefOrString: typeof PaintWorkletBase | string,
  className?: string
) => string;
export type AddPaintWorkletModuleFn = (
  name: string,
  classRefOrString: typeof PaintWorkletBase | string,
  className?: string
) => Promise<void>;

const stringify: StringifyFn = (name, classRefOrString, className) => {
  let clsStr = '';
  let clsName = className;

  if (typeof classRefOrString === 'string') {
    clsStr = classRefOrString;
    if (!clsName) {
      const nameFinder = /class\s([a-zA-Z0-9_]+)\s?\{/;
      const match = clsStr.match(nameFinder);

      if (!match) {
        throw new Error('Could not find class name in string');
      }

      clsName = match[1];
    }
  } else {
    clsStr = classRefOrString.toString();
    if (!clsName) {
      clsName = classRefOrString.name;
    }
  }

  let str = clsStr;
  str += '\n';
  str += `registerPaint('${name}', ${clsName})`;

  return str;
};

const blobify: BlobifyFn = (str: string) =>
  new Blob([str], { type: 'application/javascript' });

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace CSS {
  export const paintWorklet: {
    addModule: (url: string) => Promise<void>;
  };
}

/**
 * Add a paint worklet module.
 *
 * Classes must be valid paint worklets and _must_ be named.
 *
 * For example:
 *
 *   1. class MyHoudiniClass { paint() { .... } }
 *   2. "class MyHoundiniStringClass { paint() { .... } }" (i.e., a stringified class)
 *
 * These are now allowed as the class is not named:
 *
 *   1. class { paint() { .... } }
 *   2. "class { paint .... }"
 *   3. const MyHoudiniClass = class { paint() { .... } }
 *
 * When passing a reference pass the class itself, not an instance of the class. E.g.:
 *
 *   `addModule("myWorklet", MyHoudiniClass)`
 *  *  *
 * @param name - Name of the paint worklet (e.g., "flair")
 * @param classRefOrString - A class reference or a string representation of the class
 * @param className - Optional class name. When not passed the class's name will be derived from the class ref or string.
 * @returns void
 */
export const addModule: AddPaintWorkletModuleFn = (
  name,
  classRefOrString,
  className
) => {
  const str = stringify(name, classRefOrString, className);
  const blob = blobify(str);
  console.log('str', str);

  return CSS.paintWorklet.addModule(URL.createObjectURL(blob));
};
