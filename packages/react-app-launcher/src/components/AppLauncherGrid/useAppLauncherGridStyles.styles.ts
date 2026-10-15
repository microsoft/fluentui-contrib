import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    // The panel width of the Microsoft 365 app launcher. The grid owns it
    // because the surface wraps its content: the widest block inside the
    // panel decides how wide the launcher opens.
    width: '320px',
    gap: tokens.spacingHorizontalXS,
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

/** Class names that style parts of the grid. */
export type AppLauncherGridClasses = {
  /** Applied to the list element. */
  root: string;
};

/**
 * Resolves the grid style classes.
 *
 * The grid removes the list decoration the `ul` element brings along and
 * fixes the panel width so the launcher does not resize with its content.
 *
 * @returns class names for the grid slots
 */
export function useAppLauncherGridStyles(): AppLauncherGridClasses {
  const styles = useStyles();

  return { root: styles.root };
}
