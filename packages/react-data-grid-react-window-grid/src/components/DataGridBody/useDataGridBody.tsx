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
import { useHeaderListRefContext } from '../../contexts/headerListRefContext';
import {
  TableIndexContextProvider,
  ariaColumnIndexStart,
} from '../../contexts/indexContext';
import { useBodyRefContext } from '../../contexts/bodyRefContext';

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
  // children render in base class is not in use, so passing null
  const baseState = useDataGridBodyBase_unstable(
    { ...props, children: () => null },
    ref
  );

  const columns: TableColumnDefinition<any>[] = useDataGridContext_unstable(
    (cxt) => cxt.columns
  );
  const headerListRef = useHeaderListRefContext();
  const bodyRef = useBodyRefContext();

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

  const onScroll = React.useCallback((scrollProps: GridOnScrollProps) => {
    if (scrollProps.horizontalScrollDirection && headerListRef?.current && scrollProps.scrollUpdateWasRequested === false) {
      headerListRef.current.scrollTo(scrollProps.scrollLeft);
    }
  }, [headerListRef])

  return {
    ...baseState,
    rowHeight,
    height,
    columnWidth,
    columns,
    virtualizedCell,
    width,
    ariaRowIndexStart,
    gridRef: bodyRef,
    gridProps: {
      onScroll,
      ...gridProps,
    },
  };
};
