import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Props of an app launcher section.
 *
 * A section groups related tiles under an optional title. Sections that
 * follow another section are separated by spacing, and optionally by a
 * divider line when `divider` is set. All native div props (`className`,
 * `aria-*`, event handlers, ...) pass through to the section element.
 */
export type AppLauncherSectionProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'title'
> & {
  /** Tiles of this section, usually an `AppLauncherGrid`. */
  children: ReactNode;

  /**
   * Section title shown above the content, for example "Pinned" or
   * "All apps". When omitted, the section renders only its content and the
   * spacing above it.
   */
  title?: string;

  /**
   * Draws a divider line above the section, between it and the previous
   * section. Defaults to `false`.
   */
  divider?: boolean;
};
