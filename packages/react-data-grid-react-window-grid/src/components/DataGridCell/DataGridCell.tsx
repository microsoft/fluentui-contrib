import * as React from 'react';
import {
  renderDataGridCell_unstable,
  useDataGridCellStyles_unstable,
} from '@fluentui/react-components';
import type { DataGridCellProps } from '@fluentui/react-components';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useDataGridCell_unstable } from './useDataGridCell';

/**
 * DataGridCell component
 */
export const DataGridCell: ForwardRefComponent<DataGridCellProps> =
  React.forwardRef((props, ref) => {
    const state = useDataGridCell_unstable(props, ref);

    useDataGridCellStyles_unstable(state);

    return renderDataGridCell_unstable(state);
  });

DataGridCell.displayName = 'DataGridCell';
