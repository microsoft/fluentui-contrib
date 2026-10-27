import type { ReactNode, Ref } from 'react';
import type { AppLauncherListProps } from './AppLauncherList.types';
import type { AppLauncherListClasses } from './useAppLauncherListStyles.styles';
import { useAppLauncherListStyles } from './useAppLauncherListStyles.styles';

/**
 * State that {@link renderAppLauncherList} renders.
 */
export type AppLauncherListState = {
  /** Remaining native list props forwarded to the root element. */
  rootProps: Omit<AppLauncherListProps, 'children'>;
  /** Rows to lay out. */
  children: ReactNode;
  /** Ref to the list element, forwarded to the applications. */
  rootRef: Ref<HTMLUListElement>;
  /** Resolved list style classes. */
  classes: AppLauncherListClasses;
};

/**
 * Resolves the list props into render state.
 *
 * There is no defaulting to do yet; the hook keeps the block shape of the
 * grid and leaves room for list options, such as a maximum height, to land
 * in one place.
 *
 * @param props - props from this instance of the list
 * @param ref - ref to the list element
 * @returns the state consumed by {@link renderAppLauncherList}
 */
export function useAppLauncherList(
  props: AppLauncherListProps,
  ref: Ref<HTMLUListElement>
): AppLauncherListState {
  const { children, ...rootProps } = props;

  const classes = useAppLauncherListStyles();

  return {
    rootProps,
    children,
    rootRef: ref,
    classes,
  };
}
