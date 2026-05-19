import type { MenuItemCheckboxState } from '@fluentui/react-menu';
import {
  menuItemCheckboxClassNames,
  menuItemClassNames,
} from '@fluentui/react-menu';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
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

/**
 * Applies SharePoint-specific styling to MenuItemCheckbox component.
 * @param state - The MenuItemCheckbox state object
 * @returns The updated state with applied styles
 * @alpha
 */
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
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.content) {
    state.content.className = mergeClasses(
      state.content.className,
      menuItemCheckboxClassNames.content,
      getSlotClassNameProp_unstable(state.content)
    );
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      state.secondaryContent.className,
      menuItemCheckboxClassNames.secondaryContent,
      getSlotClassNameProp_unstable(state.secondaryContent)
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      menuItemCheckboxClassNames.icon,
      getSlotClassNameProp_unstable(state.icon)
    );
  }

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      state.checkmark.className,
      menuItemCheckboxClassNames.checkmark,
      checkmarkStyles.base,
      !checked && checkmarkStyles.unchecked,
      getSlotClassNameProp_unstable(state.checkmark)
    );
  }

  if (state.subText) {
    state.subText.className = mergeClasses(
      state.subText.className,
      menuItemCheckboxClassNames.subText,
      getSlotClassNameProp_unstable(state.subText)
    );
  }

  useCheckmarkStyles_unstable(state);
  useMenuItemStyles(state);

  return state;
};
