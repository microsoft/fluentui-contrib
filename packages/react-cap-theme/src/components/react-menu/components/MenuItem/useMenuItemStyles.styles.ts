import { menuItemClassNames, type MenuItemState } from '@fluentui/react-menu';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/tokens';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { capTokens } from '../../../tokens/tokens';

const useStyles = makeStyles({
  root: {
    borderRadius: tokens.borderRadiusLarge,
    color: capTokens.colorNeutralForeground5,
    gap: 0,
    minWidth: 0, // allow truncation
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,
    ...createFocusOutlineStyle({
      style: { outlineRadius: tokens.borderRadiusXLarge },
    }),
    '@media (forced-colors: active)': {
      ...createFocusOutlineStyle({
        style: { outlineRadius: tokens.borderRadiusXLarge },
      }),
    },
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    [`& .${menuItemClassNames.subText}`]: { color: 'inherit' },
    [`& .${menuItemClassNames.secondaryContent}`]: { color: 'inherit' },
    [`& .${menuItemClassNames.submenuIndicator}`]: { color: 'inherit' },
    ':hover': {
      backgroundColor: 'unset', // override Fluent
      color: tokens.colorNeutralForegroundDisabled,
    },
    ':hover:active': {
      backgroundColor: 'unset', // override Fluent
      color: tokens.colorNeutralForegroundDisabled,
    },
    ':focus': { color: tokens.colorNeutralForegroundDisabled },
  },
  content: {
    paddingLeft: tokens.spacingHorizontalNone, // remove the extra 2px padding
    paddingRight: tokens.spacingHorizontalNone, // remove the extra 2px padding
    flex: 1,
    minWidth: '50px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  icon: { marginRight: tokens.spacingHorizontalSNudge },
  secondaryContent: {
    ...typographyStyles.body1,
    color: tokens.colorNeutralForeground3,
    alignSelf: 'center',
    wordBreak: 'break-word',
    paddingLeft: tokens.spacingHorizontalSNudge,
    paddingRight: tokens.spacingHorizontalNone, // remove the extra 2px padding
    ':focus': { color: 'currentColor' },
  },
  submenuIndicator: {
    alignSelf: 'center',
    color: tokens.colorNeutralForeground3,
    fontSize: '16px',
    height: '16px',
    paddingLeft: tokens.spacingHorizontalXS,
    width: '16px',
  },
  subText: {
    color: 'inherit',
    display: 'block', // move below
    ...typographyStyles.caption1,
  },
});

const useInteractiveStyles = makeStyles({
  root: {
    ':hover': {
      color: capTokens.colorNeutralForeground5Hover,
      [`& .${menuItemClassNames.icon}`]: { color: 'inherit' },
      [`& .${menuItemClassNames.subText}`]: { color: 'inherit' },
      [`& .${menuItemClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground3Hover,
      },
      [`& .${menuItemClassNames.submenuIndicator}`]: {
        color: tokens.colorNeutralForeground3Hover,
      },
    },
    ':hover:active': {
      color: capTokens.colorNeutralForeground5Pressed,
      [`& .${menuItemClassNames.subText}`]: { color: 'inherit' },
      [`& .${menuItemClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground3Pressed,
      },
      [`& .${menuItemClassNames.submenuIndicator}`]: {
        color: tokens.colorNeutralForeground3Pressed,
      },
    },

    '@media (forced-colors: active)': {
      ':hover': {
        [`& .${menuItemClassNames.secondaryContent}`]: { color: 'inherit' },
        [`& .${menuItemClassNames.submenuIndicator}`]: { color: 'inherit' },
      },
      ':hover:active': {
        backgroundColor: 'Canvas',
        color: 'Highlight',
        [`& .${menuItemClassNames.secondaryContent}`]: { color: 'inherit' },
        [`& .${menuItemClassNames.submenuIndicator}`]: { color: 'inherit' },
      },
    },
  },
});

const useMultilineStyles = makeStyles({
  content: {
    display: 'block', // allow truncation
  },
});

/**
 * Applies SharePoint-specific styling to MenuItem component.
 * @param state - The MenuItem state object
 * @returns The updated state with applied styles
 * @alpha
 */
export const useMenuItemStyles = (state: MenuItemState): MenuItemState => {
  const styles = useStyles();
  const interactiveStyles = useInteractiveStyles();
  const multilineStyles = useMultilineStyles();

  const multiline = !!state.subText;
  const { disabled } = state;

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    disabled ? styles.disabled : interactiveStyles.root,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.content) {
    state.content.className = mergeClasses(
      state.content.className,
      styles.content,
      getSlotClassNameProp_unstable(state.content)
    );
  }
  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      styles.icon,
      getSlotClassNameProp_unstable(state.icon)
    );
  }
  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      state.secondaryContent.className,
      styles.secondaryContent,
      getSlotClassNameProp_unstable(state.secondaryContent)
    );
  }
  if (state.submenuIndicator) {
    state.submenuIndicator.className = mergeClasses(
      state.submenuIndicator.className,
      styles.submenuIndicator,
      getSlotClassNameProp_unstable(state.submenuIndicator)
    );
  }
  if (state.subText) {
    state.subText.className = mergeClasses(
      state.subText.className,
      styles.subText,
      getSlotClassNameProp_unstable(state.subText)
    );
  }

  if (state.content) {
    state.content.className = mergeClasses(
      state.content.className,
      multiline && multilineStyles.content,
      getSlotClassNameProp_unstable(state.content)
    );
  }

  return state;
};
