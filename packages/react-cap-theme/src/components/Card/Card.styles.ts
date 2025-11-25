import {
  makeStyles,
  mergeClasses,
  type CardState,
} from '@fluentui/react-components';
import { CAP_TOKENS } from '../../theme/CAPTheme';

export const useCardStyles = makeStyles({
  root: {
    borderRadius: CAP_TOKENS['fixme/ctrl/card/corner-radius'],
  },
});

export function useCardStylesHook(state: CardState): CardState {
  const styles = useCardStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}
