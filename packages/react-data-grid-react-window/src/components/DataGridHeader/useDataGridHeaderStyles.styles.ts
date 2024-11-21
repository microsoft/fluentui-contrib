import {
  makeStyles,
  mergeClasses,
  useDataGridHeaderStyles_unstable as useDataGridHeaderStylesBase_unstable,
  DataGridHeaderState,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    overflowX: 'auto',
    // Hide the scrollbar in the header, it is synced to the scrollbar of the body so shouldn't be shown
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      width: 0,
      height: 0,
    },
  },
});

/**
 * Apply styling to the DataGridHeader slots based on the state
 */
export const useDataGridHeaderStyles_unstable = (
  state: DataGridHeaderState
): DataGridHeaderState => {
  const classes = useStyles();
  state.root.className = mergeClasses(classes.root, state.root.className);

  useDataGridHeaderStylesBase_unstable(state);
  return state;
};
