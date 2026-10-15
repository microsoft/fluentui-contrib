import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Props of an app launcher list.
 *
 * The list stacks its children as full-width rows — the icon beside the app
 * name — the layout the search results of the Microsoft 365 app launcher
 * use. All native list props (`className`, `aria-*`, event handlers, ...)
 * pass through to the `ul` element.
 */
export type AppLauncherListProps = Omit<
  ComponentPropsWithoutRef<'ul'>,
  'children'
> & {
  /** Rows to lay out, usually `AppLauncherItem` elements. */
  children: ReactNode;
};
