import { tokens } from '../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { DrawerBaseState } from '../components/Drawer/Drawer.types';

const borderRadius = tokens.borderRadius3XLarge;

const useDrawerStyles = makeStyles({
  start: { borderRadius: `0 ${borderRadius} ${borderRadius} 0` },
  end: { borderRadius: `${borderRadius} 0 0 ${borderRadius}` },
  bottom: { borderRadius: `${borderRadius} ${borderRadius} 0 0` },
});

export const useDrawerBaseClassNames = (state: DrawerBaseState): string => {
  const baseStyles = useDrawerStyles();
  return mergeClasses(baseStyles[state.position]);
};
