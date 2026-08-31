import type { TeachingPopoverBodyState } from '@fluentui/react-teaching-popover';
import {
  usePopoverContext_unstable,
  type PopoverContextValue,
} from '@fluentui/react-popover';
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    paddingBottom: tokens.spacingHorizontalL,
    color: tokens.colorNeutralForeground1,
    ...typographyStyles.body1,
  },
  brand: { color: tokens.colorNeutralForegroundOnBrand },
  media: { borderRadius: tokens.borderRadiusXLarge },
});

export const useTeachingPopoverBodyStyles = (
  state: TeachingPopoverBodyState
): TeachingPopoverBodyState => {
  const appearance = usePopoverContext_unstable(
    (context: PopoverContextValue) => context.appearance
  );

  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    appearance === 'brand' && styles.brand,
    getSlotClassNameProp_unstable(state.root)
  );
  if (state.media) {
    state.media.className = mergeClasses(
      state.media.className,
      styles.media,
      getSlotClassNameProp_unstable(state.media)
    );
  }

  return state;
};
