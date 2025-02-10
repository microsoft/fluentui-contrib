import { makeStyles } from '@fluentui/react-components';
import type { MakeStrictStyles, StrictCssClass, StrictStyles } from './types';
import { createStrictClass } from './createStrictClass';

const makeStrictStylesImpl: MakeStrictStyles = (
  styles: Record<string, StrictStyles>
) => {
  const useStyles = makeStyles(styles);
  return () => {
    const classes = useStyles();
    const entries = Object.entries(classes).map(([slot, className]) => {
      return [slot, createStrictClass(className)];
    });

    return Object.fromEntries(entries) as Record<
      keyof typeof styles,
      StrictCssClass
    >;
  };
};

export const makeStrictStyles: MakeStrictStyles =
  process.env.NODE_ENV === 'production'
    ? // @ts-expect-error - makeStyles returns strings, so it is still valide with a `.toString` call
      (makeStyles as MakeStrictStyles)
    : makeStrictStylesImpl;
