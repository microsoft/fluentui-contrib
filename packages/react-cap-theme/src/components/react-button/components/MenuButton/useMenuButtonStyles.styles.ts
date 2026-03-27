import { menuButtonClassNames } from '@fluentui/react-button';
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
    menuButtonClassNames.root,
    state.root.className
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      menuButtonClassNames.icon,
      state.icon.className
    );
  }

  if (state.menuIcon) {
    state.menuIcon.className = mergeClasses(
      menuButtonClassNames.menuIcon,
      menuIconStyles.base,
      menuIconStyles[size],
      !iconOnly && menuIconRootTextWithIconStyles[size],
      state.menuIcon.className
    );
  }

  useButtonStyles({ ...state, iconPosition: 'before' });
  return state;
};
