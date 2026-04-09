import { menuButtonClassNames } from '@fluentui/react-button';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useButtonStyles } from '../Button/useButtonStyles.styles';
import type { MenuButtonState } from './MenuButton.types';

const useMenuIconStyles = makeStyles({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  medium: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  large: {
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
  },
});

const useMenuIconRootTextWithIconStyles = makeStyles({
  small: { marginLeft: tokens.spacingHorizontalXXS },
  medium: { marginLeft: tokens.spacingHorizontalSNudge },
  large: { marginLeft: tokens.spacingHorizontalSNudge },
});

export const useMenuButtonStyles = (
  state: MenuButtonState
): MenuButtonState => {
  const menuIconStyles = useMenuIconStyles();
  const menuIconRootTextWithIconStyles = useMenuIconRootTextWithIconStyles();
  const { iconOnly, size } = state;

  state.root.className = mergeClasses(
    state.root.className,
    menuButtonClassNames.root,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      menuButtonClassNames.icon,
      getSlotClassNameProp_unstable(state.icon)
    );
  }

  if (state.menuIcon) {
    state.menuIcon.className = mergeClasses(
      state.menuIcon.className,
      menuButtonClassNames.menuIcon,
      menuIconStyles.base,
      menuIconStyles[size],
      !iconOnly && menuIconRootTextWithIconStyles[size],
      getSlotClassNameProp_unstable(state.menuIcon)
    );
  }

  useButtonStyles({ ...state, iconPosition: 'before' });
  return state;
};
