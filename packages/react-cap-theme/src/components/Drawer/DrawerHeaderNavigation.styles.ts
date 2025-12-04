import {
  makeStyles,
  mergeClasses,
  type DrawerHeaderNavigationState,
} from '@fluentui/react-components';

export const useDrawerHeaderNavigationStyles = makeStyles({
  root: {},
});

export function useDrawerHeaderNavigationStylesHook(
  state: DrawerHeaderNavigationState
): DrawerHeaderNavigationState {
  const styles = useDrawerHeaderNavigationStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  return state;
}
