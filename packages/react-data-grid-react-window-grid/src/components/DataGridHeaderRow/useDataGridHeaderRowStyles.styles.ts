import { mergeClasses } from '@griffel/react';
import { DataGridRowState, makeStyles, useDataGridRowStyles_unstable } from '@fluentui/react-components';
import { DataGridHeaderRowState } from './DataGridHeaderRow.types';

const useStyles = makeStyles({
  root: {
    overflowX: 'hidden'
  }
});
/**
 * Apply styling to the DataGridRow slots based on the state
 */
export const useDataGridHeaderRowStyles_unstable = (state: DataGridHeaderRowState): DataGridHeaderRowState => {
    useDataGridRowStyles_unstable(state as unknown as DataGridRowState);
    const styles = useStyles();
    state.root.className = mergeClasses(styles.root, state.root.className);

    return state;
};
