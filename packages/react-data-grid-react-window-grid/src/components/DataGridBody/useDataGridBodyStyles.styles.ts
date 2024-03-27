import type { DataGridBodyState } from './DataGridBody.types';
import { useDataGridBodyStyles_unstable as useDataGridBodyStylesBase_unstable } from '@fluentui/react-components';

/**
 * Apply styling to the DataGridBody slots based on the state
 */
export const useDataGridBodyStyles_unstable = (
  state: DataGridBodyState
): DataGridBodyState => {
  useDataGridBodyStylesBase_unstable({ ...state, renderRow: () => null });
  return state;
};

export const dataGridBodyGridClassName = 'fui-DataGridReactWindowGridBody__grid';
