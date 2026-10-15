import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    // Space between stacked sections, but not above the first one, where
    // the surface padding already provides the gap.
    ':not(:first-child)': {
      marginBlockStart: tokens.spacingVerticalL,
    },
  },
  rootWithDivider: {
    ':not(:first-child)': {
      paddingBlockStart: tokens.spacingVerticalL,
      // Longhands on purpose: Griffel's style types reject the
      // `borderBlockStart` shorthand, and the logical form keeps the
      // divider correct in vertical writing modes.
      borderBlockStartWidth: tokens.strokeWidthThin,
      borderBlockStartStyle: 'solid',
      borderBlockStartColor: tokens.colorNeutralStroke2,
    },
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    paddingInlineStart: tokens.spacingHorizontalS,
  },
});

/** Class names that style parts of a section. */
export type AppLauncherSectionClasses = {
  /** Applied to the section element. */
  root: string;
  /** Added to the root when the section draws a divider. */
  rootWithDivider: string;
  /** Applied to the section title. */
  title: string;
};

/**
 * Resolves the section style classes.
 *
 * Section spacing and the divider line only apply from the second section
 * on: the first section sits flush against the surface padding, and each
 * following section is separated by space, plus a divider line when the
 * section asks for one.
 *
 * @returns class names for the section slots
 */
export function useAppLauncherSectionStyles(): AppLauncherSectionClasses {
  const styles = useStyles();

  return {
    root: styles.root,
    rootWithDivider: styles.rootWithDivider,
    title: styles.title,
  };
}
