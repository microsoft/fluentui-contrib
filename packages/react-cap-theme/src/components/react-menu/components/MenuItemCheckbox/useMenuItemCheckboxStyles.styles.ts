import type { MenuItemCheckboxState } from '@fluentui/react-menu';
import {
  menuItemCheckboxClassNames,
  menuItemClassNames,
} from '@fluentui/react-menu';
export { menuItemCheckboxClassNames } from '@fluentui/react-menu';
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/tokens';

import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles.styles';
import { useCheckmarkStyles_unstable } from '../../selectable/useCheckmarkStyles.style';

const useInteractiveStyles = makeStyles({
  root: {
    [`:hover .${menuItemClassNames.checkmark}`]: { visibility: 'visible' },
  },
});

const useCheckmarkStyles = makeStyles({
  base: {
    fontSize: tokens.fontSizeBase400,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXXS}`,
  },
  unchecked: { visibility: 'hidden' },
});

export const useMenuItemCheckboxStyles = (
  state: MenuItemCheckboxState
): MenuItemCheckboxState => {
  const { checked, disabled } = state;
  const interactiveStyles = useInteractiveStyles();
  const checkmarkStyles = useCheckmarkStyles();

  state.root.className = mergeClasses(
    state.root.className,
    menuItemCheckboxClassNames.root,
    !disabled && interactiveStyles.root,
  );

  if (state.content) {
    state.content.className = mergeClasses(
      state.content.className,
      menuItemCheckboxClassNames.content,
    );
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      state.secondaryContent.className,
      menuItemCheckboxClassNames.secondaryContent,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      menuItemCheckboxClassNames.icon,
    );
  }

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      state.checkmark.className,
      menuItemCheckboxClassNames.checkmark,
      checkmarkStyles.base,
      !checked && checkmarkStyles.unchecked,
    );
  }

  if (state.subText) {
    state.subText.className = mergeClasses(
      state.subText.className,
      menuItemCheckboxClassNames.subText,
    );
  }

  useCheckmarkStyles_unstable(state);
  useMenuItemStyles(state);

  return state;
};
