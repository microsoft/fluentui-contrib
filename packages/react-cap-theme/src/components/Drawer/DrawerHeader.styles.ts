import {
  makeStyles,
  mergeClasses,
  tokens,
  type DrawerHeaderState,
} from '@fluentui/react-components';
import { CAP_TOKENS } from '../../theme/CAPTheme';

export const useDrawerHeaderStyles = makeStyles({
  root: {
    paddingTop: CAP_TOKENS['smtc/v1/ctrl/flyout/header/paddingTop'],
    paddingRight: CAP_TOKENS['smtc/v1/ctrl/flyout/header/Padding-Right'],
    paddingBottom: CAP_TOKENS['fixme/ctrl/drawer/header/padding-bottom'],
    paddingLeft: CAP_TOKENS['smtc/v1/ctrl/flyout/header/Padding-Left'],
  },
});

export function useDrawerHeaderStylesHook(
  state: DrawerHeaderState
): DrawerHeaderState {
  const styles = useDrawerHeaderStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}
