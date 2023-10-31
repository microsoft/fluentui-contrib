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
import { GridOnScrollProps } from 'react-window';
import {
  HeaderRowContextValue,
  useHeaderRowContext,
} from '../../contexts/headerRowContext';
import {
  TableIndexContextProvider,
  ariaColumnIndexStart,
} from '../../contexts/indexContext';

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

  const columns: TableColumnDefinition<any>[] = useDataGridContext_unstable(
    (cxt) => cxt.columns
  );
  const headerRow: HeaderRowContextValue = useHeaderRowContext();

  const virtualizedCell: DataGridBodyState['virtualizedCell'] =
    React.useCallback(
      ({ columnIndex, rowIndex, data, style }) => {
        const row: TableRowData<unknown> = data[rowIndex];
        const columnDef = columns[columnIndex];
        return (
          <TableIndexContextProvider
            value={{
              rowIndex: ariaRowIndexStart + rowIndex,
              columnIndex: ariaColumnIndexStart + columnIndex,
            }}
          >
            <TableRowIdContextProvider value={row.rowId}>
              <ColumnIdContextProvider
                value={columnDef.columnId}
                key={columnDef.columnId}
              >
                {children(row, columnDef, style, rowIndex, columnIndex)}
              </ColumnIdContextProvider>
            </TableRowIdContextProvider>
          </TableIndexContextProvider>
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
    gridProps: {
      onScroll: (props: GridOnScrollProps) => {
        if (props.horizontalScrollDirection && headerRow?.listRef.current) {
          headerRow.listRef.current.scrollTo({ left: props.scrollLeft });
        }
      },
      ...gridProps,
    },
  };
};
