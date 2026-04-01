import {
  type DialogSurfaceState,
  useDialogSurfaceStyles_unstable,
} from '@fluentui/react-dialog';
import { tokens } from '../../../tokens';
import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAlpha2}`,
    borderRadius: tokens.borderRadius4XLarge,
    containerType: 'inline-size', // Enables @container queries on descendants based on this surface's width,
    padding: 0, // Allows future implementation of image and other components to span the full width of the surface without needing to account for padding in their styles.
  },
});

export const useDialogSurfaceStyles = (
  state: DialogSurfaceState
): DialogSurfaceState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    styles.root,
    getSlotClassNameProp_unstable(state.root)
  );
  return useDialogSurfaceStyles_unstable(state);
};
