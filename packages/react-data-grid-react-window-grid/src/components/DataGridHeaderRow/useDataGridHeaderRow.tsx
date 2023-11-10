import * as React from 'react';
import {
  ColumnIdContextProvider,
  TableColumnDefinition,
  useDataGridRow_unstable,
} from '@fluentui/react-components';
import {
  DataGridHeaderRowProps,
  DataGridHeaderRowState,
} from './DataGridHeaderRow.types';
import { useHeaderListRefContext } from '../../contexts/headerListRefContext';
import { ListOnScrollProps } from 'react-window';
import { useBodyRefContext } from '../../contexts/bodyRefContext';
import { ColumnIndexContextProvider, ariaColumnIndexStart } from '../../contexts/columnIndexContext';
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
  const { height, itemSize, width, children, listProps } = props;
  const listRef = useHeaderListRefContext();
  const bodyRef = useBodyRefContext();
  // the base children render function is no longer in used, while virtualizedCell is used
  const baseState = useDataGridRow_unstable(
    { ...props, children: () => null, 'aria-rowindex': 1 },
    ref
  );

  const virtualizedCell: DataGridHeaderRowState['virtualizedCell'] =
    React.useCallback(
      ({ data, index, style }) => {
        const column: TableColumnDefinition<unknown> = data[index];
        return (
          <ColumnIndexContextProvider value={ariaColumnIndexStart + index}>
            <ColumnIdContextProvider value={column.columnId}>
              {children(column, style, baseState.dataGridContextValue, index)}
            </ColumnIdContextProvider>
          </ColumnIndexContextProvider>
        );
      },
      [children]
    );

  const onScroll = React.useCallback((scrollProps: ListOnScrollProps) => {
    if (scrollProps.scrollDirection && bodyRef?.current && scrollProps.scrollUpdateWasRequested === false) {
      bodyRef.current.scrollTo({ scrollLeft: scrollProps.scrollOffset});
    }
  }, [bodyRef]);

  return {
    ...baseState,
    itemSize,
    height,
    virtualizedCell,
    width,
    listProps,
    listRef: listRef,
    onScroll
  };
};
