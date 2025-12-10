import {
  makeStyles,
  mergeClasses,
  tokens,
  type DrawerBodyState,
} from '@fluentui/react-components';
import { CAP_TOKENS } from '../../theme/CAPTheme';

export const useDrawerBodyStyles = makeStyles({
  root: {
    paddingLeft: CAP_TOKENS['cap/ctrl/flyout/body-Padding-Left'],
    paddingRight: CAP_TOKENS['cap/ctrl/flyout/body-Padding-Right'],
  },
});

export function useDrawerBodyStylesHook(
  state: DrawerBodyState
): DrawerBodyState {
  const styles = useDrawerBodyStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}
