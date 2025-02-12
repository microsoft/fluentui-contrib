import * as React from 'react';
import {
  useDataGrid_unstable as useBaseState,
  useMergedRefs,
} from '@fluentui/react-components';
import { useFluent, useScrollbarWidth } from '@fluentui/react-components';
import { DataGridProps, DataGridState } from './DataGrid.types';
import { VariableSizeGrid, VariableSizeList } from 'react-window';

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

  const innerBodyRef = React.useRef<VariableSizeGrid>(null);
  const innerHeaderRef = React.useRef<VariableSizeList>(null);

  return {
    ...baseState,
    bodyRef: useMergedRefs(props.bodyRef, innerBodyRef),
    headerRef: useMergedRefs(props.headerRef, innerHeaderRef),
  };
};
