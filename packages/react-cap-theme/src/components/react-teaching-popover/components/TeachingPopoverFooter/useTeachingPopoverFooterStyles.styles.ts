import { teachingPopoverFooterClassNames } from '@fluentui/react-teaching-popover';
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import type { TeachingPopoverFooterState } from './TeachingPopoverFooter.types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  vertical: {
    flexDirection: 'column',
  },
  buttonVertical: {
    width: 'auto',
  },
});

export const useTeachingPopoverFooterStyles = (
  state: TeachingPopoverFooterState
): TeachingPopoverFooterState => {
  const styles = useStyles();
  const isVertical = state.footerLayout === 'vertical';

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    isVertical ? styles.vertical : styles.horizontal,
    getSlotClassNameProp_unstable(state.root)
  );

  // NOTE: we intentionally do NOT merge `state.primary.className` /
  // `state.secondary.className` here. Fluent's `useTeachingPopoverFooterStyles_unstable`
  // pre-applies button-shaping classes (`min-width: 96px`, `border-radius: 4px`,
  // brand color overrides) to those slots. Those classes are then passed as the
  // `className` prop on the rendered <Button> and end up re-applied LAST in the
  // cascade inside CAP's `useButtonStyles` (via `getSlotClassNameProp_unstable`),
  // overriding CAP's button styles.
  // We keep only the global identifier class (`fui-TeachingPopoverFooter__primary`
  // / `__secondary`) so consumers can still target the slots with CSS selectors.
  state.primary.className = mergeClasses(
    teachingPopoverFooterClassNames.primary,
    isVertical && styles.buttonVertical,
    getSlotClassNameProp_unstable(state.primary)
  );

  if (state.secondary) {
    state.secondary.className = mergeClasses(
      teachingPopoverFooterClassNames.secondary,
      isVertical && styles.buttonVertical,
      getSlotClassNameProp_unstable(state.secondary)
    );
  }

  return state;
};
