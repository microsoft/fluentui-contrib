import * as React from 'react';
import type {
  DataGridCellProps,
  DataGridCellState,
} from '@fluentui/react-components';
import { useDataGridCell_unstable as useBaseState } from '@fluentui/react-components';
import { useColumnIndexContext } from '../../contexts/columnIndexContext';
import { useRowIndexContext } from '../../contexts/rowIndexContext';

/**
 * Create the state required to render DataGridCell.
 *
 * The returned state can be modified with hooks such as useDataGridCellStyles_unstable,
 * before being passed to renderDataGridCell_unstable.
 *
 * @param props - props from this instance of DataGridCell
 * @param ref - reference to root HTMLElement of DataGridCell
 */
export const useDataGridCell_unstable = (
  props: DataGridCellProps,
  ref: React.Ref<HTMLElement>
): DataGridCellState => {
  const colIndex = useColumnIndexContext();
  const rowIndex = useRowIndexContext();
  return useBaseState(
    {
      ...props,
      'aria-rowindex': rowIndex,
      'aria-colindex': colIndex,
    },
    ref
  );
};
