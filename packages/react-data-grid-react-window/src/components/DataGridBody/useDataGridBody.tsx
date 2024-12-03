import * as React from 'react';
import type {
  DataGridBodyProps,
  DataGridBodyState,
} from './DataGridBody.types';
import {
  useDataGridBody_unstable as useDataGridBodyBase_unstable,
  TableRowData,
  TableRowIdContextProvider,
} from '@fluentui/react-components';
import type { RowRenderFunction } from '@fluentui/react-table';
import { TableRowIndexContextProvider } from '../../contexts/rowIndexContext';
import { useBodyRefContext } from '../../contexts/bodyRefContext';
import { useHeaderRefContext } from '../../contexts/headerRefContext';

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
    itemSize,
    width = '100%',
    ariaRowIndexStart = 2,
    children,
    listProps,
  } = props;

  const bodyRef = useBodyRefContext();
  const headerRef = useHeaderRefContext();

  // cast the row render function to work with unknown args
  const renderRowWithUnknown = children as RowRenderFunction;
  const baseState = useDataGridBodyBase_unstable(
    { ...props, children: renderRowWithUnknown },
    ref
  );

  const virtualizedRow: DataGridBodyState['virtualizedRow'] = React.useCallback(
    ({ data, index, style, isScrolling }) => {
      const row: TableRowData<unknown> = data[index];
      return (
        <TableRowIndexContextProvider value={ariaRowIndexStart + index}>
          <TableRowIdContextProvider value={row.rowId}>
            {children(row, style, index, isScrolling)}
          </TableRowIdContextProvider>
        </TableRowIndexContextProvider>
      );
    },
    [ariaRowIndexStart, children]
  );

  const onScroll = React.useCallback(() => {
    if (bodyRef.current && headerRef.current) {
      headerRef.current.scroll({
        left: bodyRef.current.scrollLeft,
        behavior: 'instant',
      });
    }
  }, []);

  // Use a onScroll callback on the outerElement since react-window's onScroll will only work for horizontal scrolls
  const setupOuterRef = React.useCallback(
    (outerElement: HTMLElement | null) => {
      bodyRef.current?.removeEventListener('scroll', onScroll);

      bodyRef.current = outerElement;
      if (outerElement) {
        outerElement.addEventListener('scroll', onScroll);
      }
    },
    []
  );

  return {
    ...baseState,
    itemSize,
    height,
    virtualizedRow,
    width,
    ariaRowIndexStart,
    listProps,
    outerRef: setupOuterRef,
  };
};
