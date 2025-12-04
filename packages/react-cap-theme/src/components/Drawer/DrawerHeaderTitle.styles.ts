import {
  makeStyles,
  mergeClasses,
  type DrawerHeaderTitleState,
} from '@fluentui/react-components';

export const useDrawerHeaderTitleStyles = makeStyles({
  root: {},
  heading: {},
  action: {},
});

export function useDrawerHeaderTitleStylesHook(
  state: DrawerHeaderTitleState
): DrawerHeaderTitleState {
  const styles = useDrawerHeaderTitleStyles();

  state.root.className = mergeClasses(state.root.className, styles.root);

  if (state.heading) {
    state.heading.className = mergeClasses(
      state.heading.className,
      styles.heading
    );
  }

  if (state.action) {
    state.action.className = mergeClasses(
      state.action.className,
      styles.action
    );
  }

  return state;
}
