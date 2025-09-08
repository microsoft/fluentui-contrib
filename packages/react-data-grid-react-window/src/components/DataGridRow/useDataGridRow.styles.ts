import {
  makeStyles,
  mergeClasses,
  useDataGridRowStyles_unstable as useDataGridRowStylesBase_unstable,
  DataGridRowState,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    minWidth: 'fit-content',
  },
});

/**
 * Apply styling to the DataGridRow slots based on the state
 */
export const useDataGridRowStyles_unstable = (
  state: DataGridRowState
): DataGridRowState => {
  const classes = useStyles();
  state.root.className = mergeClasses(classes.root, state.root.className);

  useDataGridRowStylesBase_unstable(state);
  return state;
};
