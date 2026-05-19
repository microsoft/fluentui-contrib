import type { CompoundButtonState } from '@fluentui/react-button';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/tokens';
import { useButtonStyles } from '../Button/useButtonStyles.styles';

const compoundSpacingSmall = '7px';
const compoundSpacingMedium = '11px';
const compoundSpacingLarge = '15px';

const useContentContainerBaseClassName = makeResetStyles({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'start',
});

const useSecondaryContentBaseClassName = makeResetStyles({
  ...typographyStyles.caption1,
  lineHeight: '100%',
  width: '100%',
});

const useRootStyles = makeStyles({
  base: {
    height: 'auto',
  },
  small: {
    gap: tokens.spacingHorizontalS,
    padding: `${compoundSpacingSmall} ${tokens.spacingHorizontalS}`,
  },
  medium: {
    gap: tokens.spacingHorizontalM,
    padding: `${compoundSpacingMedium} ${tokens.spacingHorizontalM}`,
  },
  large: {
    gap: tokens.spacingHorizontalL,
    padding: `${compoundSpacingLarge} ${tokens.spacingHorizontalL}`,
  },
});

const useRootIconOnlyStyles = makeStyles({
  small: {
    padding: tokens.spacingHorizontalXS,
    maxWidth: '48px',
    minWidth: '48px',
  },
  medium: {
    padding: tokens.spacingHorizontalSNudge,
    maxWidth: '52px',
    minWidth: '52px',
  },
  large: {
    padding: tokens.spacingHorizontalS,
    maxWidth: '56px',
    minWidth: '56px',
  },
});

const useIconStyles = makeStyles({
  small: {
    fontSize: '40px',
    width: '40px',
    height: '40px',
    margin: '0',
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
  },
  medium: {
    fontSize: '40px',
    width: '40px',
    height: '40px',
    margin: '0',
    borderRadius: tokens.borderRadiusXLarge,
    overflow: 'hidden',
  },
  large: {
    fontSize: '40px',
    width: '40px',
    height: '40px',
    margin: '0',
    borderRadius: tokens.borderRadiusXLarge,
    overflow: 'hidden',
  },
});

/**
 * @param state - The CompoundButton state object
 * @returns The styled CompoundButton state
 * @alpha
 */
export const useCompoundButtonStyles = (
  state: CompoundButtonState
): CompoundButtonState => {
  const contentContainerBaseClassName = useContentContainerBaseClassName();
  const secondaryContentBaseClassName = useSecondaryContentBaseClassName();
  const rootStyles = useRootStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();

  const { iconOnly, size } = state;

  useButtonStyles(state);

  state.root.className = mergeClasses(
    state.root.className,
    rootStyles.base,
    rootStyles[size],
    iconOnly && rootIconOnlyStyles[size],
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.contentContainer) {
    state.contentContainer.className = mergeClasses(
      state.contentContainer.className,
      contentContainerBaseClassName,
      getSlotClassNameProp_unstable(state.contentContainer)
    );
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      state.secondaryContent.className,
      secondaryContentBaseClassName,
      getSlotClassNameProp_unstable(state.secondaryContent)
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      iconStyles[size],
      getSlotClassNameProp_unstable(state.icon)
    );
  }

  return state;
};
