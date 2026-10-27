import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Padding of the launcher's `PopoverSurface` (`size="medium"`, Fluent's
 * default). The sticky field wrapper compensates it, so its opaque background
 * covers the surface's padding band instead of leaving it exposed.
 */
const surfacePadding = '16px';

const useStyles = makeStyles({
  root: {
    // The wrapper pins the field to the panel's top while the content
    // scrolls under it (the surface is the scroll container). A sticky child
    // pins below the surface's content padding, where scrolled content would
    // show in the band above the field; the wrapper reaches up over that
    // band instead — the matching negative margin and sticky offset plus its
    // own top padding keep the field in place while its opaque background
    // covers the panel's top band across its width. The z-index keeps the
    // wrapper above the hover-lifted tiles, which paint at z-index 1.
    //
    // The band compensation lives on this wrapper rather than on the
    // SearchBox itself: Fluent draws the field's outline on the SearchBox's
    // own root element, so padding applied there would stretch the visible
    // box and push its text to the bottom edge.
    position: 'sticky',
    top: `-${surfacePadding}`,
    marginTop: `-${surfacePadding}`,
    paddingTop: surfacePadding,
    zIndex: 2,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  field: {
    // The field spans the panel. The surface wraps its content, so the
    // widest block inside the panel decides how wide the launcher opens —
    // the search box must fill that width, not become it.
    width: '100%',
  },
});

/** Class names that style parts of the search field. */
export type AppLauncherSearchClasses = {
  /** Applied to the sticky wrapper around the search field. */
  root: string;
  /** Applied to the search field itself. */
  field: string;
};

/**
 * Resolves the search field style classes.
 *
 * The wrapper pins the field to the panel's top — covering the surface's
 * padding band so no scrolled content shows above the field — while the
 * content scrolls under it; inert while the content fits. The field itself
 * keeps the Fluent SearchBox defaults: outline, search icon, clear button,
 * and its native height.
 *
 * @returns class names for the search field slots
 */
export function useAppLauncherSearchStyles(): AppLauncherSearchClasses {
  const styles = useStyles();

  return { root: styles.root, field: styles.field };
}
