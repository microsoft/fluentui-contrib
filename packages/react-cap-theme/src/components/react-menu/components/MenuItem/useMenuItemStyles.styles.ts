import {
  menuItemClassNames as fluentMenuItemClassNames,
  type MenuItemSlots,
  type MenuItemState,
} from '@fluentui/react-menu';
import {
  getSlotClassNameProp_unstable,
  type SlotClassNames,
} from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';

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
    borderRadius: tokens.borderRadiusXLarge,
    color: tokens.colorNeutralForeground3,
    gap: 0,
    minWidth: 0, // allow truncation
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,

    ':hover': {
      color: tokens.colorNeutralForeground1Hover,
      [`& .${fluentMenuItemClassNames.icon}`]: { color: 'currentColor' },
      [`& .${fluentMenuItemClassNames.subText}`]: {
        color: 'currentColor',
      },
    },
    ':hover:active': {
      [`& .${fluentMenuItemClassNames.subText}`]: {
        color: 'currentColor',
      },
    },
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    ':hover': { color: tokens.colorNeutralForegroundDisabled },
    ':hover:active': { color: tokens.colorNeutralForegroundDisabled },
    ':focus': { color: tokens.colorNeutralForegroundDisabled },
  },
  content: {
    color: 'currentColor',
    flex: 1,
    minWidth: '50px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  icon: {
    color: 'currentColor',
    marginRight: tokens.spacingHorizontalSNudge,
  },
  secondaryContent: {
    ...typographyStyles.caption1,
    color: 'currentColor',
    alignSelf: 'center',
    wordBreak: 'break-word',
    ':hover': { color: 'currentColor' },
    ':focus': { color: 'currentColor' },
  },
  submenuIndicator: {
    alignSelf: 'center',
    color: 'currentColor',
    fontSize: '16px',
    height: '16px',
    paddingLeft: tokens.spacingHorizontalXS,
    width: '16px',
  },
  subText: {
    color: 'currentColor',
    display: 'block', // move below
    ...typographyStyles.caption1,
  },
});

const useMultilineStyles = makeStyles({
  content: {
    display: 'block', // allow truncation
  },
});

export const useMenuItemStyles = (state: MenuItemState): MenuItemState => {
  const styles = useStyles();
  const multilineStyles = useMultilineStyles();

  const multiline = !!state.subText;
  const { disabled } = state;

  state.root.className = mergeClasses(
    state.root.className,
    menuItemClassNames.root,
    styles.root,
    disabled && styles.disabled,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.content) {
    state.content.className = mergeClasses(
      state.content.className,
      menuItemClassNames.content,
      styles.content
    );
  }
  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      menuItemClassNames.icon,
      styles.icon,
      getSlotClassNameProp_unstable(state.icon)
    );
  }
  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      state.secondaryContent.className,
      menuItemClassNames.secondaryContent,
      styles.secondaryContent,
      getSlotClassNameProp_unstable(state.secondaryContent)
    );
  }
  if (state.submenuIndicator) {
    state.submenuIndicator.className = mergeClasses(
      state.submenuIndicator.className,
      menuItemClassNames.submenuIndicator,
      styles.submenuIndicator,
      getSlotClassNameProp_unstable(state.submenuIndicator)
    );
  }
  if (state.subText) {
    state.subText.className = mergeClasses(
      state.subText.className,
      menuItemClassNames.subText,
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
