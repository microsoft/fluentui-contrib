import type { ReactNode, Ref } from 'react';
import type { AppLauncherGridProps } from './AppLauncherGrid.types';
import type { AppLauncherGridClasses } from './useAppLauncherGridStyles.styles';
import { useAppLauncherGridStyles } from './useAppLauncherGridStyles.styles';

/** Column count of the Microsoft 365 app launcher grid. */
const DEFAULT_COLUMNS = 3;

/**
 * State that {@link renderAppLauncherGrid} renders.
 */
export type AppLauncherGridState = {
  /** Grid template built from the resolved column count. */
  gridTemplateColumns: string;
  /** Remaining native list props forwarded to the root element. */
  rootProps: Omit<AppLauncherGridProps, 'children' | 'columns'>;
  /** Tiles to lay out. */
  children: ReactNode;
  /** Ref to the list element, forwarded to the applications. */
  rootRef: Ref<HTMLUListElement>;
  /** Resolved grid style classes. */
  classes: AppLauncherGridClasses;
};

/**
 * Resolves the grid props into render state.
 *
 * The column template uses `minmax(0, 1fr)` so tiles can shrink below their
 * content width; without it a long app name would widen the grid column and
 * with it the whole panel.
 *
 * @param props - props from this instance of the grid
 * @param ref - ref to the list element
 * @returns the state consumed by {@link renderAppLauncherGrid}
 */
export function useAppLauncherGrid(
  props: AppLauncherGridProps,
  ref: Ref<HTMLUListElement>
): AppLauncherGridState {
  const { children, columns = DEFAULT_COLUMNS, ...rootProps } = props;

  const classes = useAppLauncherGridStyles();

  return {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    rootProps,
    children,
    rootRef: ref,
    classes,
  };
}
