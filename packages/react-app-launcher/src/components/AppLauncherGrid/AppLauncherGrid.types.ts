import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Props of the app launcher grid.
 *
 * The grid lays its children out as tiles and wraps each one in a list item,
 * so assistive technology announces the panel content as a list of apps. Pass
 * `AppLauncherItem` elements as children. All native list props (`className`,
 * `aria-*`, event handlers, ...) pass through to the `ul` element.
 */
export type AppLauncherGridProps = Omit<
  ComponentPropsWithoutRef<'ul'>,
  'children'
> & {
  /** Tiles to lay out; pass `AppLauncherItem` elements. */
  children: ReactNode;

  /**
   * Number of tile columns. Defaults to 3, the column count of the
   * Microsoft 365 app launcher.
   */
  columns?: number;
};
