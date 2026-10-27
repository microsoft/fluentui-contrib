import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // The panel width of the Microsoft 365 app launcher, matching the
    // grid so switching between the grid and the list does not resize
    // the panel.
    width: '320px',
    gap: tokens.spacingVerticalXXS,
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

/** Class names that style parts of the list. */
export type AppLauncherListClasses = {
  /** Applied to the list element. */
  root: string;
};

/**
 * Resolves the list style classes.
 *
 * The list removes the list decoration the `ul` element brings along and
 * fixes the panel width so the launcher does not resize with its content.
 *
 * @returns class names for the list slots
 */
export function useAppLauncherListStyles(): AppLauncherListClasses {
  const styles = useStyles();

  return { root: styles.root };
}
