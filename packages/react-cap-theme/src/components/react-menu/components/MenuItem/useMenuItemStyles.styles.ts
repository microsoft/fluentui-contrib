import {
  menuItemClassNames as fluentMenuItemClassNames,
  type MenuItemSlots,
  type MenuItemState,
  useMenuItemStyles_unstable,
} from '@fluentui/react-menu';
import {
  getSlotClassNameProp_unstable,
  type SlotClassNames,
} from '@fluentui/react-utilities';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { capTokens } from '../../../tokens';

export const menuItemClassNames: SlotClassNames<MenuItemSlots> = {
  root: 'fui-MenuItem',
  content: 'fui-MenuItem__content',
  icon: 'fui-MenuItem__icon',
  checkmark: 'fui-MenuItem__checkmark',
  submenuIndicator: 'fui-MenuItem__submenuIndicator',
  secondaryContent: 'fui-MenuItem__secondaryContent',
  subText: 'fui-MenuItem__subText',
};

const useStyles = makeStyles({
  root: {
    borderRadius: tokens.borderRadiusLarge,
    color: capTokens.colorNeutralForeground5,
    gap: 0,
    minWidth: 0,
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
    [`& .${fluentMenuItemClassNames.subText}`]: { color: 'inherit' },
    [`& .${fluentMenuItemClassNames.secondaryContent}`]: { color: 'inherit' },
    [`& .${fluentMenuItemClassNames.submenuIndicator}`]: { color: 'inherit' },
    ':hover': {
      backgroundColor: 'unset',
      color: tokens.colorNeutralForegroundDisabled,
    },
    ':hover:active': {
      backgroundColor: 'unset',
      color: tokens.colorNeutralForegroundDisabled,
    },
    ':focus': { color: tokens.colorNeutralForegroundDisabled },
  },
  content: {
    paddingLeft: tokens.spacingHorizontalNone,
    paddingRight: tokens.spacingHorizontalNone,
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
    paddingRight: tokens.spacingHorizontalNone,
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
    display: 'block',
    ...typographyStyles.caption1,
  },
});

const useInteractiveStyles = makeStyles({
  root: {
    ':hover': {
      color: capTokens.colorNeutralForeground5Hover,
      [`& .${fluentMenuItemClassNames.icon}`]: { color: 'inherit' },
      [`& .${fluentMenuItemClassNames.subText}`]: { color: 'inherit' },
      [`& .${fluentMenuItemClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground3Hover,
      },
      [`& .${fluentMenuItemClassNames.submenuIndicator}`]: {
        color: tokens.colorNeutralForeground3Hover,
      },
    },
    ':hover:active': {
      color: capTokens.colorNeutralForeground5Pressed,
      [`& .${fluentMenuItemClassNames.subText}`]: { color: 'inherit' },
      [`& .${fluentMenuItemClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground3Pressed,
      },
      [`& .${fluentMenuItemClassNames.submenuIndicator}`]: {
        color: tokens.colorNeutralForeground3Pressed,
      },
    },

    '@media (forced-colors: active)': {
      ':hover': {
        [`& .${fluentMenuItemClassNames.secondaryContent}`]: {
          color: 'inherit',
        },
        [`& .${fluentMenuItemClassNames.submenuIndicator}`]: {
          color: 'inherit',
        },
      },
      ':hover:active': {
        backgroundColor: 'Canvas',
        color: 'Highlight',
        [`& .${fluentMenuItemClassNames.secondaryContent}`]: {
          color: 'inherit',
        },
        [`& .${fluentMenuItemClassNames.submenuIndicator}`]: {
          color: 'inherit',
        },
      },
    },
  },
});

const useMultilineStyles = makeStyles({
  content: {
    display: 'block',
  },
});

export const useMenuItemStyles = (state: MenuItemState): MenuItemState => {
  const styles = useStyles();
  const interactiveStyles = useInteractiveStyles();
  const multilineStyles = useMultilineStyles();

  const multiline = !!state.subText;
  const { disabled } = state;

  state.root.className = mergeClasses(
    state.root.className,
    menuItemClassNames.root,
    styles.root,
    disabled ? styles.disabled : interactiveStyles.root,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.content) {
    state.content.className = mergeClasses(
      state.content.className,
      menuItemClassNames.content,
      styles.content,
    );
  }
  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      menuItemClassNames.icon,
      styles.icon,
      getSlotClassNameProp_unstable(state.icon),
    );
  }
  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      state.secondaryContent.className,
      menuItemClassNames.secondaryContent,
      styles.secondaryContent,
      getSlotClassNameProp_unstable(state.secondaryContent),
    );
  }
  if (state.submenuIndicator) {
    state.submenuIndicator.className = mergeClasses(
      state.submenuIndicator.className,
      menuItemClassNames.submenuIndicator,
      styles.submenuIndicator,
      getSlotClassNameProp_unstable(state.submenuIndicator),
    );
  }
  if (state.subText) {
    state.subText.className = mergeClasses(
      state.subText.className,
      menuItemClassNames.subText,
      styles.subText,
      getSlotClassNameProp_unstable(state.subText),
    );
  }

  useMenuItemStyles_unstable(state);

  if (state.content) {
    state.content.className = mergeClasses(
      state.content.className,
      multiline && multilineStyles.content,
      getSlotClassNameProp_unstable(state.content),
    );
  }

  return state;
};
