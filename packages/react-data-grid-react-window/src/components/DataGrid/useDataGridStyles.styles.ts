import {
  DataGridState,
  makeStyles,
  mergeClasses,
  useDataGridStyles_unstable as useDataGridStylesBase_unstable,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // DataGrid gets min-width: fit-content applied directly to the element, thus the need for !important
    // without auto width, the DataGrid will not scroll
    minWidth: 'auto !important',
  },
});

/**
 * Apply styling to the DataGrid slots based on the state
 */
export const useDataGridStyles_unstable = (
  state: DataGridState
): DataGridState => {
  const classes = useStyles();
  state.root.className = mergeClasses(classes.root, state.root.className);

  useDataGridStylesBase_unstable(state);
  return state;
};
