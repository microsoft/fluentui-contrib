import {
  mergeClasses,
  makeStyles,
} from '@griffel/react';
import {
  menuItemClassNames,
  type MenuItemSelectableState,
  type MenuItemState,
} from '@fluentui/react-menu';
import {
  iconFilledClassName,
  iconRegularClassName,
} from '@fluentui/react-icons';
import { tokens } from '@fluentui/tokens';

const useStyles = makeStyles({
  checked: {
    [`& .${iconFilledClassName}`]: { display: 'inline' },
    [`& .${iconRegularClassName}`]: { display: 'none' },

    [`:hover .${iconFilledClassName}`]: { display: 'inline' },
    [`:hover .${iconRegularClassName}`]: { display: 'none' },
  },
  checkmark: {
    boxSizing: 'border-box',
    height: '20px',
    width: '20px',
    marginRight: tokens.spacingHorizontalSNudge,
    marginTop: tokens.spacingVerticalNone,
    flexShrink: 0,
    visibility: 'visible',
  },
});

const useInteractiveStyles = makeStyles({
  checked: {
    ':hover': {
      [`& .${menuItemClassNames.icon}`]: {
        color: tokens.colorBrandForeground2Hover,
      },
    },
    ':hover:active': {
      [`& .${menuItemClassNames.icon}`]: {
        color: tokens.colorBrandForeground2Pressed,
      },
    },
    '@media (forced-colors: active)': {
      ':hover': {
        [`& .${menuItemClassNames.icon}`]: { color: 'inherit' },
      },
      ':hover:active': {
        [`& .${menuItemClassNames.icon}`]: { color: 'inherit' },
      },
    },
  },
  iconChecked: { color: tokens.colorBrandForeground2 },
});

export const useCheckmarkStyles_unstable = (
  state: MenuItemSelectableState & MenuItemState
): void => {
  const { checked, disabled } = state;
  const styles = useStyles();
  const interactiveStyles = useInteractiveStyles();

  state.root.className = mergeClasses(
    state.checked && styles.checked,
    !disabled && checked && interactiveStyles.checked,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      !disabled && checked && interactiveStyles.iconChecked,
      state.icon.className,
    );
  }

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      styles.checkmark,
      state.checkmark.className,
    );
  }
};
