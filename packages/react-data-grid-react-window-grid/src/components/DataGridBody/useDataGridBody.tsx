import * as React from 'react';
import type {
  DataGridBodyProps,
  DataGridBodyState,
} from './DataGridBody.types';
import {
  useDataGridBody_unstable as useDataGridBodyBase_unstable,
  TableRowData,
  TableRowIdContextProvider,
  useDataGridContext_unstable,
  ColumnIdContextProvider,
} from '@fluentui/react-components';
import type { TableColumnDefinition } from '@fluentui/react-components';

/**
 * Create the state required to render DataGridBody.
 *
 * The returned state can be modified with hooks such as useDataGridBodyStyles_unstable,
 * before being passed to renderDataGridBody_unstable.
 *
 * @param props - props from this instance of DataGridBody
 * @param ref - reference to root HTMLElement of DataGridBody
 */
export const useDataGridBody_unstable = (
  props: DataGridBodyProps,
  ref: React.Ref<HTMLElement>
): DataGridBodyState => {
  const {
    height,
    rowHeight,
    columnWidth,
    width,
    ariaRowIndexStart = 2,
    children,
    gridProps,
  } = props;

  // cast the row render function to work with unknown args
  const renderRowWithUnknown = children as any;
  const baseState = useDataGridBodyBase_unstable(
    { ...props, children: renderRowWithUnknown },
    ref
  );

  const columns: TableColumnDefinition<any>[] = useDataGridContext_unstable(cxt => cxt.columns);

  const virtualizedCell: DataGridBodyState['virtualizedCell'] = React.useCallback(
    ({ columnIndex, rowIndex, data, style }) => {

      const row: TableRowData<unknown> = data[rowIndex];
      const columnDef = columns[columnIndex];
      return (
        // <TableRowIndexContextProvider value={ariaRowIndexStart + rowIndex}>
          <TableRowIdContextProvider value={row.rowId}>
            <ColumnIdContextProvider value={columnDef.columnId} key={columnDef.columnId}>
            {children(row, style, rowIndex, columnDef)}
            </ColumnIdContextProvider>
          </TableRowIdContextProvider>
        // </TableRowIndexContextProvider>
      );
    },
    [ariaRowIndexStart, children]
  );

  return {
    ...baseState,
    rowHeight,
    height,
    columnWidth,
    columns,
    virtualizedCell,
    width,
    ariaRowIndexStart,
    gridProps
  };
};
