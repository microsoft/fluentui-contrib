import {
  makeStyles,
  mergeClasses,
  type DrawerFooterState,
} from '@fluentui/react-components';
import { CAP_TOKENS } from '../../theme/CAPTheme';

export const useDrawerFooterStyles = makeStyles({
  root: {
    justifyContent: CAP_TOKENS['fixme/ctrl/drawer/footer/content-alignment'],
    paddingTop: CAP_TOKENS['cap/ctrl/flyout/Footer-Padding-top'],
    paddingRight: CAP_TOKENS['cap/ctrl/flyout/Footer-Padding-bottom'],
    paddingBottom: CAP_TOKENS['cap/ctrl/flyout/footer-Padding-Left'],
    paddingLeft: CAP_TOKENS['cap/ctrl/flyout/footer-Padding-Right'],
  },
});

export function useDrawerFooterStylesHook(
  state: DrawerFooterState
): DrawerFooterState {
  const styles = useDrawerFooterStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}
