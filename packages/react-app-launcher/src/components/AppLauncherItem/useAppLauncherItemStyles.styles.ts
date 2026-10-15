import { makeStyles, tokens } from '@fluentui/react-components';
import type { AppLauncherItemLayout } from './AppLauncherItemLayoutContext';

const useStyles = makeStyles({
  rootTile: {
    // Icon above the app name, the vertical tile layout of the Microsoft
    // 365 app launcher.
    flexDirection: 'column',
    gap: tokens.spacingVerticalSNudge,
    width: '100%',
    height: '100%',
    minWidth: '0',
    minHeight: '88px',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalXS}`,
    // The tiles read as white cards, the way the Microsoft 365 tiles do:
    // white and flat at rest — no border, no shadow — with a soft hover
    // lift. The lift sits in the middle of the standard shadow scale
    // (`shadow16`); the largest Fluent tokens (including the one closest
    // to the shadow measured in the Microsoft 365 launcher) read far too
    // heavy on tiles this size. `borderRadiusLarge` matches the 6px tile
    // radius of the Microsoft 365 tiles. The rules carry `:enabled` to
    // outweigh the `appearance="subtle"` styles of the button — at equal
    // specificity Fluent's stylesheet wins, because it is inserted after
    // this package's. The hovered tile also lifts above its neighbors
    // (`position` and `zIndex`): a shadow is painted together with the
    // tile, so the neighbors rendering later — the ones to the right and
    // below — would cover their share of it and leave the shadow
    // lopsided. A disabled tile matches none of the guarded rules, so it
    // keeps the button's own disabled look — a muted name and icon, no
    // hover reaction, a `not-allowed` cursor — which an application
    // toggles from business rules through the `disabled` prop. A
    // `disabledFocusable` item has no native attribute, so the guards skip
    // `[aria-disabled="true"]` as well and give it the same muted look. The
    // enabled states pin the foreground color so the name stays stable
    // while the button is hovered or pressed, and the hover shadow steps
    // aside for the keyboard focus ring, which Fluent draws as an inset
    // shadow on the same element.
    ':enabled:not([aria-disabled="true"])': {
      backgroundColor: tokens.colorNeutralBackground1,
      borderRadius: tokens.borderRadiusLarge,
      color: tokens.colorNeutralForeground1,
    },
    ':hover:enabled:not([aria-disabled="true"])': {
      backgroundColor: tokens.colorNeutralBackground1,
      color: tokens.colorNeutralForeground1,
      position: 'relative',
      zIndex: 1,
    },
    ':hover:enabled:active:not([aria-disabled="true"])': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      color: tokens.colorNeutralForeground1,
    },
    ':hover:enabled:not([aria-disabled="true"]):not([data-fui-focus-visible])':
      {
        boxShadow: tokens.shadow16,
      },
  },
  rootRow: {
    // Icon beside the app name, the horizontal row layout the list
    // container asks for.
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: tokens.spacingHorizontalS,
    width: '100%',
    minWidth: '0',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    // Same color handling as the tile: the enabled states pin the
    // foreground color so the name does not shift on hover, and a
    // disabled row keeps the button's muted disabled look.
    ':enabled:not([aria-disabled="true"])': {
      color: tokens.colorNeutralForeground1,
    },
    ':hover:enabled:not([aria-disabled="true"])': {
      color: tokens.colorNeutralForeground1,
    },
    ':hover:enabled:active:not([aria-disabled="true"])': {
      color: tokens.colorNeutralForeground1,
    },
  },
  labelTile: {
    // The name follows the button color, so it turns muted together
    // with a disabled tile; the enabled states pin that color on the
    // button, which keeps the name stable through hover and press.
    color: 'inherit',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase200,
    textAlign: 'center',
    overflowWrap: 'anywhere',
  },
  labelRow: {
    // Follows the button color like the tile label does, so a disabled
    // row shows a muted name.
    color: 'inherit',
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase300,
    textAlign: 'left',
    // A long name ends in an ellipsis instead of wrapping, the way list
    // rows read in the Microsoft 365 app launcher. `minWidth` lets the
    // label shrink below its content width so the ellipsis can appear.
    minWidth: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  icon: {
    // The icon sits in a box of its own so the disabled state can dim a
    // colorful logo. The box is a flex container: it hugs the icon at
    // its intrinsic size and avoids the extra space an inline image
    // would leave below the text baseline.
    display: 'flex',
  },
  iconDisabled: {
    // Disabled items dim a colorful logo the way the disabled styles
    // mute the name: the logo turns gray (`grayscale`) and lightens
    // (`opacity`) until it sits near the lightness of the disabled
    // text. A monochrome icon already draws with the text color and
    // just lightens a little further.
    filter: 'grayscale(1)',
    opacity: 0.5,
  },
});

/** Class names that style parts of an item in its resolved layout. */
export type AppLauncherItemClasses = {
  /** Applied to the item button. */
  root: string;
  /** Applied to the app name. */
  label: string;
  /** Applied to the box around the app icon. */
  icon: string;
  /** Applied to the icon box while the item is disabled. */
  iconDisabled: string;
};

/**
 * Resolves the item style classes for a layout.
 *
 * The tile layout stacks the icon above the app name and keeps a fixed
 * minimum height so tiles in a row stay aligned when a name wraps onto a
 * second line. The row layout puts the icon beside the name and truncates a
 * long name with an ellipsis.
 *
 * @param layout - layout the surrounding container resolved for the item
 * @returns class names for the item slots
 */
export function useAppLauncherItemStyles(
  layout: AppLauncherItemLayout
): AppLauncherItemClasses {
  const styles = useStyles();

  return layout === 'row'
    ? {
        root: styles.rootRow,
        label: styles.labelRow,
        icon: styles.icon,
        iconDisabled: styles.iconDisabled,
      }
    : {
        root: styles.rootTile,
        label: styles.labelTile,
        icon: styles.icon,
        iconDisabled: styles.iconDisabled,
      };
}
