import {
  makeStyles,
  mergeClasses,
  type DrawerState,
} from '@fluentui/react-components';
import { CAP_TOKENS } from '../../theme/CAPTheme';

export const useDrawerStyles = makeStyles({
  root: {
    borderRadius: CAP_TOKENS['cap/ctrl/flyout/base-corner'],
    boxShadow: CAP_TOKENS['cap/ctrl/flyout/Elevation'],
  },
});

export function useDrawerStylesHook(state: DrawerState): DrawerState {
  const styles = useDrawerStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}
