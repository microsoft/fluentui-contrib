import { makeStyles, tokens } from '@fluentui/react-components';
import type { AppLauncherDocking } from './AppLauncher.types';

/**
 * Panel background shared by both docking variants.
 *
 * Fluent's own surface style wins on equal specificity, because its
 * stylesheet is inserted after this package's. The selector therefore
 * carries the `data-app-launcher-surface` attribute the render adds, and the
 * background stays pinned in one place: currently the Fluent default,
 * `colorNeutralBackground1` (white in the light theme).
 */
const panelBackground = {
  '&[data-app-launcher-surface]': {
    backgroundColor: tokens.colorNeutralBackground1,
  },
} as const;

const useStyles = makeStyles({
  surface: {
    borderRadius: tokens.borderRadiusXLarge,
    ...panelBackground,
  },
  surfaceFullDock: {
    // Asking for the full window height is what makes the positioning
    // layer's height clamp — and with it the dock — always apply.
    height: '100dvh',
    // The full dock matches the default dock's 8px rounding on the
    // corners that do not touch the window edge and stays square at the
    // bottom, where the panel is flush with the window.
    borderTopLeftRadius: tokens.borderRadiusXLarge,
    borderTopRightRadius: tokens.borderRadiusXLarge,
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
    ...panelBackground,
  },
});

/** Class names that style parts of the launcher. */
export type AppLauncherClasses = {
  /** Applied to the popover surface. */
  surface: string;
};

/**
 * Resolves the surface style classes.
 *
 * The default docking rounds the surface with `borderRadiusXLarge` (8px), the
 * radius used by the Microsoft 365 app launcher. Full docking sizes the
 * surface instead: it asks for the full window height, rounds only the top
 * corners — staying square where the panel meets the window — and the
 * positioning layer clamps it to the space below the anchor, scrolling the
 * content when it is taller. Both variants carry the panel background from
 * one place.
 *
 * @param docking - resolved docking behavior
 * @returns class names for the surface slot
 */
export function useAppLauncherStyles(
  docking: AppLauncherDocking
): AppLauncherClasses {
  const styles = useStyles();

  return {
    surface: docking === 'full' ? styles.surfaceFullDock : styles.surface,
  };
}
