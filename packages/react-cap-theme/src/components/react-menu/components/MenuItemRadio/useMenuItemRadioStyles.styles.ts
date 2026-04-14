import {
  type MenuItemRadioState,
  menuItemClassNames,
  menuItemRadioClassNames,
} from '@fluentui/react-menu';
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/tokens';

import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles.styles';
import { useCheckmarkStyles_unstable } from '../../selectable/useCheckmarkStyles.style';

const useInteractiveStyles = makeStyles({
  checked: {
    ':hover': {
      [`& .${menuItemClassNames.checkmark}`]: {
        color: tokens.colorBrandForeground2Hover,
      },
    },
    ':hover:active': {
      [`& .${menuItemClassNames.checkmark}`]: {
        color: tokens.colorBrandForeground2Pressed,
      },
    },

    '@media (forced-colors: active)': {
      ':hover': {
        [`& .${menuItemClassNames.checkmark}`]: { color: 'inherit' },
      },
      ':hover:active': {
        [`& .${menuItemClassNames.checkmark}`]: { color: 'inherit' },
      },
    },
  },
});

const useCheckmarkStyles = makeStyles({
  checked: { color: tokens.colorBrandForeground2 },
});

export const useMenuItemRadioStyles = (
  state: MenuItemRadioState
): MenuItemRadioState => {
  const { checked, disabled } = state;
  const interactiveStyles = useInteractiveStyles();
  const checkmarkStyles = useCheckmarkStyles();

  state.root.className = mergeClasses(
    state.root.className,
    menuItemRadioClassNames.root,
    !disabled && checked && interactiveStyles.checked,
  );

  if (state.content) {
    state.content.className = mergeClasses(
      state.content.className,
      menuItemRadioClassNames.content,
    );
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      state.secondaryContent.className,
      menuItemRadioClassNames.secondaryContent,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      menuItemRadioClassNames.icon,
    );
  }

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      state.checkmark.className,
      menuItemRadioClassNames.checkmark,
      !disabled && checked && checkmarkStyles.checked,
    );
  }

  if (state.subText) {
    state.subText.className = mergeClasses(
      state.subText.className,
      menuItemRadioClassNames.subText,
    );
  }

  useCheckmarkStyles_unstable(state);
  useMenuItemStyles(state);

  return state;
};
