import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  type DialogState,
  useDialog_unstable,
} from '@fluentui/react-components';

import { CAP_TOKENS } from '../../theme/CAPTheme';

export const useDialogStyles = makeStyles({
  root: {
    // Add CAP-specific Dialog styles here if needed
  },
});

export function useDialogStylesHook(state: DialogState): DialogState {
  // Apply base Dialog styles first
  useDialog_unstable(state);

  // Then override with CAP styles
  const styles = useDialogStyles();

  // Dialog doesn't have slots we can easily override, so we target the body parts
  // Note: This is a simplified implementation - may need adjustment based on actual Dialog structure

  return state;
}
