import * as React from 'react';
import {
  useDataGridHeaderCell_unstable as useBaseState,
  DataGridHeaderCellProps,
  DataGridHeaderCellState,
  useDataGridContext_unstable,
} from '@fluentui/react-components';
import { ariaColumnIndexStart, useColumnIndexContext } from '../../contexts/columnIndexContext';

/**
 * Create the state required to render DataGrid.
 *
 * The returned state can be modified with hooks such as useDataGridStyles_unstable,
 * before being passed to renderDataGrid_unstable.
 *
 * @param props - props from this instance of DataGrid
 * @param ref - reference to root HTMLElement of DataGrid
 */
export const useDataGridHeaderCell_unstable = (
  props: DataGridHeaderCellProps,
  ref: React.Ref<HTMLElement>
): DataGridHeaderCellState => {
  const columns = useDataGridContext_unstable(ctx => ctx.columns);
  const colIndex = useColumnIndexContext();

  return useBaseState(
    { ...props, 'aria-colcount': columns.length, 'aria-colindex': colIndex },
    ref
  );
};