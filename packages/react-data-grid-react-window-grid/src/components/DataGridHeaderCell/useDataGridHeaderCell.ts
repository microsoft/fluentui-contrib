import * as React from 'react';
import {
  useDataGridHeaderCell_unstable as useBaseState,
  DataGridHeaderCellProps,
  DataGridHeaderCellState,
  useDataGridContext_unstable,
} from '@fluentui/react-components';
import { useColumnIndexContext } from '../../contexts/columnIndexContext';

/**
 * Create the state required to render DataGridHeaderCell.
 *
 * The returned state can be modified with hooks such as useDataGridHeaderCellStyles_unstable,
 * before being passed to renderDataGridHeaderCell_unstable.
 *
 * @param props - props from this instance of DataGridHeaderCell
 * @param ref - reference to root HTMLElement of DataGridHeaderCell
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
