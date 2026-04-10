import {
  type SwatchPickerSlots,
  type SwatchPickerState,
} from '@fluentui/react-swatch-picker';
import {
  getSlotClassNameProp_unstable,
  type SlotClassNames,
} from '@fluentui/react-utilities';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';

export const menuItemSwatchPickerClassNames: SlotClassNames<SwatchPickerSlots> =
  {
    root: 'fui-MenuItemSwatchPicker',
  };

const useStyles = makeStyles({
  root: {
    ...shorthands.padding(
      tokens.spacingVerticalMNudge,
      tokens.spacingHorizontalMNudge
    ),
  },
});

export const useMenuItemSwatchPickerStyles = (
  state: SwatchPickerState
): SwatchPickerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    menuItemSwatchPickerClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return state;
};
