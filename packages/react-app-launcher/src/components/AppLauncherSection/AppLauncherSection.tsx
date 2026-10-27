import * as React from 'react';
import type { AppLauncherSectionProps } from './AppLauncherSection.types';
import { renderAppLauncherSection } from './renderAppLauncherSection';
import { useAppLauncherSection } from './useAppLauncherSection';

/**
 * Group of app tiles inside the launcher panel.
 *
 * Wraps a content block — usually an `AppLauncherGrid` — under an optional
 * title, and separates itself from the previous section with spacing and,
 * when `divider` is set, a divider line. The layout stays composable: an
 * untitled section is just a block, and grids work without a section.
 *
 * @example
 * ```tsx
 * <AppLauncherSection title="All apps" divider>
 *     <AppLauncherGrid>…tiles…</AppLauncherGrid>
 * </AppLauncherSection>
 * ```
 */
export const AppLauncherSection = React.forwardRef<
  HTMLDivElement,
  AppLauncherSectionProps
>((props, ref) => {
  const state = useAppLauncherSection(props, ref);

  return renderAppLauncherSection(state);
});

AppLauncherSection.displayName = 'AppLauncherSection';
