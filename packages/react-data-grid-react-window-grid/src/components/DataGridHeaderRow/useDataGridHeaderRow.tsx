import * as React from 'react';
import {
  ColumnIdContextProvider,
  TableColumnDefinition,
  useDataGridRow_unstable,
} from '@fluentui/react-components';
import type { CellRenderFunction } from '@fluentui/react-table';
import {
  DataGridHeaderRowProps,
  DataGridHeaderRowState,
} from './DataGridHeaderRow.types';
/**
 * Create the state required to render DataGridHeaderRow.
 *
 * @param props - props from this instance of DataGridHeaderRow
 * @param ref - reference to root HTMLElement of DataGridHeaderRow
 */
export const useDataGridHeaderRow_unstable = (
  props: DataGridHeaderRowProps,
  ref: React.Ref<HTMLElement>
): DataGridHeaderRowState => {
  const { height, itemSize, width, children, listProps, listRef } = props;

  // cast the row render function to work with unknown args
  const renderRowWithUnknown = children as unknown as CellRenderFunction;
  const baseState = useDataGridRow_unstable(
    { ...props, children: renderRowWithUnknown, 'aria-rowindex': 1 },
    ref
  );

  const virtualizedCell: DataGridHeaderRowState['virtualizedCell'] =
    React.useCallback(
      ({ data, index, style }) => {
        const column: TableColumnDefinition<unknown> = data[index];
        return (
          <ColumnIdContextProvider value={column.columnId}>
            {children(column, style, baseState.dataGridContextValue, index)}
          </ColumnIdContextProvider>
        );
      },
      [children]
    );

  const virtualizedListRef = React.useRef<HTMLDivElement | null>(null);

  return {
    ...baseState,
    itemSize,
    height,
    virtualizedCell,
    width,
    listProps,
    listRef: listRef ?? virtualizedListRef,
  };
};
