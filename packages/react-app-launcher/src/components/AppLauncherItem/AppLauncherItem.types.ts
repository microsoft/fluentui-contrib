import type { ComponentPropsWithoutRef, ReactElement } from 'react';

/**
 * Props of an app launcher item.
 *
 * The item renders the app name as the button text, so the accessible name
 * is the visible label and no `aria-label` is needed. The surrounding
 * container decides the layout: a tile (icon above the name) inside an
 * `AppLauncherGrid`, a row (icon beside the name) inside an `AppLauncherList`.
 * All native button props (`onClick`, `disabled`, `className`, ...) pass
 * through to the button element.
 */
export type AppLauncherItemProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
> & {
  /** Name of the app, shown with the icon and used as the accessible name. */
  label: string;

  /**
   * Icon shown with the app name — above it in a grid, beside it in a list
   * — for example a sized Fluent icon (`<Mail32Regular />`), or an
   * application logo element. The item does not constrain the icon's size.
   * When omitted, only the label is shown.
   */
  icon?: ReactElement;

  /**
   * Renders the item disabled but reachable: `aria-disabled` is set instead
   * of the native `disabled` attribute, so the item keeps its place in the
   * tab order and is announced as disabled while never activating. The item
   * shows the same muted look as a `disabled` item. When both `disabled`
   * and `disabledFocusable` are set, the Button's own precedence applies:
   * the item stays focusable and is announced disabled.
   */
  disabledFocusable?: boolean;
};
