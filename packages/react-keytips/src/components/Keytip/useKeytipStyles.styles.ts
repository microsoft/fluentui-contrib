import {
  tokens,
  makeStyles,
  mergeClasses,
  SlotClassNames,
} from '@fluentui/react-components';
import { KeytipSlots, KeytipState } from './Keytip.types';
import { createSlideStyles } from '@fluentui/react-positioning';
import { SHOW_DELAY } from '../../constants';

export const keytipClassNames: SlotClassNames<KeytipSlots> = {
  content: 'fui-Keytip__content',
};

/**
 * Styles for the keytip
 */
const useStyles = makeStyles({
  root: {
    display: 'none',
    boxSizing: 'border-box',
    maxWidth: '40px',
    minWidth: '24px',
    textAlign: 'center',
    cursor: 'default',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorTransparentStroke}`,
    padding: `calc(${tokens.spacingHorizontalXS} - 1px)`,
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted,
    boxShadow: tokens.shadow16,
    ...createSlideStyles(SHOW_DELAY),
  },
  visible: {
    display: 'block',
  },
});

/**
 * Apply styling to the Tooltip slots based on the state
 */
export const useKeytipStyles_unstable = (state: KeytipState): KeytipState => {
  'use no memo';

  const styles = useStyles();

  state.content.className = mergeClasses(
    keytipClassNames.content,
    styles.root,
    state.visible && styles.visible,
    state.content.className
  );

  return state;
};
