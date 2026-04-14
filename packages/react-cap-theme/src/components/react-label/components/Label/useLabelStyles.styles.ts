import {
  labelClassNames as fluentLabelClassNames,
  useLabelStyles_unstable,
  LabelState as BaseLabelState,
} from '@fluentui/react-label';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/tokens';
import type { LabelSlots, LabelState } from './Label.types';

export const labelClassNames: SlotClassNames<LabelSlots> = {
  ...fluentLabelClassNames,
  icon: 'fui-Label__icon',
};

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'inline-flex',
  },
  large: { fontWeight: tokens.fontWeightRegular },
  required: { color: tokens.colorStatusDangerForeground3 },
  semiBold: { fontWeight: tokens.fontWeightSemibold },
});

const useIconStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,
    marginRight: tokens.spacingHorizontalXS,
  },
  small: {
    fontSize: tokens.fontSizeBase200,
    height: tokens.fontSizeBase500,
    width: tokens.fontSizeBase500,
  },
  smallSemibold: {
    height: tokens.fontSizeBase400,
    width: tokens.fontSizeBase400,
  },
  medium: {
    fontSize: tokens.fontSizeBase400,
    height: tokens.fontSizeBase500,
    width: tokens.fontSizeBase500,
  },
  large: {
    fontSize: tokens.fontSizeBase500,
    height: tokens.fontSizeBase600,
    width: tokens.fontSizeBase600,
    borderRadius: tokens.borderRadiusLarge,
    marginRight: tokens.spacingHorizontalSNudge,
  },
});

export const useLabelStyles = (state: LabelState): LabelState => {
  const styles = useStyles();
  const iconStyles = useIconStyles();

  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    state.size === 'large' && styles.large,
    state.weight === 'semibold' && styles.semiBold,
    getSlotClassNameProp_unstable(state.root)
  );

  if (state.required) {
    state.required.className = mergeClasses(
      state.required.className,
      styles.required,
      getSlotClassNameProp_unstable(state.required)
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      labelClassNames.icon,
      iconStyles.root,
      state.size && iconStyles[state.size],
      state.size === 'small' &&
        state.weight === 'semibold' &&
        iconStyles.smallSemibold,
      getSlotClassNameProp_unstable(state.icon)
    );
  }

  const stateStyled = useLabelStyles_unstable(state as BaseLabelState);

  return {
    ...stateStyled,
    icon: state.icon,
    components: state.components,
  };
};
