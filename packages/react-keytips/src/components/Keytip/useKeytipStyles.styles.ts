import { tokens, makeStyles, mergeClasses } from '@fluentui/react-components';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { KeytipSlots, KeytipState } from './Keytip.types';
import { createSlideStyles } from '@fluentui/react-positioning';

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
    minWidth: '20px',
    textAlign: 'center',
    cursor: 'default',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalXS,
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted,
    ...createSlideStyles(15),

    filter:
      `drop-shadow(0 0 2px ${tokens.colorNeutralShadowAmbient}) ` +
      `drop-shadow(0 4px 8px ${tokens.colorNeutralShadowKey})`,
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
