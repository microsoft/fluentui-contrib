import * as React from 'react';
import {
  useDataGrid_unstable as useBaseState,
  DataGridProps,
} from '@fluentui/react-components';
import { useFluent, useScrollbarWidth } from '@fluentui/react-components';
import { DataGridState } from './DataGridBody.types';

const TABLE_SELECTION_CELL_WIDTH = 44;

/**
 * Create the state required to render DataGrid.
 *
 * The returned state can be modified with hooks such as useDataGridStyles_unstable,
 * before being passed to renderDataGrid_unstable.
 *
 * @param props - props from this instance of DataGrid
 * @param ref - reference to root HTMLElement of DataGrid
 */
export const useDataGrid_unstable = (
  props: DataGridProps,
  ref: React.Ref<HTMLElement>
): DataGridState => {
  const { targetDocument } = useFluent();
  const scrollbarWidth = useScrollbarWidth({ targetDocument });
  const headerRef = React.useRef<HTMLDivElement | null>(null);
  const bodyRef = React.useRef<HTMLDivElement | null>(null);

  let containerWidthOffset = props.containerWidthOffset;

  if (containerWidthOffset === undefined) {
    containerWidthOffset = props.selectionMode
      ? -TABLE_SELECTION_CELL_WIDTH
      : 0;
    containerWidthOffset -= scrollbarWidth || 0;
  }

  const baseState = useBaseState(
    { ...props, 'aria-rowcount': props.items.length, containerWidthOffset },
    ref
  );

  if (
    props.resizableColumns &&
    props.resizableColumnsOptions?.autoFitColumns === false &&
    baseState.root.style
  ) {
    baseState.root.style.minWidth = 'auto';
  }

  return {
    ...baseState,
    headerRef,
    bodyRef,
  };
};
